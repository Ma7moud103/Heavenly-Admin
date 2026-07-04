import { supabase } from "@/services/supabase"
import type { RoomStatus } from "@/interfaces/IRooms"
import type { PostgrestError } from "@supabase/supabase-js"

export const getRoomStatuses = async (): Promise<{
  roomStatuses: RoomStatus[] | null
  error: PostgrestError | null
}> => {
  const { data, error } = await supabase.from("room_statuses").select("*")

  return {
    roomStatuses: data ?? null,
    error,
  }
}
