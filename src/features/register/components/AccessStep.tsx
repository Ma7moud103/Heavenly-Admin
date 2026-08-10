import { SharedInput } from '@/components/shared/SharedInput';
import { Eye, EyeOff } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const AccessStep = () => {
  const {
    formState: { errors },
    register,
    getValues,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword((currentValue) => !currentValue);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((currentValue) => !currentValue);
  }, []);
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2 mt-8">
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
          <button type="button" onClick={togglePassword} className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors">
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
            onClick={toggleConfirmPassword}
            className="absolute right-4 top-9 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessStep;
