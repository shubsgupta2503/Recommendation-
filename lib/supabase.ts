import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function fetchProducts() {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      prices (
        *,
        store: stores (*)
      )
    `);

  if (error) throw error;
  return products;
}

export async function fetchProductsByCategory(category: string) {
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      prices (
        *,
        store: stores (*)
      )
    `)
    .eq('category', category);

  if (error) throw error;
  return products;
}