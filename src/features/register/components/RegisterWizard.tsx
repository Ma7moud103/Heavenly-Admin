import AccessStep from './AccessStep';
import ProfilePreview from './ProfilePreview';
import ProfileStep from './ProfileStep';
import RegisterActions from './RegisterActions';
import RegisterHeader from './RegisterHeader';
import RegisterProgress from './RegisterProgress';
import StepIndicator from './StepIndicator';
import ReviewStep from './ReviewStep';
import { type RegisterStepId } from '../../../utils/register/registerValidation';
import { FormProvider, useForm } from 'react-hook-form';
import type { IForm } from '@/interfaces/IRegisterForm';
import { useAuthStore } from '@/stores/auth/auth.store';
import useRegisterMutation from '@/hooks/register/useRegisterMutation';

const initialFormValues: IForm = {
  full_name: '',
  phone: '',
  avatar_url: '',
  role_name: 'staff',
  is_active: false,
  email: '',
  password: '',
  confirm_password: '',
  country: 'Egypt',
};
const RegisterWizard = () => {
  const methods = useForm<IForm>({
    defaultValues: initialFormValues,
    mode: 'onChange',
  });
  const { handleSubmit, getValues } = methods;
  const { mutate } = useRegisterMutation();

  const onsubmit = () => {
    console.log('Submitting form data:', getValues());
    mutate(getValues());
  };

  const step = useAuthStore((state) => state.step);

  const renderCurrentStep = (currentStep: RegisterStepId) => {
    if (currentStep === 1) {
      return <ProfileStep />;
    }

    if (currentStep === 2) {
      return <AccessStep />;
    }

    return <ReviewStep />;
  };

  return (
    <FormProvider {...methods}>
      <RegisterHeader />

      <RegisterProgress />
      <StepIndicator />

      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-sky-500 via-cyan-400 to-amber-400" />

          <div className="p-8 sm:p-10">
            <ProfilePreview />

            <form className="space-y-8" onSubmit={handleSubmit(onsubmit)}>
              {renderCurrentStep(step)}

              <RegisterActions />
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default RegisterWizard;
