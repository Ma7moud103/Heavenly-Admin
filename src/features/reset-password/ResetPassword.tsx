import { Link, useNavigate } from 'react-router-dom';
import { SharedInput } from '@/components/shared/SharedInput';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuthSupabaseStore } from '@/stores/auth/authSupabase.stroe';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail } from 'lucide-react';
import Header from './Header';
import { useAuthStore } from '@/stores/auth/auth.store';

interface IPassword {
  password: string;
  confirm_password: string;
}

const passwordvalidation = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),

  confirm_password: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default function ResetPassword() {
  const showPassword = useAuthStore((state) => state.showPassword);
  const setShowPassword = useAuthStore((state) => state.setShowPassword);
  const showConfirmPassword = useAuthStore((state) => state.showConfirmPassword);
  const setShowConfirmPassword = useAuthStore((state) => state.setShowConfirmPassword);
  const { isPasswordRecovery, resetPassword } = useAuthSupabaseStore((state) => ({
    session: state.session,
    isPasswordRecovery: state.isPasswordRecovery,
    resetPassword: state.resetPassword,
  }));
  if (isPasswordRecovery) {
    return;
  }
  const navigateTo = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm<IPassword>({
    defaultValues: { password: '', confirm_password: '' },
    resolver: yupResolver(passwordvalidation),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('you changed your password successfully!');
      navigateTo('/login');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to change password.');
    },
  });
  const onSubmit: SubmitHandler<IPassword> = async (data) => {
    await mutateAsync(data);
  };
  return (
    <main className="min-h-screen relative overflow-hidden bg-linear-to-r from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-sky-400/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-sky-400/5 via-transparent to-amber-400/5" />
      </div>

      <section className="mx-auto max-w-7xl relative z-10">
        <Header />

        <div className="max-w-4xl mx-auto">
          <div className=" overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
            <div className="p-8 sm:p-10 space-y-8">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                <div className="relative">
                  <SharedInput
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    error={errors.password?.message}
                    labelClassName="text-slate-700"
                    className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl pr-12"
                    {...register('password', { required: 'Password is required' })}
                  />
                  <button
                    type="button"
                    onClick={setShowPassword}
                    className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="relative">
                  <SharedInput
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    error={errors.confirm_password?.message}
                    labelClassName="text-slate-700"
                    className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl pr-12"
                    {...register('confirm_password', {
                      required: 'Please confirm the password',
                      validate: (value) => value === getValues('password') || 'Passwords must match',
                    })}
                  />
                  <button
                    type="button"
                    onClick={setShowConfirmPassword}
                    className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || isPending}
                  className={`px-8 h-12 self-end cursor-pointer  rounded-xl  bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 disabled:from-sky-500 disabled:to-cyan-500 disabled:text-white   disabled:shadow-sky-200 disabled:hover:shadow-sky-300  transition-all flex items-center justify-center gap-2  disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  <Mail className="h-5 w-5" />
                  {isPending ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">
            Do you have an account?{' '}
            <Link to="/register" className="font-medium text-sky-600 transition-colors hover:text-sky-700">
              Sign up instead
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
