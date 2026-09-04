import { supabase } from '@/services/supabase';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

async function resetPassword(newPassword: string): Promise<void> {
  const response = await supabase.auth.updateUser({ password: newPassword });

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error(error.message || 'Failed to change password.');
    },
  });
};
