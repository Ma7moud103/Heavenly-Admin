import type { ICreateBookingPayload } from '@/data/rooms&bookings/createBooking';
import type { IRoomBooking } from '@/interfaces/IRoomBookings';
import type { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';

export const updateBooking = async (
  bookingId: string,
  payload: ICreateBookingPayload,
): Promise<{ booking: IRoomBooking | null; error: PostgrestError | null }> => {
  const { data: current, error: currentError } = await supabase
    .from('room_bookings')
    .select('status:status_id(name)')
    .eq('id', bookingId)
    .single();

  if (currentError) return { booking: null, error: currentError };

  const currentStatus = (current.status as unknown as { name: string } | null)?.name?.toLowerCase() ?? '';
  const nextByStatus: Record<string, string[]> = {
    pending: ['pending', 'confirmed', 'cancelled'],
    confirmed: ['confirmed', 'checked-in', 'cancelled'],
    'checked-in': ['checked-in', 'checked-out', 'cancelled'],
    'checked-out': [],
    cancelled: [],
  };
  const { data: nextStatus, error: statusError } = await supabase
    .from('booking_status')
    .select('name')
    .eq('id', payload.status_id)
    .single();

  if (statusError) return { booking: null, error: statusError };
  if (!nextByStatus[currentStatus]?.includes(nextStatus.name.toLowerCase())) {
    throw new Error('Booking status can only move forward or be cancelled. Checked-out and cancelled bookings cannot be edited.');
  }

  const { data, error } = await supabase
    .from('room_bookings')
    .update(payload)
    .eq('id', bookingId)
    .select('*,room:room_id(*),status:status_id(*),guest:guest_id(*)')
    .single();

  return { booking: data ?? null, error };
};