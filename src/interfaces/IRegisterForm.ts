import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { RegisterRoleOption } from '@/utils/register/registerValidation';

type TRoles = 'staff' | 'admin' | 'super_admin';
export interface IForm {
  full_name: string;
  phone: string;
  avatar_url?: string;
  role_name: TRoles;
  is_active: boolean;
  email: string;
  password: string;
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
