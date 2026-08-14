import { SharedInput } from '@/components/shared/SharedInput';
import { Button } from '@/components/ui/button';
import login from '@/data/auth/login';
import type { ILoginForm } from '@/interfaces/IRegisterForm';
import { useAuthStore } from '@/stores/auth/auth.store';

import { Loginschema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, LogInIcon } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialFormValues: ILoginForm = {
  email: '',
  password: '',
};
const LoginForm = () => {
  const navigateTo = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    defaultValues: initialFormValues,
    resolver: yupResolver(Loginschema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('donenefdsajfkdjsajfkdj');
      toast.success('Welcome Welcome Welcome');

      navigateTo('/dashboard');
    },
    onError: (error) => {
      toast.error(error.message || 'An error occurred during signing in.');
    },
  });
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    mutateAsync(data);
  };

  const showPassword = useAuthStore((state) => state.showPassword);
  const setShowPassword = useAuthStore((state) => state.setShowPassword);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
      <SharedInput
        label="Email"
        placeholder="type your email"
        error={errors.email?.message}
        labelClassName="text-slate-700"
        className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
        {...register('email')}
      />

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
        <button type="button" onClick={setShowPassword} className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors">
          {showPassword ? <EyeOff className="h-5 w-5 cursor-pointer" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <Button
        disabled={!isValid}
        className={`px-8 h-12 self-end cursor-pointer  rounded-xl  bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 disabled:from-sky-500 disabled:to-cyan-500 disabled:text-white   disabled:shadow-sky-200 disabled:hover:shadow-sky-300  transition-all flex items-center justify-center gap-2  disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <LogInIcon className="h-5 w-5" />
        {isPending ? 'Signing in...' : 'Submit'}
      </Button>
    </form>
  );
};

export default LoginForm;
