import type { ISpaServices } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export interface TherapistServiceOption {
  id: string;
  name: string;
  category_name: string;
}

interface TherapistServiceOptionRow {
  id: string;
  name: string;
  category_id: string | null;
  spa_categories: { name: string } | null;
}

export async function getServices(): Promise<{ data: ISpaServices[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_services').select('*,category_id(*)');

  if (error) console.error('Error fetching spa Services:', error);

  return { data: data || [], error };
}

export async function getActiveTherapistServiceOptions(): Promise<TherapistServiceOption[]> {
  const { data, error } = await supabase
    .from('spa_services')
    .select('id, name, category_id, spa_categories(name)')
    .eq('is_active', true)
    .order('name');

  if (error) throw new Error(error.message);

  return ((data ?? []) as unknown as TherapistServiceOptionRow[]).map((service) => ({
    id: service.id,
    name: service.name,
    category_name: service.spa_categories?.name ?? 'Uncategorized',
  }));
}
