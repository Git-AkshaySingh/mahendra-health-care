import { supabase } from "@/integrations/supabase/client";

// This script imports medicines from the Stock.xls file
// Run this once to populate the database with medicine data

const stockData = [
  // Sample data structure - replace with actual parsed data
  {
    code: "ZZ003734",
    name: "112 SAAL KI BUDIYA GHUTTI 1*100ML",
    unit: "PCS",
    currentStock: 1,
    mrp: 67.50,
    salesPrice: 0.00,
    purchasePrice: 60.00,
    manufacturer: "AYURVEDIC",
    company: "AYURVEDIC"
  }
  // Add more items here...
];

export async function importMedicines() {
  console.log("Starting medicine import...");
  
  try {
    // First, create or get categories
    const uniqueManufacturers = [...new Set(stockData.map(item => item.manufacturer || item.company).filter(Boolean))];
    
    const categoryMap: Record<string, string> = {};
    
    for (const manufacturer of uniqueManufacturers) {
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id, name')
        .eq('name', manufacturer)
        .single();
      
      if (existingCategory) {
        categoryMap[manufacturer] = existingCategory.id;
      } else {
        const { data: newCategory, error } = await supabase
          .from('categories')
          .insert({ name: manufacturer })
          .select('id')
          .single();
        
        if (newCategory && !error) {
          categoryMap[manufacturer] = newCategory.id;
        }
      }
    }
    
    // Import medicines in batches
    const batchSize = 50;
    let imported = 0;
    let errors = 0;
    
    for (let i = 0; i < stockData.length; i += batchSize) {
      const batch = stockData.slice(i, i + batchSize);
      
      const medicineRecords = batch.map(item => {
        const manufacturer = item.manufacturer || item.company || 'OTHER';
        const price = item.salesPrice > 0 ? item.salesPrice : item.mrp;
        
        return {
          name: item.name,
          price: price,
          stock_quantity: item.currentStock || 0,
          manufacturer: manufacturer,
          category_id: categoryMap[manufacturer] || null,
          image_url: null,
          description: `${item.name} - ${item.unit}`,
          dosage_form: item.unit,
          strength: extractStrength(item.name),
          active_ingredients: null,
          requires_prescription: false
        };
      });
      
      const { error } = await supabase
        .from('medicines')
        .insert(medicineRecords);
      
      if (error) {
        console.error(`Error importing batch ${i / batchSize + 1}:`, error);
        errors += batch.length;
      } else {
        imported += batch.length;
        console.log(`Imported batch ${i / batchSize + 1}: ${imported} total`);
      }
    }
    
    console.log(`Import complete! Imported: ${imported}, Errors: ${errors}`);
    return { imported, errors };
  } catch (error) {
    console.error("Import failed:", error);
    throw error;
  }
}

function extractStrength(name: string): string | null {
  // Extract dosage information from product name
  // Example: "ABENDOL 100 CAP" -> "100"
  const matches = name.match(/(\d+(?:\.\d+)?)\s*(?:MG|ML|GM|G|%|MCG)/i);
  return matches ? matches[0] : null;
}
