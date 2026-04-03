import type { IRoom } from "@/interfaces/IRooms";
import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "@/services/supabase";

export const fetchRoomsData = async (): Promise<{
  rooms: IRoom[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase
    .from("rooms")
    .select(
      `
      *,
      room_type:room_type_id (*),
      status:status_id (*)
    `
    );

  return {
    rooms: data ?? null,
    error,
  };
};


