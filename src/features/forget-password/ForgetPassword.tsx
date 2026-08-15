import { Link } from 'react-router-dom';
import { SharedInput } from '@/components/shared/SharedInput';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuthSupabaseStore } from '@/stores/auth/authSupabase.stroe';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from './Header';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

interface IEmail {
  email: string;
}

const emailvalidation = yup.object({
  email: yup.string().trim().lowercase().email('Please enter a valid email').required('Email is required'),
});

export default function ForgetPassword() {
  const forgotPassword = useAuthSupabaseStore((state) => state.forgotPassword);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IEmail>({
    defaultValues: { email: '' },
    resolver: yupResolver(emailvalidation),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success('If an account exists for this email, you will receive a password reset link.');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to send password reset link.');
    },
  });
  const onSubmit: SubmitHandler<IEmail> = async ({ email }) => {
    await mutateAsync(email);
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
                <SharedInput
                  label="Email"
                  placeholder="type your email"
                  error={errors.email?.message}
                  labelClassName="text-slate-700"
                  className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
                  {...register('email')}
                />

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
