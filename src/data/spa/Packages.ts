import type { ICreatePackage, ISpaPackages, ISpaServices } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';
import { ensurePackageHasNoBookings } from '@/data/spa/BookingGuards';

export async function getSpaPackages(): Promise<{ data: ISpaPackages[]; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_packages').select('*,category_id(*),spa_package_services(service_id(*,category_id(*)))');
  if (error) throw new Error(error.message);
  const packageRows = (data ?? []) as Array<ISpaPackages & { spa_package_services?: Array<{ service_id: ISpaServices | null }> }>;
  const packages = packageRows.map((item) => ({
    ...item,
    services: item.spa_package_services?.map((relation) => relation.service_id).filter(Boolean) ?? [],
  })) as ISpaPackages[];
  return { data: packages, error: null };
}

export async function saveSpaPackage(selectedPackage: ICreatePackage, id?: string): Promise<void> {
  const { services, ...packageFields } = selectedPackage;
  let packageId = id;

  if (id) {
    await ensurePackageHasNoBookings(id);
    const { error } = await supabase.from('spa_packages').update(packageFields).eq('id', id);
    if (error) throw new Error(error.message);
    const { error: deleteError } = await supabase.from('spa_package_services').delete().eq('package_id', id);
    if (deleteError) throw new Error(deleteError.message);
  } else {
    const { data, error } = await supabase.from('spa_packages').insert(packageFields).select('id').single();
    if (error) throw new Error(error.message);
    packageId = data.id;
  }

  if (services.length && packageId) {
    const { error } = await supabase
      .from('spa_package_services')
      .insert(services.map((serviceId) => ({ package_id: packageId, service_id: serviceId })));
    if (error) throw new Error(error.message);
  }
}
