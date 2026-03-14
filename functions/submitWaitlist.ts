import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { full_name, email, whatsapp, monthly_income, occupation, already_invests, main_goal, wants_early_access } = body;

    if (!full_name || !email) {
      return Response.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 });
    }

    const entry = await base44.asServiceRole.entities.WaitlistEntry.create({
      full_name,
      email,
      whatsapp,
      monthly_income,
      occupation,
      already_invests,
      main_goal,
      wants_early_access,
    });

    // Enviar e-mail de boas-vindas de forma assíncrona (não bloqueia a resposta)
    base44.asServiceRole.integrations.Core.SendEmail({
      from_name: "Aurum",
      to: email,
      subject: "Bem-vindo à lista de espera do Aurum! 🌟",
      body: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000000; color: #ffffff; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 40px;">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a383af798034b14ce37469/310e79247_WhatsAppImage2026-01-30at1902451.jpg" alt="Aurum" style="height: 80px; width: auto;">
          </div>
          
          <div style="background: linear-gradient(135deg, #0E0E0E 0%, #1A1A1A 100%); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 16px; padding: 32px; margin-bottom: 32px;">
            <h1 style="color: #D4AF37; font-size: 28px; font-weight: 700; margin: 0 0 16px 0;">Olá, ${full_name}! 👋</h1>
            <p style="color: #BFBFBF; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Você acaba de dar o <strong style="color: #ffffff;">primeiro passo</strong> para transformar sua vida financeira.
            </p>
            <p style="color: #BFBFBF; font-size: 16px; line-height: 1.6; margin: 0;">
              Bem-vindo à lista de espera do <strong style="color: #D4AF37;">Aurum</strong> — o app que vai organizar suas finanças e guiar seus investimentos com inteligência.
            </p>
          </div>

          <div style="background-color: #0E0E0E; border-left: 3px solid #D4AF37; padding: 24px; margin-bottom: 32px; border-radius: 8px;">
            <h2 style="color: #D4AF37; font-size: 18px; font-weight: 600; margin: 0 0 12px 0;">O que vem por aí:</h2>
            <ul style="color: #BFBFBF; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Acesso antecipado ao app antes do lançamento oficial</li>
              <li>Benefícios exclusivos para early adopters</li>
              <li>Atualizações sobre o desenvolvimento do Aurum</li>
            </ul>
          </div>

          <div style="text-align: center; margin-bottom: 32px;">
            <p style="color: #BFBFBF; font-size: 15px; line-height: 1.6; margin: 0;">
              Fique de olho no seu e-mail. Em breve, você receberá novidades e seu convite para testar o Aurum.
            </p>
          </div>

          <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 24px; text-align: center;">
            <p style="color: #666666; font-size: 13px; margin: 0;">
              © 2026 Aurum. Construindo o futuro das suas finanças.
            </p>
          </div>
        </div>
      `
    });

    return Response.json({ success: true, id: entry.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});