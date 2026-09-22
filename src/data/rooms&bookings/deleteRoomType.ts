import { supabase } from '@/services/supabase';

export async function deleteRoomType(roomTypeId: string) {
  const { error } = await supabase.from('room_types').delete().eq('id', roomTypeId);

  return { error };
}
