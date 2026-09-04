import type { ILoginForm } from '@/interfaces/IRegisterForm';
import { supabase } from '@/services/supabase';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

async function login(formData: ILoginForm) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.error(error.cause);
    throw new Error(error.message);
  }

  if (!data?.user) {
    throw new Error('Failed to create user account');
  }

  console.log(data);
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Login successful!');
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred during signing in.');
      throw new Error(error.message || 'An error occurred during signing in.');
    },
  });
};
