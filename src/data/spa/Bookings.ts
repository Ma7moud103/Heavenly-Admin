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
