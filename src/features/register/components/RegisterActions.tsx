import type { IForm, RegisterStepId } from '@/interfaces/IRegisterForm';
import { useAuthStore } from '@/stores/auth/auth.store';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useFormContext, type FieldPath } from 'react-hook-form';

const stepFields: Record<RegisterStepId, FieldPath<IForm>[]> = {
  1: ['full_name', 'phone', 'email', 'country', 'avatar_url'],
  2: ['role', 'password', 'confirm_password'],
  3: [],
};
const RegisterActions = () => {
  const step = useAuthStore((state) => state.step);
  const totalSteps = useAuthStore((state) => state.totalSteps);
  const onPrev = useAuthStore((state) => state.prevStep);
  const onNext = useAuthStore((state) => state.nextStep);
  const resetSteps = useAuthStore((state) => state.resetSteps);
  // const canGoPrev = step > 1;
  const isLastStep = step === totalSteps;
  const {
    trigger,
    reset,
    formState: { isLoading: IsSubmitting, isValid },
  } = useFormContext();
  const handleNext = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fields = stepFields[step];

    const isValid = await trigger(fields);

    if (!isValid) {
      return;
    }
    onNext();
  };

  return (
    <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 1 || IsSubmitting}
        className="px-6 h-12 cursor-pointer rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-all hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
        Previous Step
      </button>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => {
            reset();
            resetSteps();
          }}
          disabled={IsSubmitting}
          className="px-6 h-12 cursor-pointer rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-all hover:bg-slate-50 flex items-center justify-center"
        >
          Cancel
        </button>
        {isLastStep ? (
          <button
            type="submit"
            disabled={IsSubmitting || !isValid}
            className="px-8 h-12 rounded-xl cursor-pointer bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Check className="h-5 w-5" />
            {IsSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            disabled={IsSubmitting}
            className="px-8 h-12 cursor-pointer rounded-xl bg-linear-to-r from-sky-500 to-cyan-500 text-white font-bold shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterActions;
