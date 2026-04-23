import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createClient } from "@supabase/supabase-js";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  prefix: "aurum:datarequest",
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

  const { full_name, email, request_type, description } = req.body;

 const { full_name, email, whatsapp, request_type, who_i_am, description } = req.body;

  const { error } = await supabase.from("data_requests").insert([
    {
      full_name,
      email: email.toLowerCase(),
      request_type,
      description: description || null,
    },
  ]);
{
  full_name,
  email: email.toLowerCase(),
  whatsapp: whatsapp || null,
  request_type,
  who_i_am,
  message: description || null,
  status: "Pendente",
},

  return res.status(200).json({ success: true });
}
