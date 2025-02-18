import { supabase } from './supabase';

export async function getProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('routine_step', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return products;
}

export async function getProductsByType(type) {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('type', type)
    .order('routine_step', { ascending: true });

  if (error) {
    console.error('Error fetching products by type:', error);
    return [];
  }

  return products;
}

export async function getProductsByRoutineStep(step) {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('routine_step', step)
    .order('price', { ascending: true });

  if (error) {
    console.error('Error fetching products by routine step:', error);
    return [];
  }

  return products;
}
