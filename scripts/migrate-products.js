import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { products } from '../src/data/products.js'; // Note the .js extension

dotenv.config();

console.log('Supabase URL:', process.env.VITE_SUPABASE_URL); // Debug log
console.log('Service Role Key:', process.env.VITE_SUPABASE_SERVICE_ROLE_KEY); // Debug log

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY // Use the service role key
);

async function migrateProducts() {
  console.log('Starting migration...');

  // First, delete existing products
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .not('id', 'is', null);

  if (deleteError) {
    console.error('Error deleting existing products:', deleteError);
    return;
  }

  console.log('Existing products deleted');

  // Insert new products directly
  const { error: insertError } = await supabase
    .from('products')
    .insert(products);

  if (insertError) {
    console.error('Error migrating products:', insertError);
    return;
  }

  console.log('Products migrated successfully!');
  process.exit(0);
}

migrateProducts().catch(console.error);
