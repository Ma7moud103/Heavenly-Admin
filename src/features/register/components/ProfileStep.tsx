import { SharedInput } from '@/components/shared/SharedInput';
import { COUNTRY_OPTIONS } from '@/utils/register/constants.constants';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const ProfileStep = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <SharedInput
          label="Full Name"
          placeholder="John Doe"
          error={errors.full_name?.message}
          labelClassName="text-slate-700"
          className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
          {...register('full_name', { required: 'Full name is required' })}
        />
        <SharedInput
          label="Phone Number"
          type="tel"
          placeholder="+20 100 000 0000"
          error={errors.phone?.message}
          labelClassName="text-slate-700"
          className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
          {...register('phone', { required: 'Phone number is required' })}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SharedInput
          label="Email Address"
          type="email"
          placeholder="name@heavenlyhotel.com"
          error={errors.email?.message}
          labelClassName="text-slate-700"
          className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
          {...register('email', { required: 'Email address is required' })}
        />
        <SharedInput
          label="Country"
          placeholder="Select country"
          list="register-country-options"
          error={errors.country?.message}
          labelClassName="text-slate-700"
          className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
          {...register('country', { required: 'Country is required' })}
        />
        <datalist id="register-country-options">
          {COUNTRY_OPTIONS.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      <SharedInput
        label="Avatar URL (Optional)"
        type="url"
        placeholder="https://cdn.example.com/avatar.jpg"
        error={errors.avatar_url?.message}
        labelClassName="text-slate-700"
        className="border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 h-12 rounded-xl"
        hint="Provide a direct image URL for the profile picture."
        hintClassName="text-slate-500"
        {...register('avatar_url')}
      />

      <div className="grid gap-4 sm:grid-cols-3 mt-8">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-sky-200 transition-colors">
          <div className="h-10 w-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
            <Mail className="h-5 w-5 text-sky-600" />
          </div>
          <p className="text-sm font-semibold text-slate-900 mb-1">Email Identity</p>
          <p className="text-xs text-slate-600">Primary contact for system notifications and account recovery.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-amber-200 transition-colors">
          <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
            <Phone className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-sm font-semibold text-slate-900 mb-1">Direct Contact</p>
          <p className="text-xs text-slate-600">For internal communication and emergency staff coordination.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-200 transition-colors">
          <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
            <MapPin className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-sm font-semibold text-slate-900 mb-1">Location Data</p>
          <p className="text-xs text-slate-600">Timezone and regional settings for the user interface.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
