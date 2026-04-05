import type { IRoom } from "@/interfaces/IRooms"
import type { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "@/services/supabase"
import type { ICreateRoomPayload } from "@/data/createRoom"

export const updateRoom = async (
  roomId: string,
  payload: ICreateRoomPayload
): Promise<{
  room: IRoom | null
  error: PostgrestError | null
}> => {
  const { data, error } = await supabase
    .from("rooms")
    .update(payload)
    .eq("id", roomId)
    .select(
      `*,
      room_type:rooms_room_type_id_fkey(*),
      status:status_id (*)
    `
    )
    .single()

  return {
    room: data ?? null,
    error,
  }
}
