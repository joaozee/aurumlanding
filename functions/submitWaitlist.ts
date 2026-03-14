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

    // Enviar e-mail de boas-vindas
    await base44.asServiceRole.integrations.Core.SendEmail({
      from_name: "Aurum",
      to: email,
      subject: "Bem-vindo à lista de espera do Aurum! 🎯",
      body: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a383af798034b14ce37469/310e79247_WhatsAppImage2026-01-30at1902451.jpg" alt="Aurum" style="height: 60px;" />
          </div>
          
          <h1 style="color: #D4AF37; font-size: 28px; margin-bottom: 20px; text-align: center;">Bem-vindo à nova era das finanças pessoais!</h1>
          
          <p style="color: #BFBFBF; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Olá, <strong style="color: #fff;">${full_name}</strong>!</p>
          
          <p style="color: #BFBFBF; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Você está oficialmente na lista de espera do <strong style="color: #D4AF37;">Aurum</strong>. 🎉</p>
          
          <div style="background-color: #0E0E0E; border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 12px; padding: 25px; margin: 30px 0;">
            <p style="color: #BFBFBF; font-size: 15px; line-height: 1.7; margin-bottom: 15px;">✨ Você está dando o primeiro passo para transformar sua vida financeira com <span style="color: #D4AF37;">clareza</span>, <span style="color: #D4AF37;">estratégia</span> e <span style="color: #D4AF37;">inteligência</span>.</p>
            
            <p style="color: #BFBFBF; font-size: 15px; line-height: 1.7; margin-bottom: 15px;">📧 Fique de olho no seu e-mail: quando o Aurum for lançado, você será um dos primeiros a saber.</p>
            
            <p style="color: #BFBFBF; font-size: 15px; line-height: 1.7; margin: 0;">🎁 Você terá acesso a <strong style="color: #fff;">benefícios exclusivos</strong> por fazer parte da lista de espera.</p>
          </div>
          
          <p style="color: #BFBFBF; font-size: 15px; line-height: 1.6; margin-top: 30px; text-align: center;">Até breve,<br><strong style="color: #D4AF37;">Equipe Aurum</strong></p>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="color: #666; font-size: 12px;">© 2026 Aurum. Todos os direitos reservados.</p>
          </div>
        </div>
      `
    });

    return Response.json({ success: true, id: entry.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});