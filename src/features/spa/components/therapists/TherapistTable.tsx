import { useMemo } from 'react';
import { SpaPackagesSkeleton } from '@/features/spa/components/packages/SpaPackagesSkeleton';
import SpaTherapist from '@/features/spa/components/therapists/SpaTherapist';
import UseSpaTherapists from '@/hooks/spa/therapists/UseSpaTherapists';
import UseTherapistDaySchedules from '@/hooks/spa/therapists/UseTherapistDaySchedules';
import { getTodayInCairo } from '@/utils/dates';
import { useTherapistActionsContext, useTherapistFilterContext } from '@/stores/spa/SpaTherapistsContext';
import UseSpaTherapistBooking from '@/hooks/spa/therapists/UseSpaTherapistBooking';

export default function TherapistTable() {
  const { data: therapistData, isLoading, isError, error } = UseSpaTherapists();
  const therapists = therapistData ?? [];
  const { data: scheduleData, isError: isScheduleError } = UseTherapistDaySchedules(getTodayInCairo());

  const todayMap = useMemo(() => new Map((scheduleData ?? []).map((item) => [item.therapist_id, item])), [scheduleData]);

  const { data: bookings, isLoading: isLoadingBookings, isError: isBookingsError } = UseSpaTherapistBooking();

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
      <div className="overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-raised)">
        <div className="hidden min-w-280 grid-cols-[1.35fr_1fr_1fr_0.65fr_0.8fr_1.2fr_auto] gap-4 border-b border-(--color-border) bg-(--color-bg-subtle) px-5 py-3 text-xs font-semibold uppercase tracking-wider text-(--color-text-sub) xl:grid">
          <span>Therapist</span>
          <span>Specialty</span>
          <span>Phone</span>
          <span>Gender</span>
          <span>Status</span>
          <span>Current Shift</span>
          <span>Actions</span>
        </div>
        {isLoading ? (
          <SpaPackagesSkeleton />
        ) : isError ? (
          <div role="alert" className="p-8 text-center text-sm text-destructive">
            Could not load therapists{error instanceof Error ? ': ' + error.message : '.'}
          </div>
        ) : filtered.length ? (
          <div className="divide-y divide-(--color-border)">
            {filtered.map((therapist) => (
              <SpaTherapist
                key={therapist.id}
                therapist={therapist}
                todaySchedule={todayMap.get(therapist.id)}
                deleteLocked={isLoadingBookings || isBookingsError || Boolean(bookings?.has(therapist.id))}
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
      {isScheduleError && (
        <p className="mt-3 text-xs text-muted-foreground">Todays schedule data could not be loaded. Check manager access to daily schedules.</p>
      )}
    </>
  );
}
