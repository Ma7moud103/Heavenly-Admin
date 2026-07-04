import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface IRoomsTypes {
  name: string;
  price: string | number;
}
export async function createRoomTypeAction(roomTypes: IRoomsTypes[]) {
  const { error } = await supabase.from('room_types').insert(roomTypes).select();
  if (error) throw new Error(error.message);
}

export function createRoomType() {
  const queryClient = useQueryClient();
  return useMutation({
    //here we used bind with null casue we don't want to change the context of the function and we want to pass the roomType as an argument to the function
    // mutationFn: createRoomTypeAction.bind(null, roomType),
    mutationFn: createRoomTypeAction,

    onSuccess: async () => {
      toast.success('Room type created successfully');
      await queryClient.invalidateQueries({ queryKey: ['roomTypes'] });
    },
    // onMutate: () => {
    //   setFormData({ name: '', price: '' });
    //   console.log('Creating room type...');
    // },
    onError: (error) => {
      console.error('Error creating room type:', error);
      toast.error(`Error creating room type: ${error.message}`);
    },
  });
}
