import { supabase } from '@/services/supabase';
import type { IRoomsTypes } from '@/interfaces/IRooms';

export type RoomTypePayload = Pick<IRoomsTypes, 'name' | 'price'>;

export async function createRoomType(payload: RoomTypePayload) {
  const { error } = await supabase.from('room_types').insert(payload).select().single();

  return { error };
}
