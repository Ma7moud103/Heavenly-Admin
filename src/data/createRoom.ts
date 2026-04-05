import type { IRoom } from "@/interfaces/IRooms"
import type { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "@/services/supabase"

export interface ICreateRoomPayload {
  title: string
  base_price: number
  capacity: number
  description: string | null
  image_url: string | null
  room_type_id: string
  status_id: string
}

export const createRoom = async (
  payload: ICreateRoomPayload
): Promise<{
  room: IRoom | null
  error: PostgrestError | null
}> => {
  const { data, error } = await supabase
    .from("rooms")
    .insert(payload)
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
