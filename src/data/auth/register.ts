import type { IForm } from '@/interfaces/IRegisterForm';
import { supabase } from '@/services/supabase';

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

  // sessionStorage.setItem(STRORED_USER_KEY, JSON.stringify(data.user));
  console.log(data);
  // await createUserProfile(data.user?.id as string, formData);
}

// async function createUserProfile(userId: string, formData: IForm): Promise<IForm | PostgrestError> {
//   const { data, error } = await supabase
//     .from('profiles')
//     .insert({
//       id: userId,
//       full_name: formData.full_name,
//       phone: formData.phone,
//       avatar_url: formData.avatar_url || null,
//       role: formData.role_name,
//       is_active: formData.is_active ?? true,
//       country: formData.country,
//       email: formData.email,
//       visits: 0,
//     })
//     .select()
//     .single();

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data as IForm;
// }

export default signup;
