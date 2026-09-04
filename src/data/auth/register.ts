import type { IForm } from '@/interfaces/IRegisterForm';
import { supabase } from '@/services/supabase';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

async function signup(formData: IForm) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    options: {
      data: {
        full_name: formData.full_name,
        phone: formData.phone,
        avatar_url: formData.avatar_url || null,
        country: formData.country,
      },
    },
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

export const useRegisterMutation = () => {
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
