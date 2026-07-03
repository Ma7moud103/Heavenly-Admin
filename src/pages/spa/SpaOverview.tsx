import { memo } from 'react';
import { Activity, CalendarDays, CircleDollarSign, Clock3, Gem, Leaf, Users2, WandSparkles } from 'lucide-react';
import { SpaPageShell } from '@/features/spa/components/SpaPageShell';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatCard } from '@/features/spa/components/SpaStatCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaCategories, spaPackages, spaServices, spaTherapists, bookingSteps, timeSlots } from '@/features/spa/data';

const SpaOverview = () => {
  return (
    <SpaPageShell
      eyebrow="Spa Overview"
      title="Manage spa operations from one central workspace."
      description="The spa is organized around categories, services, packages, therapists, customers, and bookings with dynamic time-slot planning."
      actions={
        <>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[--color-text-gold] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5"
          >
            <CalendarDays className="size-4" />
            New Booking
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-[--color-border] bg-white/70 px-5 py-3 text-sm font-semibold text-[--color-text] backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            <WandSparkles className="size-4 text-[--color-text-gold]" />
            Build Package
          </button>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SpaStatCard icon={Leaf} title="Categories" value="4" note="Massage, facial, sauna, wellness" />
        <SpaStatCard icon={Users2} title="Therapists" value="4" note="Shifts and availability by day" />
        <SpaStatCard icon={CircleDollarSign} title="Average ticket" value="1,480" note="Single services and packages" />
        <SpaStatCard icon={Clock3} title="Time-slot model" value="Dynamic" note="Generated from opening hours" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SpaSectionCard
          title="Spa services by category"
          description="Services are organized by category and remain independent from therapists. The therapist is chosen later during booking."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {spaCategories.map((category) => (
              <div key={category.name} className={`rounded-3xl border border-[--color-border] bg-gradient-to-br ${category.accent} p-5`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[--color-text]">{category.name}</h3>
                  <SpaStatusPill label={`${category.count} services`} />
                </div>
                <p className="mt-3 text-sm leading-6 text-[--color-text-sub]">
                  Curated treatments focused on guest comfort, recovery, and premium resort relaxation.
                </p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[--color-border] bg-[--color-bg-subtle]">
            <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr] gap-4 border-b border-[--color-border] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[--color-text-sub]">
              <span>Service</span>
              <span>Duration</span>
              <span>Price</span>
            </div>
            <div className="divide-y divide-[--color-border]">
              {spaServices.map((service) => (
                <div key={service.name} className="grid grid-cols-[1.5fr_0.7fr_0.7fr] gap-4 px-5 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[--color-text]">{service.name}</p>
                      <SpaStatusPill label={service.category} />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[--color-text-sub]">{service.description}</p>
                  </div>
                  <div className="text-sm font-medium text-[--color-text]">{service.duration}</div>
                  <div className="text-sm font-semibold text-[--color-text-gold]">{service.price}</div>
                </div>
              ))}
            </div>
          </div>
        </SpaSectionCard>

        <SpaSectionCard
          title="Booking rules and flow"
          description="The booking can target either a single service or a package, never both and never neither."
        >
          <div className="space-y-3">
            {bookingSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] px-4 py-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-[--color-text-gold] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-[--color-text]">{step}</p>
                  <p className="text-sm text-[--color-text-sub]">A step in the spa booking lifecycle.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-[--color-border] bg-[linear-gradient(135deg,_rgba(255,255,255,0.92),_rgba(253,240,215,0.5))] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[--color-text-sub]">Time slots</p>
                <p className="mt-1 text-lg font-semibold text-[--color-text]">Generated dynamically</p>
              </div>
              <Clock3 className="size-5 text-[--color-text-gold]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[--color-text-sub]">
              Slots are derived from opening hours, closing hours, service duration, and existing bookings.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <SpaStatusPill key={slot} label={slot} />
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[--color-border] bg-[--color-bg-subtle] p-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[--color-text-sub]">Customer types</p>
              <div className="mt-3 space-y-2">
                <div className="rounded-2xl border border-[--color-border] bg-white px-4 py-3">
                  <p className="font-semibold text-[--color-text]">Hotel Guest</p>
                  <p className="text-sm text-[--color-text-sub]">Linked to guest record when available.</p>
                </div>
                <div className="rounded-2xl border border-[--color-border] bg-white px-4 py-3">
                  <p className="font-semibold text-[--color-text]">External Customer</p>
                  <p className="text-sm text-[--color-text-sub]">Stored directly in the spa customer table.</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[--color-text-sub]">Booking constraints</p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[--color-text-sub]">
                <p className="rounded-2xl border border-[--color-border] bg-white px-4 py-3">Service or package must be selected, never both.</p>
                <p className="rounded-2xl border border-[--color-border] bg-white px-4 py-3">
                  Therapist is chosen during booking, not on the service itself.
                </p>
                <p className="rounded-2xl border border-[--color-border] bg-white px-4 py-3">
                  Package keeps its own final price for predictable checkout.
                </p>
              </div>
            </div>
          </div>
        </SpaSectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SpaSectionCard
          title="Collection-based package cards"
          description="Each package is a bundle of services with its own final price and a clear premium presentation."
        >
          <div className="space-y-4">
            {spaPackages.map((pack) => (
              <div
                key={pack.name}
                className="rounded-3xl border border-[--color-border] bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[--color-text]">{pack.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[--color-text-sub]">{pack.description}</p>
                  </div>
                  <div className="rounded-2xl bg-[--color-text-gold] px-4 py-2 text-right text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-90">Fixed price</p>
                    <p className="text-xl font-semibold">{pack.price}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pack.services.map((service) => (
                    <SpaStatusPill key={service} label={service} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SpaSectionCard>

        <SpaSectionCard
          title="Therapist availability"
          description="Therapists are independent resources that can be assigned per booking based on service type and slot availability."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {spaTherapists.map((therapist) => (
              <div key={therapist.name} className="rounded-3xl border border-[--color-border] bg-[--color-bg-subtle] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_rgba(212,175,55,0.18),_rgba(255,255,255,0.9))]">
                    <Gem className="size-5 text-[--color-text-gold]" />
                  </div>
                  <SpaStatusPill label={therapist.status} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[--color-text]">{therapist.name}</h3>
                <p className="mt-1 text-sm text-[--color-text-sub]">{therapist.specialty}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-[--color-text-sub]">
                  <Activity className="size-4 text-[--color-text-gold]" />
                  {therapist.shift}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-[--color-border] bg-[linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(51,65,85,0.92))] p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">UI-only MVP note</p>
            <p className="mt-2 text-lg font-semibold">This screen is intentionally static.</p>
            <p className="mt-2 text-sm leading-6 text-white/75">
              It is ready for later wiring to spa_categories, spa_services, spa_packages, spa_customers, spa_therapists, and spa_bookings.
            </p>
          </div>
        </SpaSectionCard>
      </section>
    </SpaPageShell>
  );
};

export default memo(SpaOverview);
