import type { IForm } from '@/interfaces/IRegisterForm';
import { useAuthStore } from '@/stores/auth/auth.store';
import { UserRound } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

const stepHeaders: Record<number, { title: string; description: string }> = {
  1: {
    title: 'Profile Information',
    description: 'Enter the basic profile details for the new team member.',
  },
  2: {
    title: 'Access & Security',
    description: 'Configure account permissions, role, and security settings.',
  },
  3: {
    title: 'Review & Confirm',
    description: 'Verify all information before creating the account.',
  },
};

const ProfilePreview = () => {
  const step = useAuthStore((state) => state.step);
  const totalSteps = useAuthStore((state) => state.totalSteps);
  const currentCopy = stepHeaders[step] ?? stepHeaders[1];

  const { getValues } = useFormContext<IForm>();

  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-1">
            Step {step} of {totalSteps}
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{currentCopy.title}</h2>
          <p className="text-slate-600 max-w-xl">{currentCopy.description}</p>
        </div>

        <div className="hidden lg:flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xl">
            {getValues('avatar_url') ? (
              <img src={getValues('avatar_url')} alt={getValues('full_name') || 'Avatar preview'} className="h-full w-full object-cover" />
            ) : (
              <UserRound className="h-10 w-10 text-slate-400" />
            )}
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-900">{getValues('full_name') || 'Profile Preview'}</p>
          <p className="text-xs text-slate-500">{getValues('role') || 'Role'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
