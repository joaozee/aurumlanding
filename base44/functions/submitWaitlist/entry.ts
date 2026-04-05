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

    return Response.json({ success: true, id: entry.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});