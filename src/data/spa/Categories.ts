import type { ISpaCategories } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export async function getCategories(): Promise<{ data: ISpaCategories[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_categories').select('*');

  if (error) console.error('Error fetching spa categories:', error);

  return { data: data || [], error };
}
