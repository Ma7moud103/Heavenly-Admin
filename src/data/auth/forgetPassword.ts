import { supabase } from '@/services/supabase';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

async function forgotPassword(email: string): Promise<void> {
  const response = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }
}

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('If an account exists for this email, you will receive a password reset link.');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send password reset link.');
    },
  });
};
