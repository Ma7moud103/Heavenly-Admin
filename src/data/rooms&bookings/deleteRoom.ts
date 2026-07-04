import type { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "@/services/supabase"

export const deleteRoom = async (
  roomId: string
): Promise<{
  error: PostgrestError | null
}> => {
  const { error } = await supabase.from("rooms").delete().eq("id", roomId)

  return { error }
}
