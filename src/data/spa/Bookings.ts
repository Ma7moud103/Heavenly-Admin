import type { IBookingData, ISpaBookings } from '@/interfaces/ISpa';
import { supabase } from '@/services/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

export async function getBookings(): Promise<{ data: ISpaBookings[] | []; error: PostgrestError | null }> {
  const { data, error } = await supabase.from('spa_bookings').select('*,customer_id(*),therapist_id(*),service_id(*),package_id(*)');

  if (error) console.error('Error fetching spa Bookings:', error);

  return { data: data || [], error };
}

export async function createSpaBooking(booking: IBookingData): Promise<IBookingData[]> {
  const { data, error } = await supabase.from('spa_bookings').insert<IBookingData>(booking).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateSpaBooking(id: string, booking: IBookingData): Promise<void> {
  await ensureBookingHasNotStarted(id);
  const { error } = await supabase.from('spa_bookings').update(booking).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteSpaBooking(id: string): Promise<void> {
  await ensureBookingHasNotStarted(id);
  const { error } = await supabase.from('spa_bookings').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

async function ensureBookingHasNotStarted(id: string): Promise<void> {
  const { data, error } = await supabase.from('spa_bookings').select('booking_date,start_time,status').eq('id', id).single();
  if (error) throw new Error(error.message);
  if (!data || ['completed', 'cancelled', 'no_show'].includes(data.status)) {
    throw new Error('Only upcoming spa bookings can be changed.');
  }
  const startsAt = new Date(`${data.booking_date}T${data.start_time}`);
  if (startsAt.getTime() <= Date.now()) throw new Error('This booking can no longer be changed because it has started.');
}
