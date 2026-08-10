import type { IForm } from '@/interfaces/IRegisterForm';
import { ROLE_OPTIONS, STEPS } from '@/utils/register/constants.constants';

export type RegisterStepId = (typeof STEPS)[number]['id'];

export type TrequiredFields = 'full_name' | 'phone' | 'email' | 'password' | 'country' | 'role_name';
const requiredCompletionFields: Array<keyof Pick<IForm, TrequiredFields>> = ['full_name', 'phone', 'email', 'password', 'country', 'role_name'];

const isProfileStepValid = (form: IForm) => {
  return Boolean(form.full_name.trim() && form.phone.trim() && form.email.trim() && form.country.trim());
};

const isAccessStepValid = (form: IForm) => {
  return Boolean(form.password.trim() && form.confirm_password.trim() && form.password === form.confirm_password);
};

export const createInitialRegisterForm = (): IForm => ({
  full_name: '',
  phone: '',
  avatar_url: '',
  role_name: 'staff',
  is_active: false,
  email: '',
  password: '',
  confirm_password: '',
  country: 'Egypt',
});

export const calculateRegisterCompletion = (form: IForm) => {
  const completedFields = requiredCompletionFields.filter((field) => Boolean(form[field]));

  return Math.round((completedFields.length / requiredCompletionFields.length) * 100);
};

export const getSelectedRole = (roleName: IForm['role_name']) => {
  return ROLE_OPTIONS.find((role) => role.value === roleName) ?? ROLE_OPTIONS[0];
};

export const canAdvanceRegisterStep = (step: RegisterStepId, form: IForm) => {
  if (step === 1) {
    return isProfileStepValid(form);
  }

  if (step === 2) {
    return isAccessStepValid(form);
  }

  return true;
};

export const validateRegisterSubmission = (form: IForm) => {
  if (!isProfileStepValid(form)) {
    return {
      valid: false,
      message: 'Please complete the profile details before creating the account.',
    };
  }

  if (!isAccessStepValid(form)) {
    return {
      valid: false,
      message: 'Passwords must be provided and match before creating the account.',
    };
  }

  return { valid: true };
};
