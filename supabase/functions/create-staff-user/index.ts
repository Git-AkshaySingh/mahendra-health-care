import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    const url = Deno.env.get('SUPABASE_URL') ?? ''
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

    const userClient = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } })
    const { data: { user } } = await userClient.auth.getUser(token)
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...cors, 'Content-Type': 'application/json' } })

    const admin = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })

    const { data: roleCheck } = await admin.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin').maybeSingle()
    if (!roleCheck) return new Response(JSON.stringify({ error: 'Forbidden - admin only' }), { status: 403, headers: { ...cors, 'Content-Type': 'application/json' } })

    const { email, password, full_name, role = 'staff' } = await req.json()
    if (!email || !password) return new Response(JSON.stringify({ error: 'email and password required' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } })
    if (!['staff', 'admin'].includes(role)) return new Response(JSON.stringify({ error: 'Invalid role' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } })

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { full_name: full_name || email.split('@')[0] },
    })
    if (createErr || !created.user) return new Response(JSON.stringify({ error: createErr?.message || 'Create failed' }), { status: 400, headers: { ...cors, 'Content-Type': 'application/json' } })

    const uid = created.user.id
    await admin.from('user_roles').delete().eq('user_id', uid)
    const { error: roleErr } = await admin.from('user_roles').insert({ user_id: uid, role })
    if (roleErr) return new Response(JSON.stringify({ error: roleErr.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ success: true, user_id: uid }), { headers: { ...cors, 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } })
  }
})