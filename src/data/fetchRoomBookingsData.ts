import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import type { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "@/services/supabase"

export const fetchRoomBookingsData = async (): Promise<{
  bookings: IRoomBooking[] | null
  error: PostgrestError | null
}> => {
  const { data, error } = await supabase.from("room_bookings").select(
    `
      *,
      rooms:room_id (*, room_type:room_type_id (*)),
      booking_status:status_id (*),
      profiles:user_id (*)
    `
  );

  return {
    bookings: data ?? null,
    error,
  }
}
