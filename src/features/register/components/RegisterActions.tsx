import { useAuthStore } from '@/stores/auth/auth.store';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router-dom';

const RegisterActions = () => {
  const step = useAuthStore((state) => state.step);
  const totalSteps = useAuthStore((state) => state.totalSteps);
  const onPrev = useAuthStore((state) => state.prevStep);
  const onNext = useAuthStore((state) => state.nextStep);
  const canGoNext = useAuthStore((state) => state.canGoNext);
  const {
    formState: { isLoading: IsSubmitting },
  } = useFormContext();
  return (
    <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 1}
        className="px-6 h-12 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-all hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <ArrowLeft className="h-5 w-5" />
        Previous Step
      </button>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="px-6 h-12 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold transition-all hover:bg-slate-50 flex items-center justify-center"
        >
          Cancel
        </Link>
        {step < totalSteps ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext || IsSubmitting}
            className="px-8 h-12 rounded-xl bg-linear-to-r from-sky-500 to-cyan-500 text-white font-bold shadow-lg shadow-sky-200 hover:shadow-sky-300 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={IsSubmitting}
            className="px-8 h-12 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Check className="h-5 w-5" />
            {IsSubmitting ? 'Creating...' : 'Create Account'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterActions;
