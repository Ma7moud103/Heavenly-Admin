import { supabase } from "@/services/supabase"
import type { IRoomsTypes } from "@/interfaces/IRooms"
import type { PostgrestError } from "@supabase/supabase-js"

export const getRoomTypes = async (): Promise<{
  roomTypes: IRoomsTypes[] | null
  error: PostgrestError | null
}> => {
  const { data, error } = await supabase.from("room_types_with_count").select("*")

  return {
    roomTypes: data ?? null,
    error,
  }
}
