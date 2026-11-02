import { useMemo } from 'react';
import { SpaPackagesSkeleton } from '@/features/spa/components/packages/SpaPackagesSkeleton';
import SpaTherapist from '@/features/spa/components/therapists/SpaTherapist';
import {
  useTherapistActionsContext,
  useTherapistBookingContext,
  useTherapistFilterContext,
  useTherapistRosterContext,
  useTherapistScheduleContext,
} from '@/stores/spa/SpaTherapistsContext';

export default function TherapistTable() {
  const { therapists, isLoading, isError, error } = useTherapistRosterContext();
  const { todayMap, todayScheduleError } = useTherapistScheduleContext();
  const { bookedIds, bookingsLoading, bookingsError } = useTherapistBookingContext();
  const { search, specialty, availability } = useTherapistFilterContext();
  const { openView, openEdit, openSchedule, openDelete } = useTherapistActionsContext();
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return therapists.filter(
      (item) =>
        (!term ||
          item.full_name.toLowerCase().includes(term) ||
          (item.phone ?? '').includes(search.trim()) ||
          (item.email ?? '').toLowerCase().includes(term)) &&
        (specialty === 'all' || item.specialty === specialty) &&
        (availability === 'all' || item.availability === availability),
    );
  }, [therapists, search, specialty, availability]);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <div className="hidden min-w-[1120px] grid-cols-[1.35fr_1fr_1fr_0.65fr_0.8fr_1.2fr_auto] gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-sub)] xl:grid">
          <span>Therapist</span>
          <span>Specialty</span>
          <span>Phone</span>
          <span>Gender</span>
          <span>Status</span>
          <span>Today’s hours</span>
          <span>Actions</span>
        </div>
        {isLoading ? (
          <SpaPackagesSkeleton />
        ) : isError ? (
          <div role="alert" className="p-8 text-center text-sm text-destructive">
            Could not load therapists{error instanceof Error ? ': ' + error.message : '.'}
          </div>
        ) : filtered.length ? (
          <div className="divide-y divide-[var(--color-border)]">
            {filtered.map((therapist) => (
              <SpaTherapist
                key={therapist.id}
                therapist={therapist}
                todaySchedule={todayMap.get(therapist.id)}
                deleteLocked={bookingsLoading || bookingsError || Boolean(bookedIds?.has(therapist.id))}
                onView={() => openView(therapist)}
                onEdit={() => openEdit(therapist)}
                onSchedule={() => openSchedule(therapist)}
                onDelete={() => openDelete(therapist)}
              />
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <p className="font-semibold">{therapists.length ? 'No matching therapists' : 'No therapists yet'}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {therapists.length ? 'Try changing your search or filters.' : 'Add a therapist to start managing the roster.'}
            </p>
          </div>
        )}
      </div>
      {todayScheduleError && (
        <p className="mt-3 text-xs text-muted-foreground">Today’s schedule data could not be loaded. Check manager access to daily schedules.</p>
      )}
    </>
  );
}
