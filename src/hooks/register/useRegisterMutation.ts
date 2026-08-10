import signup from '@/data/auth/register';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['signup'],
      });
    },

    onError: (error) => {
      console.log(error.message);
      return new Error(error.message);
    },
  });
};

export default useRegisterMutation;
