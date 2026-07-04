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
      room:room_id (*, room_type:rooms_room_type_id_fkey(*)),
      status:status_id (*),
      guest:guest_id (*)
    `
  );

  


  return {
    bookings: data ?? null,
    error,
  }
}
