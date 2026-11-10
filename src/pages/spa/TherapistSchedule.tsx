import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UseSpaTherapists from '@/hooks/spa/therapists/UseSpaTherapists';
import { useTherapistSchedules } from '@/hooks/spa/therapists/UseTherapistSchedules';
import { timeNormalization, getTodayInCairo } from '@/utils/dates';
import TherapistServiceBadges from '@/features/spa/components/therapists/TherapistServiceBadges';

const pad = (value: number) => String(value).padStart(2, '0');
const dateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const displayDate = (value: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(new Date(`${value}T12:00:00`));
const monthName = (date: Date) => new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(date);

export default function TherapistSchedulePage() {
  const { therapistId = '' } = useParams();
  const today = getTodayInCairo();
  const { data: therapistsData, isLoading: isloadingTherapists, isError: isTherapistsError } = UseSpaTherapists();

  const therapistQuery = therapistsData ?? [];
  const therapist = therapistQuery.find((item) => item.id === therapistId);

  const [month, setMonth] = useState(() => {
    return new Date(Number(today.slice(0, 4)), Number(today.slice(5, 7)) - 1, 1);
  });
  const from = dateKey(new Date(month.getFullYear(), month.getMonth(), 1));
  const to = dateKey(new Date(month.getFullYear(), month.getMonth() + 1, 0));
  const { data: schedulesData, isLoading: isLoadingSchedules } = useTherapistSchedules(therapistId, from, to);
  const { data: todaySchedulesData, isLoading: isLoadingTodaySchedule, isError: isTodayScheduleError } = useTherapistSchedules(therapistId, today, today);
  const todaySchedule = todaySchedulesData?.[0];
  const schedules = useMemo(
    () => [...(schedulesData ?? [])].sort((a, b) => a.schedule_date.localeCompare(b.schedule_date)),
    [schedulesData],
  );
  const otherSchedules = schedules.filter((schedule) => schedule.schedule_date !== today);

  if (isloadingTherapists) return <p className="p-6 text-sm text-muted-foreground">Loading therapist…</p>;
  if (isTherapistsError)
    return (
      <p role="alert" className="p-6 text-sm text-destructive">
        Could not load therapist details.
      </p>
    );
  if (!therapist) return <p className="p-6 text-sm text-muted-foreground">Therapist not found.</p>;

  console.log(false);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <Button asChild variant="ghost" className="-ml-3">
        <Link to="/spa/therapists">
          <ArrowLeft /> Back to therapists
        </Link>
      </Button>

      <section className="rounded-2xl border border-(--color-border) bg-(--color-bg-raised) p-5 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Therapist schedule</p>
            <h1 className="mt-1 text-2xl font-bold">{therapist.full_name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {therapist.email || therapist.phone || 'Contact not provided'}
            </p>
          </div>
          <div className="grid gap-3 rounded-xl bg-muted/60 p-4 text-sm sm:min-w-64">
            <p className="flex items-center gap-2">
              <UserRound className="size-4 text-muted-foreground" />
              Availability: {therapist.current_availability ?? 'Not set'}
            </p>
            <div>
              <p className="mb-2 text-muted-foreground">Services</p>
              <TherapistServiceBadges services={therapist.services} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="today-schedule-title" className="rounded-2xl border-2 border-amber-400 bg-amber-50/60 p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 id="today-schedule-title" className="text-lg font-semibold">Today's schedule</h2>
            <p className="text-sm text-muted-foreground">{displayDate(today)}</p>
          </div>
          <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">Today</span>
        </div>
        {isLoadingTodaySchedule ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading today's schedule...</p>
        ) : isTodayScheduleError ? (
          <p role="alert" className="mt-4 text-sm text-destructive">Could not load today's schedule.</p>
        ) : !todaySchedule ? (
          <p role="status" className="mt-4 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-900">No schedule is set for today.</p>
        ) : todaySchedule.status === 'off' ? (
          <p className="mt-4 rounded-lg bg-white px-3 py-2 text-sm font-medium">Day off</p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {todaySchedule.slots.map((slot) => (
              <span key={slot.id} className="rounded-lg bg-white px-3 py-2 text-sm font-medium capitalize">
                {slot.slot_type}: {timeNormalization(slot.start_time)} - {timeNormalization(slot.end_time)}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-(--color-border) bg-(--color-bg-raised) p-4 sm:p-6">
        <header className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Daily schedule</h2>
            <p className="text-sm text-muted-foreground">Working hours, breaks, and notes for each configured date.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous month"
              onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() - 1, 1))}
            >
              <ChevronLeft />
            </Button>
            <span className="min-w-32 text-center text-sm font-medium">{monthName(month)}</span>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next month"
              onClick={() => setMonth((value) => new Date(value.getFullYear(), value.getMonth() + 1, 1))}
            >
              <ChevronRight />
            </Button>
          </div>
        </header>

        {isLoadingSchedules ? (
          <p className="py-10 text-center text-sm text-muted-foreground">Loading schedules…</p>
        ) : isTherapistsError ? (
          <p role="alert" className="py-10 text-center text-sm text-destructive">
            Could not load schedules. Try again later.
          </p>
        ) : otherSchedules.length === 0 ? (
          <div className="rounded-xl border border-dashed border-(--color-border) px-4 py-12 text-center">
            <CalendarDays className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-3 font-medium">{schedules.length ? "Today is shown above" : "No configured dates this month"}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use Manage schedule on the therapist list to add shifts.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {otherSchedules.map((schedule) => (
              <article key={schedule.id} className="rounded-xl border border-(--color-border) p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold">{displayDate(schedule.schedule_date)}</p>
                    <span
                      className={
                        'mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ' +
                        (schedule.status === 'working'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700')
                      }
                    >
                      {schedule.status === 'working' ? 'Working' : 'Day off'}
                    </span>
                  </div>
                </div>
                {schedule.status === 'working' && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {schedule.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between gap-3 rounded-lg bg-muted/60 px-3 py-2.5 text-sm"
                      >
                        <span className="font-medium capitalize">{slot.slot_type}</span>
                        <span className="text-muted-foreground">
                          {timeNormalization(slot.start_time)} – {timeNormalization(slot.end_time)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {schedule.notes && (
                  <p className="mt-4 whitespace-pre-wrap border-t border-(--color-border) pt-3 text-sm text-muted-foreground">
                    {schedule.notes}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
