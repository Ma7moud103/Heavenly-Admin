import type { ISpaCustomer } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export async function getSpaCustomers(): Promise<{ data: ISpaCustomer[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_customers').select('*, guest_id(*)');

  if (error) console.error('Error fetching spa customers:', error);

  return { data: data || [], error };
}
