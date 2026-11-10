import { CalendarDays, Clock3, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ISpaTherapists, TherapistDailySchedule } from '@/interfaces/ISpa';
import { timeNormalization } from '@/utils/dates';
import { SpaStatusPill } from '../shared/SpaStatusPill';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TherapistActions from './TherapistActions';
import TherapistServiceBadges from './TherapistServiceBadges';

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

  const status = therapist.current_availability ? availabilityLabel[therapist.current_availability] : 'Not set';
  return (
    <>
      <div className="hidden min-w-280 grid-cols-[1.35fr_1fr_1fr_0.65fr_0.8fr_1.2fr_auto] items-center gap-4 px-5 py-4 xl:grid">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar>
            <AvatarImage src={therapist.avatar_url ?? undefined} alt={therapist.full_name} />
            <AvatarFallback>{initials(therapist.full_name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <button type="button" onClick={onView} className="truncate text-left font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{therapist.full_name}</button>
            <p className="truncate text-xs text-(--color-text-sub)">{therapist.email || therapist.phone || 'Contact not provided'}</p>
          </div>
        </div>
<TherapistServiceBadges services={therapist.services} limit={2} />
        <a className="truncate text-sm hover:text-(--color-text-gold)" href={therapist.phone ? 'tel:' + therapist.phone : undefined}>
          {therapist.phone || 'not provided'}
        </a>
        <span className="text-sm capitalize">{therapist.gender || 'not provided'}</span>
        <SpaStatusPill label={status} />
        <span className="flex min-w-0 items-center gap-1.5 text-sm text-(--color-text-sub)">
          <Clock3 className="size-3.5 shrink-0" />
          <Link to={"/spa/therapists/" + therapist.id + "/schedule"} className="truncate underline-offset-2 hover:underline" title="View full schedule">
            {hours}
          </Link>
        </span>
        <div className="justify-self-end">
          <TherapistActions onView={onView} onEdit={onEdit} onSchedule={onSchedule} onDelete={onDelete} deleteLocked={deleteLocked} scheduleHref={"/spa/therapists/" + therapist.id + "/schedule"} />
        </div>
      </div>
      <article className="rounded-2xl border border-(--color-border) bg-(--color-bg-raised) p-4 xl:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar>
              <AvatarImage src={therapist.avatar_url ?? undefined} alt={therapist.full_name} />
              <AvatarFallback>{initials(therapist.full_name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <button type="button" onClick={onView} className="truncate text-left font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{therapist.full_name}</button>
              <TherapistServiceBadges services={therapist.services} limit={2} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SpaStatusPill label={status} />
            <TherapistActions onView={onView} onEdit={onEdit} onSchedule={onSchedule} onDelete={onDelete} deleteLocked={deleteLocked} scheduleHref={"/spa/therapists/" + therapist.id + "/schedule"} />
          </div>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-(--color-text-sub)">Phone</dt>
            <dd className="mt-1 truncate">
              <a href={therapist.phone ? 'tel:' + therapist.phone : undefined}>{therapist.phone || 'not provided'}</a>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-(--color-text-sub)">Email</dt>
            <dd className="mt-1 truncate">{therapist.email || 'not provided'}</dd>
          </div>
          <div>
            <dt className="text-xs text-(--color-text-sub)">Gender</dt>
            <dd className="mt-1 flex items-center gap-1.5 capitalize">
              <UserRound className="size-3.5" />
              {therapist.gender || 'not provided'}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-(--color-text-sub)">Current shift</dt>
            <dd className="mt-1 flex items-center gap-1.5">
              <CalendarDays className="size-3.5 shrink-0" />
              <Link to={"/spa/therapists/" + therapist.id + "/schedule"} className="truncate underline-offset-2 hover:underline">{hours}</Link>
            </dd>
          </div>
        </dl>
      </article>
    </>
  );
};
export default SpaTherapist;
