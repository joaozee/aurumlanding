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

function buildEmailHtml(nome) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bem-vindo à Família Aurum</title>
</head>
<body style="margin:0;padding:0;background:#080808;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 20px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0d0d0d;border:1px solid #1f1c14;">

  <tr>
    <td style="padding:48px 48px 36px;text-align:center;border-bottom:1px solid #1f1c14;background:#0a0a0a;">
      <img src="https://iaedslcmhsmgbnpogevh.supabase.co/storage/v1/object/public/assets/logo-aurum.png" width="260" alt="Grupo Aurum" style="display:block;margin:0 auto 24px;width:260px;max-width:100%;"/>
      <p style="margin:0 0 6px;font-size:10px;color:#7a6535;letter-spacing:5px;text-transform:uppercase;">Bem-vindo à família</p>
      <h1 style="margin:0;font-family:Georgia,serif;font-size:32px;font-weight:400;color:#EEECE6;letter-spacing:8px;text-transform:uppercase;">AURUM</h1>
      <div style="width:60px;height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:16px auto 0;"></div>
    </td>
  </tr>

  <tr>
    <td style="padding:40px 48px 0;">
      <p style="margin:0 0 8px;font-size:13px;color:#7a6535;letter-spacing:3px;text-transform:uppercase;">Olá, <span style="color:#C9A84C;">${nome}</span></p>
      <p style="margin:0 0 24px;font-size:20px;color:#EEECE6;font-style:italic;line-height:1.5;">"Grandes patrimônios não nascem do acaso, nascem da decisão de começar."</p>
      <p style="margin:0 0 18px;font-size:15px;color:#888;line-height:1.9;">
        Você deu um passo que poucos dão: chegou antes de todo mundo. Isso não é só uma inscrição, é uma escolha consciente de fazer parte de algo que está sendo construído agora, do zero, junto com pessoas que pensam como você.
      </p>
      <p style="margin:0 0 32px;font-size:15px;color:#888;line-height:1.9;">
        O Aurum App não é mais um app de investimentos. É o lugar onde uma comunidade séria constrói patrimônio com inteligência, propósito e pertencimento, porque acreditamos que crescer junto é mais poderoso do que crescer sozinho.
      </p>
    </td>
  </tr>

  <tr>
    <td style="padding:0 48px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-left:2px solid #C9A84C;background:#111008;">
        <tr>
          <td style="padding:20px 24px;">
            <p style="margin:0 0 8px;font-size:10px;color:#7a6535;letter-spacing:4px;text-transform:uppercase;">Você é</p>
            <p style="margin:0 0 10px;font-size:22px;color:#C9A84C;font-style:italic;letter-spacing:1px;">Cofundador do Aurum</p>
            <p style="margin:0;font-size:14px;color:#777;line-height:1.8;">Como um dos primeiros 100, você não é apenas um usuário, você ajuda a moldar o que o Aurum se tornará. Sua presença aqui é parte da nossa fundação.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr><td style="padding:0 48px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#1f1c14,transparent);"></div></td></tr>

  <tr>
    <td style="padding:32px 48px 0;">
      <p style="margin:0 0 24px;font-size:10px;color:#7a6535;letter-spacing:4px;text-transform:uppercase;">O que você conquistou</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td width="28" valign="top" style="padding-top:2px;"><div style="width:6px;height:6px;background:#C9A84C;transform:rotate(45deg);margin-top:6px;"></div></td>
          <td>
            <p style="margin:0 0 3px;font-size:14px;color:#EEECE6;">Badge exclusivo de <strong style="color:#C9A84C;font-weight:400;">Cofundador</strong> na comunidade</p>
            <p style="margin:0;font-size:12px;color:#555;">Uma identidade única que ninguém mais poderá conquistar depois de você</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td width="28" valign="top" style="padding-top:2px;"><div style="width:6px;height:6px;background:#C9A84C;transform:rotate(45deg);margin-top:6px;"></div></td>
          <td>
            <p style="margin:0 0 3px;font-size:14px;color:#EEECE6;">Preço exclusivo de <strong style="color:#C9A84C;font-weight:400;">Cofundador</strong> no plano</p>
            <p style="margin:0;font-size:12px;color:#555;">Desconto especial reservado apenas para os primeiros 100 cadastrados</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td width="28" valign="top" style="padding-top:2px;"><div style="width:6px;height:6px;background:#C9A84C;transform:rotate(45deg);margin-top:6px;"></div></td>
          <td>
            <p style="margin:0 0 3px;font-size:14px;color:#EEECE6;">Descontos em todos os <strong style="color:#C9A84C;font-weight:400;">cursos futuros</strong></p>
            <p style="margin:0;font-size:12px;color:#555;">Cada curso lançado pelo Aurum terá condição especial para você</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td width="28" valign="top" style="padding-top:2px;"><div style="width:6px;height:6px;background:#C9A84C;transform:rotate(45deg);margin-top:6px;"></div></td>
          <td>
            <p style="margin:0 0 3px;font-size:14px;color:#EEECE6;">Acesso antecipado em <strong style="color:#C9A84C;font-weight:400;">Julho de 2026</strong></p>
            <p style="margin:0;font-size:12px;color:#555;">Você entra antes de todo mundo, antes do lançamento público</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td width="28" valign="top" style="padding-top:2px;"><div style="width:6px;height:6px;background:#C9A84C;transform:rotate(45deg);margin-top:6px;"></div></td>
          <td>
            <p style="margin:0 0 3px;font-size:14px;color:#EEECE6;"><strong style="color:#C9A84C;font-weight:400;">Voto ativo</strong> no futuro do app</p>
            <p style="margin:0;font-size:12px;color:#555;">Faremos votações exclusivas com os 100 Cofundadores sobre funcionalidades, decisões e o que vem por aí. Sua voz molda o produto.</p>
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
        <tr>
          <td width="28" valign="top" style="padding-top:2px;"><div style="width:6px;height:6px;background:#C9A84C;transform:rotate(45deg);margin-top:6px;"></div></td>
          <td>
            <p style="margin:0 0 3px;font-size:14px;color:#EEECE6;">Surpresas reservadas para quem <strong style="color:#C9A84C;font-weight:400;">chegou primeiro</strong></p>
            <p style="margin:0;font-size:12px;color:#555;">Algumas coisas a gente prefere revelar na hora certa...</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr><td style="padding:0 48px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#1f1c14,transparent);"></div></td></tr>

  <tr>
    <td style="padding:36px 48px;text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;color:#555;line-height:1.8;">O próximo passo é entrar no nosso grupo exclusivo de Cofundadores, onde você acompanha o desenvolvimento do app em tempo real e tem voz ativa no que estamos construindo.</p>
      <p style="margin:0 0 28px;font-size:12px;color:#555;">Junte-se a quem chegou primeiro.</p>
      <a href="#LINK_GRUPO_VIP" style="display:inline-block;background:#C9A84C;color:#080808;font-family:Georgia,serif;font-size:11px;font-weight:400;letter-spacing:4px;text-transform:uppercase;text-decoration:none;padding:16px 48px;">
        Entrar no Grupo VIP
      </a>
    </td>
  </tr>

  <tr><td style="padding:0 48px;"><div style="height:1px;background:linear-gradient(90deg,transparent,#1f1c14,transparent);"></div></td></tr>

  <tr>
    <td style="padding:32px 48px 36px;text-align:center;">
      <p style="margin:0;font-size:14px;color:#444;font-style:italic;line-height:1.9;">"A riqueza real começa quando decidimos construir algo maior que nós mesmos, e quando fazemos isso juntos, o resultado é inevitável."</p>
      <p style="margin:16px 0 0;font-size:11px;color:#3a3a3a;letter-spacing:2px;">Equipe Aurum</p>
    </td>
  </tr>

  <tr>
    <td style="padding:20px 48px;border-top:1px solid #161410;text-align:center;background:#080808;">
      <p style="margin:0 0 4px;font-size:10px;color:#333;letter-spacing:3px;text-transform:uppercase;">Grupo Aurum · Fundado em Valor</p>
      <p style="margin:0;font-size:10px;color:#2a2a2a;">noreply@grupoaurum.app.br</p>
      <p style="margin:12px 0 0;font-size:10px;color:#252525;">Você está recebendo este email por ter se cadastrado na lista de espera do Aurum App.</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

async function sendWelcomeEmail(email, nome) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "noreply@grupoaurum.app.br",
        to: [email],
        subject: "Bem-vindo à família Aurum — Você é Cofundador",
        html: buildEmailHtml(nome),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Resend error:", err);
    }
  } catch (err) {
    console.error("Erro ao enviar email:", err);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

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

  if (honeypot) {
    return res.status(200).json({ success: true });
  }

  if (!full_name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

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

  // Envia email de boas-vindas (não bloqueia a resposta)
  const firstName = full_name.split(" ")[0];
  sendWelcomeEmail(email.toLowerCase(), firstName);

  return res.status(200).json({ success: true });
}