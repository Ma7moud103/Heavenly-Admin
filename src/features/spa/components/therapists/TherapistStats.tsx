import { memo, useMemo } from 'react';
import { Activity, Clock3, UserRoundCheck, Users } from 'lucide-react';
import UseSpaTherapists from '@/hooks/spa/therapists/UseSpaTherapists';

const cards = [
  { key: 'total', label: 'Total therapists', icon: Users, color: 'blue', description: 'In your spa roster' },
  { key: 'on', label: 'On duty', icon: UserRoundCheck, color: 'emerald', description: 'Currently available' },
  { key: 'break', label: 'On break', icon: Clock3, color: 'amber', description: 'Taking a short break' },
  { key: 'off', label: 'Off duty', icon: Activity, color: 'violet', description: 'Not currently working' },
] as const;
const colors = {
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
  emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-200 bg-amber-50 text-amber-700',
  violet: 'border-violet-200 bg-violet-50 text-violet-700',
} as const;

function TherapistStats() {
  const { data: therapistData, isLoading, isError } = UseSpaTherapists();
  const therapists = therapistData ?? [];
  const stats = useMemo(
    () => ({
      total: therapists.length,
      on: therapists.filter((item) => item.current_availability === 'on').length,
      break: therapists.filter((item) => item.current_availability === 'break').length,
      off: therapists.filter((item) => item.current_availability === 'off').length,
    }),
    [therapists],
  );
  return (
    <section aria-label="Therapist statistics" className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, color, description }) => (
        <article key={key} className={'flex min-w-0 items-center gap-4 rounded-2xl border p-4 shadow-sm sm:p-5 ' + colors[color]}>
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/80">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium opacity-80">{label}</p>
            <p className="mt-1 text-2xl font-bold leading-none">{isLoading ? '...' : isError ? 'N/A' : stats[key]}</p>
            <p className="mt-1 truncate text-xs opacity-75">{description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
export default memo(TherapistStats);
