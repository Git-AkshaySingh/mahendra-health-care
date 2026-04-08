import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { medicines } = await req.json();

    if (!medicines || !Array.isArray(medicines)) {
      return new Response(JSON.stringify({ error: "medicines array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rows = medicines.map((m: any) => ({
      name: m.name,
      price: 0,
      category: "medicines",
      manufacturer: m.manufacturer || null,
      dosage: m.dosage || null,
      description: m.description || null,
      form: m.form || null,
      salt: m.salt || null,
      strength_value: m.strength_value || null,
      strength_unit: m.strength_unit || null,
      pack_size: m.pack_size || null,
      pack_type: m.pack_type || null,
      stock_quantity: 100,
    }));

    const { data, error } = await supabase.from("products").insert(rows);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, count: rows.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
