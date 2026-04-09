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

    const body = await req.json();
    
    // Support both medicines and products arrays
    const items = body.medicines || body.products;

    if (!items || !Array.isArray(items)) {
      return new Response(JSON.stringify({ error: "medicines or products array required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rows = items.map((m: any) => ({
      name: m.name,
      price: m.price || 0,
      category: m.category || "General",
      manufacturer: m.manufacturer || null,
      dosage: m.dosage || null,
      description: m.description || null,
      form: m.form || null,
      salt: m.salt || null,
      strength_value: m.strength_value || null,
      strength_unit: m.strength_unit || null,
      pack_size: m.pack_size || null,
      pack_type: m.pack_type || null,
      stock_quantity: m.stock_quantity || 100,
    }));

    // Insert in batches of 500
    const batchSize = 500;
    let totalInserted = 0;

    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      const { error } = await supabase.from("products").insert(batch);
      if (error) {
        return new Response(JSON.stringify({ error: error.message, inserted: totalInserted }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      totalInserted += batch.length;
    }

    return new Response(JSON.stringify({ success: true, count: totalInserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
