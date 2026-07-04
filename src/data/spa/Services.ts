import type { ISpaServices } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export async function getServices(): Promise<{ data: ISpaServices[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_services').select('*,category_id(name,description)');

  if (error) console.error('Error fetching spa Services:', error);

  return { data: data || [], error };
}
