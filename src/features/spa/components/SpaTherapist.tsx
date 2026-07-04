import { Sparkles } from 'lucide-react';
import type { ISpaTherapists } from '@/interfaces/ISpa';
import { timeNormalization } from '@/utils/dates';

const statusColors = {
  on: 'text-[var(--color-success)]',
  off: 'text-[var(--color-error)]',
  break: 'text-[var(--color-text-muted)]',
} as const;

const SpaTherapist = ({ therapist }: { therapist: ISpaTherapists }) => {
  const statusColor = statusColors[therapist.availability];

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_rgba(212,175,55,0.18),_rgba(255,255,255,0.9))]">
          <Sparkles className="size-5 text-[var(--color-text-gold)]" />
        </div>
        <p className={`rounded-full bg-white px-3 py-1 text-center text-xs font-bold uppercase tracking-[0.14em] ${statusColor}`}>
          {therapist.availability}
        </p>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-[var(--color-text)]">{therapist.full_name}</h3>
      <p className="mt-1 text-sm text-[var(--color-text-sub)]">{therapist.specialty}</p>
      <p className="mt-4 break-words text-sm text-[var(--color-text-sub)]">
        {timeNormalization(therapist.shift_from)} - {timeNormalization(therapist.shift_to)}
      </p>
    </div>
  );
};

export default SpaTherapist;
