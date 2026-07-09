import type { ISpaPackages, ISpaServices } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface IProps {
  id: string;
  package_id: ISpaPackages;
  service_id: ISpaServices;
}
export async function getSpaPackages(): Promise<{ data: IProps[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_package_services').select('*,package_id(*),service_id(*)');

  if (error) console.error('Error fetching spa packages:', error);

  return { data: data || [], error };
}

export async function getSpaPackagesWithoutServices(): Promise<{ data: ISpaPackages[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_packages').select('*,category_id(*)');

  if (error) console.error('Error fetching spa packages:', error);

  return { data: data || [], error };
}
