import type { ICreateBookingPayload } from "@/data/createBooking"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import type { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "@/services/supabase"

export const updateBooking = async (
  bookingId: string,
  payload: ICreateBookingPayload
): Promise<{
  booking: IRoomBooking | null
  error: PostgrestError | null
}> => {
  const { data, error } = await supabase
    .from("room_bookings")
    .update(payload)
    .eq("id", bookingId)
    .select(
      `
      *,
      room:room_id (*),
      status:status_id (*),
      guest:user_id (*)
    `
    )
    .single()

  return {
    booking: data ?? null,
    error,
  }
}
