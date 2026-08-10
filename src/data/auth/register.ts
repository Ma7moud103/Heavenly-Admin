import type { IForm } from '@/interfaces/IRegisterForm';
import { supabase } from '@/services/supabase';

export interface SignupSuccessResult {
  success: true;
  user: unknown;
}

export interface SignupErrorResult {
  success: false;
  error: string;
}

export type SignupResult = SignupSuccessResult | SignupErrorResult;

async function signup(formData: IForm): Promise<SignupResult> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData?.user) {
      throw new Error('Failed to create user account');
    }

    sessionStorage.setItem('user', JSON.stringify(authData.user));

    // Create user profile
    const profileResult = await createUserProfile(authData.user.id, formData);

    if (!profileResult.success) {
      return profileResult;
    }

    return {
      success: true,
      user: authData.user,
    };
  } catch (error: any) {
    console.error('Unexpected signup error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
    };
  }
}

async function createUserProfile(userId: string, formData: IForm): Promise<SignupResult> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        full_name: formData.full_name,
        phone: formData.phone,
        avatar_url: formData.avatar_url || null,
        role: formData.role_name,
        is_active: formData.is_active ?? true,
        country: formData.country,
        email: formData.email,
        visits: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error.message);
      throw new Error(error.message);
    }

    return {
      success: true,
      user: data,
    };
  } catch (error: any) {
    console.error('Unexpected profile creation error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred while creating the profile',
    };
  }
}

export default signup;
