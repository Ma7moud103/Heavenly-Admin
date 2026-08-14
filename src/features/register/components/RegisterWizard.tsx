import AccessStep from './AccessStep';
import ProfilePreview from './ProfilePreview';
import ProfileStep from './ProfileStep';
import RegisterActions from './RegisterActions';

import ReviewStep from './ReviewStep';
import { FormProvider, useForm } from 'react-hook-form';
import type { IForm } from '@/interfaces/IRegisterForm';
import { useAuthStore } from '@/stores/auth/auth.store';
import { yupResolver } from '@hookform/resolvers/yup';

import useRegisterMutation from '@/hooks/useRegisterMutation';
import { Registerschema } from '@/utils/schemas';
import { useNavigate } from 'react-router-dom';

const initialFormValues: IForm = {
  full_name: '',
  phone: '',
  avatar_url: '',
  role: 'user',
  is_active: false,
  email: '',
  password: '',
  confirm_password: '',
  country: 'Egypt',
};
const RegisterWizard = () => {
  const navigate = useNavigate();
  const methods = useForm<IForm>({
    defaultValues: initialFormValues,
    resolver: yupResolver(Registerschema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { handleSubmit } = methods;
  const { mutate, isSuccess } = useRegisterMutation();

  const onSubmit = (data: IForm) => {
    mutate(data);
    if (isSuccess) {
      navigate('/login');
    }
  };

  const step = useAuthStore((state) => state.step);

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-cyan-400 to-amber-400" />

          <div className="p-8 sm:p-10">
            <ProfilePreview />

            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && <ProfileStep />}
              {step === 2 && <AccessStep />}
              {step === 3 && <ReviewStep />}

              <RegisterActions />
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default RegisterWizard;
