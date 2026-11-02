import { CalendarDays, Clock3, UserRound } from 'lucide-react';
import type { ISpaTherapists, TherapistDailySchedule } from '@/interfaces/ISpa';
import { timeNormalization } from '@/utils/dates';
import { SpaStatusPill } from '../SpaStatusPill';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TherapistActions from './TherapistActions';

const availabilityLabel = { on: 'On duty', off: 'Off duty', break: 'On break' } as const;
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

interface Props {
  therapist: ISpaTherapists;
  todaySchedule?: TherapistDailySchedule;
  deleteLocked: boolean;
  onView: () => void;
  onEdit: () => void;
  onSchedule: () => void;
  onDelete: () => void;
}
const SpaTherapist = ({ therapist, todaySchedule, deleteLocked, onView, onEdit, onSchedule, onDelete }: Props) => {
  const hours =
    todaySchedule?.status === 'working'
      ? todaySchedule.slots
          .filter((slot) => slot.slot_type === 'shift')
          .map((slot) => timeNormalization(slot.start_time) + ' - ' + timeNormalization(slot.end_time))
          .join(', ')
      : todaySchedule?.status === 'off'
        ? 'Day off'
        : 'Not configured';

  const status = therapist.availability ? availabilityLabel[therapist.availability] : 'Not set';
  return (
    <>
      <div className="hidden min-w-[1120px] grid-cols-[1.35fr_1fr_1fr_0.65fr_0.8fr_1.2fr_auto] items-center gap-4 px-5 py-4 xl:grid">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar>
            <AvatarImage src={therapist.avatar_url ?? undefined} alt={therapist.full_name} />
            <AvatarFallback>{initials(therapist.full_name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-semibold">{therapist.full_name}</p>
            <p className="truncate text-xs text-[var(--color-text-sub)]">{therapist.email || therapist.phone || 'Contact not provided'}</p>
          </div>
        </div>
        <span className="truncate text-sm" title={therapist.specialty ?? ''}>
          {therapist.specialty || 'No specialty'}
        </span>
        <a className="truncate text-sm hover:text-[var(--color-text-gold)]" href={therapist.phone ? 'tel:' + therapist.phone : undefined}>
          {therapist.phone || '—'}
        </a>
        <span className="text-sm capitalize">{therapist.gender || '—'}</span>
        <SpaStatusPill label={status} />
        <span className="flex min-w-0 items-center gap-1.5 text-sm text-[var(--color-text-sub)]">
          <Clock3 className="size-3.5 shrink-0" />
          <span className="truncate" title={hours}>
            {hours}
          </span>
        </span>
        <div className="justify-self-end">
          <TherapistActions onView={onView} onEdit={onEdit} onSchedule={onSchedule} onDelete={onDelete} deleteLocked={deleteLocked} />;
        </div>
      </div>
      <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 xl:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar>
              <AvatarImage src={therapist.avatar_url ?? undefined} alt={therapist.full_name} />
              <AvatarFallback>{initials(therapist.full_name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{therapist.full_name}</h3>
              <p className="truncate text-xs text-[var(--color-text-sub)]">{therapist.specialty || 'No specialty'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SpaStatusPill label={status} />
            <TherapistActions onView={onView} onEdit={onEdit} onSchedule={onSchedule} onDelete={onDelete} deleteLocked={deleteLocked} />
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-[var(--color-text-sub)]">Phone</dt>
            <dd className="mt-1 truncate">
              <a href={therapist.phone ? 'tel:' + therapist.phone : undefined}>{therapist.phone || '—'}</a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--color-text-sub)]">Email</dt>
            <dd className="mt-1 truncate">{therapist.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--color-text-sub)]">Gender</dt>
            <dd className="mt-1 flex items-center gap-1.5 capitalize">
              <UserRound className="size-3.5" />
              {therapist.gender || '—'}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--color-text-sub)]">Today</dt>
            <dd className="mt-1 flex items-center gap-1.5">
              <CalendarDays className="size-3.5 shrink-0" />
              <span className="truncate">{hours}</span>
            </dd>
          </div>
        </dl>
      </article>
    </>
  );
};
export default SpaTherapist;
