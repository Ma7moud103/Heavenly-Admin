import { supabase } from '@/services/supabase';
import type { RoomTypePayload } from '@/data/rooms&bookings/createRoomType';

export async function updateRoomType(roomTypeId: string, payload: RoomTypePayload) {
  const { error } = await supabase.from('room_types').update(payload).eq('id', roomTypeId).select().single();

  return { error };
}
