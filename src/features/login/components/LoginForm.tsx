import { SharedInput } from '@/components/shared/SharedInput';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/data/auth/login';
import type { ILoginForm } from '@/interfaces/IRegisterForm';
import { useAuthStore } from '@/stores/auth/authUi.store';

import { Loginschema } from '@/utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, LogInIcon } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

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

  const { mutateAsync, isPending, isSuccess } = useLogin();
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    mutateAsync(data);
    if (isSuccess) navigateTo('/dashboard');
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

        <Link className="underline text-sm text-blue-400 hover:text-blue-800" to={'/forget-password'}>
          Forget Password
        </Link>
        <button type="button" onClick={setShowPassword} className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors">
          {showPassword ? <EyeOff className="h-5 w-5 cursor-pointer" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {/* <div className="flex items-center gap-x-1">
        <Checkbox id="remember" className="cursor-pointer" />
        <label htmlFor="remember" className="text-slate-600 text-[14px] cursor-pointer">
          Remember me
        </label>
      </div> */}

      <Button
        disabled={!isValid || isPending}
        className={`px-8 h-12 self-end cursor-pointer  rounded-xl  bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 disabled:from-sky-500 disabled:to-cyan-500 disabled:text-white   disabled:shadow-sky-200 disabled:hover:shadow-sky-300  transition-all flex items-center justify-center gap-2  disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        <LogInIcon className="h-5 w-5" />
        {isPending ? 'Signing in...' : 'Submit'}
      </Button>
    </form>
  );
};

export default LoginForm;
