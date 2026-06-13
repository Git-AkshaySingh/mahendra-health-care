import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors })
  try {
    const url = Deno.env.get('SUPABASE_URL') ?? ''
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')

    const userClient = createClient(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: { user } } = await userClient.auth.getUser(token)
    if (!user) return json({ error: 'Unauthorized' }, 401)

    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data: roleRow } = await admin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle()
    if (!roleRow) return json({ error: 'Forbidden - admin only' }, 403)

    const body = await req.json()
    const { action, user_id } = body as { action: string; user_id: string }
    if (!action || !user_id) return json({ error: 'action and user_id required' }, 400)
    if (user_id === user.id && (action === 'delete' || action === 'disable'))
      return json({ error: 'Cannot perform this action on yourself' }, 400)

    switch (action) {
      case 'delete': {
        const { error } = await admin.auth.admin.deleteUser(user_id)
        if (error) return json({ error: error.message }, 400)
        return json({ success: true })
      }
      case 'disable': {
        const { error: e1 } = await admin.auth.admin.updateUserById(user_id, {
          ban_duration: '876000h', // ~100 years
        })
        if (e1) return json({ error: e1.message }, 400)
        await admin.from('profiles').update({ disabled: true }).eq('id', user_id)
        return json({ success: true })
      }
      case 'enable': {
        const { error: e1 } = await admin.auth.admin.updateUserById(user_id, {
          ban_duration: 'none',
        })
        if (e1) return json({ error: e1.message }, 400)
        await admin.from('profiles').update({ disabled: false }).eq('id', user_id)
        return json({ success: true })
      }
      case 'reset_password': {
        const { password } = body as { password: string }
        if (!password || password.length < 6)
          return json({ error: 'Password must be at least 6 characters' }, 400)
        const { error } = await admin.auth.admin.updateUserById(user_id, { password })
        if (error) return json({ error: error.message }, 400)
        return json({ success: true })
      }
      case 'update_profile': {
        const { full_name, email, phone } = body as {
          full_name?: string
          email?: string
          phone?: string
        }
        if (email) {
          const { error } = await admin.auth.admin.updateUserById(user_id, { email })
          if (error) return json({ error: error.message }, 400)
        }
        const patch: Record<string, unknown> = {}
        if (full_name !== undefined) patch.full_name = full_name
        if (email !== undefined) patch.email = email
        if (phone !== undefined) patch.phone = phone
        if (Object.keys(patch).length) {
          await admin.from('profiles').update(patch).eq('id', user_id)
        }
        return json({ success: true })
      }
      default:
        return json({ error: 'Unknown action' }, 400)
    }
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : 'Unknown' }, 500)
  }
})