import { Camera, Sparkles } from 'lucide-react';
import ReviewItem from './ReviewItem';
import { useFormContext } from 'react-hook-form';

const ReviewStep = () => {
  const { getValues } = useFormContext();
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {getValues('avatar_url') ? (
              <img src={getValues('avatar_url')} alt={getValues('full_name') || 'Avatar preview'} className="h-full w-full object-cover" />
            ) : (
              <Camera className="h-10 w-10 text-slate-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-2xl font-bold text-slate-900">{getValues('full_name') || 'Unnamed profile'}</p>
            <p className="text-slate-600">{getValues('email') || 'No email provided'}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex rounded-full bg-sky-100 border border-sky-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
                {getValues('role') === 'user' ? 'User' : getValues('role') === 'admin' ? 'Admin' : 'Super Admin'}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${getValues('is_active') ? 'bg-emerald-100 border border-emerald-200 text-emerald-600' : 'bg-slate-100 border border-slate-200 text-slate-600'}`}
              >
                {getValues('is_active') ? 'Active' : 'Draft'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ReviewItem label="Full Name" value={getValues('full_name')} />
        <ReviewItem label="Phone Number" value={getValues('phone')} />
        <ReviewItem label="Email Address" value={getValues('email')} />
        <ReviewItem label="Country" value={getValues('country')} />
        <ReviewItem label="Account Role" value={getValues('role') === 'user' ? 'User' : getValues('role') === 'admin' ? 'Admin' : 'Super Admin'} />
        <ReviewItem label="Account Status" value={getValues('is_active') ? 'Active' : 'Draft'} />
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-emerald-600" />
          <div>
            <p className="font-bold text-slate-900">Ready to create account</p>
            <p className="text-sm text-slate-600">All required fields have been completed. Click Create Account to finalize registration.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
