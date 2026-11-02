import { supabase } from '@/services/supabase';

export async function ensureServiceHasNoBookings(id: string): Promise<void> {
  const { data: directBookings, error: directError } = await supabase.from('spa_bookings').select('id').eq('service_id', id).limit(1);
  if (directError) throw new Error(`Could not verify service booking history: ${directError.message}`);
  if (directBookings?.length) throw new Error('This service has booking history and can no longer be edited or deleted.');

  const { data: packageLinks, error: linksError } = await supabase.from('spa_package_services').select('package_id').eq('service_id', id);
  if (linksError) throw new Error(`Could not verify package booking history for this service: ${linksError.message}`);
  const packageIds = [...new Set((packageLinks ?? []).map((link) => link.package_id as string))];
  if (!packageIds.length) return;

  const { data: packageBookings, error: packageError } = await supabase.from('spa_bookings').select('id').in('package_id', packageIds).limit(1);
  if (packageError) throw new Error(`Could not verify package booking history for this service: ${packageError.message}`);
  if (packageBookings?.length) throw new Error('This service belongs to a package with booking history and can no longer be edited or deleted.');
}

export async function ensurePackageHasNoBookings(id: string): Promise<void> {
  const { data, error } = await supabase.from('spa_bookings').select('id').eq('package_id', id).limit(1);
  if (error) throw new Error(`Could not verify package booking history: ${error.message}`);
  if (data?.length) throw new Error('This package has booking history and can no longer be edited or deleted.');
}

export async function ensureTherapistHasNoBookings(id: string): Promise<void> {
  const { data, error } = await supabase.from('spa_bookings').select('id').eq('therapist_id', id).limit(1);
  if (error) throw new Error(`Could not verify therapist booking history: ${error.message}`);
  if (data?.length) throw new Error('This therapist has booking history and can no longer be edited or deleted.');
}
