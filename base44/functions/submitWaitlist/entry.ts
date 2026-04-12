import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// In-memory rate limit store: ip -> [timestamps]
const rateLimitStore = new Map();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  return false;
}

Deno.serve(async (req) => {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return Response.json({ error: 'Muitas tentativas. Tente novamente mais tarde.' }, { status: 429 });
    }

    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { full_name, email, whatsapp, monthly_income, occupation, already_invests, main_goal, wants_early_access, website } = body;

    // Honeypot: bots fill hidden fields, humans don't
    if (website) {
      return Response.json({ success: true }); // silently reject
    }

    if (!full_name || !email) {
      return Response.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 });
    }

    // Check for duplicate email
    const existing = await base44.asServiceRole.entities.WaitlistEntry.filter({ email });
    if (existing && existing.length > 0) {
      return Response.json({ success: true }); // silently succeed to avoid enumeration
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