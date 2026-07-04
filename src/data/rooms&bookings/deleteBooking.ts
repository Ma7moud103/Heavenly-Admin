import type { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "@/services/supabase"

export const deleteBooking = async (
  bookingId: string
): Promise<{
  error: PostgrestError | null
}> => {
  const { error } = await supabase.from("room_bookings").delete().eq("id", bookingId)

  return { error }
}
