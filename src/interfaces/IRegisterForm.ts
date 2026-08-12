import type { STEPS } from '@/utils/register/constants.constants';

type TRoles = 'user' | 'admin' | 'superAdmin';
export interface ILoginForm {
  full_name: string;
  email: string;
  password: string;
}
export interface IForm extends ILoginForm {
  phone: string;
  avatar_url?: string;
  role: TRoles;
  is_active: boolean;
  confirm_password: string;
  country: string;
  visits?: number;
}

export interface RegisterPasswordStateProps {
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
}

export type TrequiredFields = 'full_name' | 'phone' | 'email' | 'password' | 'country' | 'role_name';

export type RegisterStepId = (typeof STEPS)[number]['id'];
