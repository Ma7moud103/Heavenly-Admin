import { Activity, Gem } from 'lucide-react';
import { SpaSectionCard } from '../components/shared/SpaSectionCard';
import { SpaStatusPill } from '../components/shared/SpaStatusPill';
import TherapistServiceBadges from '../components/therapists/TherapistServiceBadges';
import UseSpaTherapists from '@/hooks/spa/therapists/UseSpaTherapists';

const SpaTherapistsOverview = () => {
  const { data: spaTherapistsData } = UseSpaTherapists();

  return (
    <SpaSectionCard
      title="Therapist availability"
      description="Therapists are independent resources that can be assigned per booking based on service type and slot availability."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {spaTherapistsData?.map((therapist) => (
          <div key={therapist.id} className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_rgba(212,175,55,0.18),_rgba(255,255,255,0.9))]">
                <Gem className="size-5 text-[var(--color-text-gold)]" />
              </div>
              <SpaStatusPill label={therapist.current_availability ?? 'Not set'} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[var(--color-text)]">{therapist.full_name}</h3>
            <TherapistServiceBadges services={therapist.services} className="mt-2" />
            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-sub)]">
              <Activity className="size-4 text-[var(--color-text-gold)]" />
              Managed by daily schedules
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(51,65,85,0.92))] p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">UI-only MVP note</p>
        <p className="mt-2 text-lg font-semibold">This screen is intentionally static.</p>
        <p className="mt-2 text-sm leading-6 text-white/75">
          It is ready for later wiring to spa_categories, spa_services, spa_packages, spa_customers, spa_therapists, and spa_bookings.
        </p>
      </div>
    </SpaSectionCard>
  );
};

export default SpaTherapistsOverview;
