import type { ICreatePackage, ISpaPackages, ISpaServices } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface IProps {
  id: string;
  package_id: ISpaPackages;
  service_id: ISpaServices;
}
export async function getSpaPackages(): Promise<{ data: IProps[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_package_services').select('*,package_id(*),service_id(*)');

  if (error) {
    throw new Error('Error fetching spa packages:', error);
  }
  return { data: data || [], error };
}

export async function getSpaPackagesWithoutServices(): Promise<{ data: ISpaPackages[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_packages').select('*,category_id(*)');

  if (error) {
    console.error('Error fetching spa packages:', error);
    throw new Error('Error fetching spa packages:', error);
  }

  return { data: data || [], error };
}

export async function createNewPackage(x: ICreatePackage): Promise<ICreatePackage[]> {
  const { data, error } = await supabase.from('spa_packages').insert<ICreatePackage>(x).select();

  if (error) {
    console.log(error);
    throw new Error('something went wrong whild creating new package', error);
  }

  return data ?? [];
}
