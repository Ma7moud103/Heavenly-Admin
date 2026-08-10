import type { IForm } from '@/interfaces/IRegisterForm';
import { calculateRegisterCompletion, createInitialRegisterForm, getSelectedRole } from '@/utils/register/registerValidation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useRegisterForm() {
  const methods = useForm<IForm>({
    defaultValues: createInitialRegisterForm(),
    mode: 'onChange',
  });

  const form = methods.watch();
  const selectedRole = useMemo(() => getSelectedRole(form.role_name), [form.role_name]);
  const completion = useMemo(() => calculateRegisterCompletion(form), [form]);

  return {
    errors: methods.formState.errors,
    form,
    handleSubmit: methods.handleSubmit,
    register: methods.register,
    selectedRole,
    completion,
  };
}
