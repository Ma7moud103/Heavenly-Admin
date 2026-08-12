import signup from '@/data/auth/register';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const useRegisterMutation = () => {
  return useMutation({
    mutationFn: signup,

    onSuccess: () => {
      toast.success('User registered successfully!');
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message || 'An error occurred during registration.');
      return new Error(error.message);
    },
  });
};

export default useRegisterMutation;
