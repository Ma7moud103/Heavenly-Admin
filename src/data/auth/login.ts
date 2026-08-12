import type { ILoginForm } from '@/interfaces/IRegisterForm';
import { supabase } from '@/services/supabase';

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

export default login;
