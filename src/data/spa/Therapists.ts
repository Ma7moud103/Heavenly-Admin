import type { ISpaTherapists } from '@/interfaces/ISpa';
import { supabase } from '@/lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export async function getTherapists(): Promise<{ data: ISpaTherapists[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_therapists').select('*');

  if (error) console.error('Error fetching spa Therapists:', error);

  return { data: data || [], error };
}
