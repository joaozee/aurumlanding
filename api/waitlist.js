import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createClient } from "@supabase/supabase-js";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  prefix: "aurum:waitlist",
});

const supabase = createClient(
  "https://iaedslcmhsmgbnpogevh.supabase.co",
  process.env.VITE_SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  // Rate limit por IP
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    "anonymous";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return res.status(429).json({
      error: "Muitas tentativas. Tente novamente em alguns minutos.",
    });
  }

  const {
    full_name,
    email,
    whatsapp,
    monthly_income,
    occupation,
    already_invests,
    main_goal,
    wants_early_access,
    honeypot,
  } = req.body;

  // Honeypot anti-bot (silencioso)
  if (honeypot) {
    return res.status(200).json({ success: true });
  }

  if (!full_name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  // Verificar email duplicado
  const { data: existing } = await supabase
    .from("waitlist_entries")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (existing) {
    return res.status(409).json({ error: "Email já cadastrado na lista de espera." });
  }

  const { error } = await supabase.from("waitlist_entries").insert([
    {
      full_name,
      email: email.toLowerCase(),
      whatsapp: whatsapp || null,
      monthly_income: monthly_income || null,
      occupation: occupation || null,
      already_invests: already_invests || null,
      main_goal: main_goal || null,
      wants_early_access: wants_early_access ?? null,
    },
  ]);

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: "Erro ao salvar. Tente novamente." });
  }

  return res.status(200).json({ success: true });
}