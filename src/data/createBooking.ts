import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import type { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "@/services/supabase"

export interface ICreateBookingPayload {
  room_id: string
  guest_id: number
  check_in: string
  check_out: string
  total_price: number
  status_id: string
}

export const createBooking = async (
  payload: ICreateBookingPayload
): Promise<{
  booking: IRoomBooking | null
  error: PostgrestError | null
}> => {
  const { data, error } = await supabase
    .from("room_bookings")
    .insert(payload)
    .select(
      `
      *,
      room:room_id (*),
      status:status_id (*),
      guest:guest_id (*)
    `
    )
    .single()

  return {
    booking: data ?? null,
    error,
  }
}
