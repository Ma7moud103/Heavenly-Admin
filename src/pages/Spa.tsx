import { memo, useMemo } from 'react';
import { Activity, CalendarDays, CircleDollarSign, Clock3, Gem, Leaf, Users2, WandSparkles } from 'lucide-react';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { bookingSteps, timeSlots } from '@/features/spa/data';
import UseSpaTherapists from '@/hooks/spa/UseSpaTherapists';
import UseSpaCategories from '@/hooks/spa/UseSpaCategories';
import { UseSpaPackages, UseSpaPackagesWithoutServices } from '@/hooks/spa/UseSpaPackages';
import UseSpaServices from '@/hooks/spa/UseSpaServices';
import { timeNormalization } from '@/utils/dates';
import BookingWindow from '@/features/spa/modals/BookingWindow';
import SpaStatCard from '@/features/spa/components/SpaStatCard';

const Spa = () => {
  const { data: spaTherapistsData, isLoading: isLoadingTherapists } = UseSpaTherapists();
  const { data: spaCategoriesData, isLoading: isLoadingCategories } = UseSpaCategories();
  const { data: spaPackagesWithServices } = UseSpaPackages();
  const { data: spaPackagesData } = UseSpaPackagesWithoutServices();
  const { data: spaServicesData } = UseSpaServices();

  const categoriesWithCounts = useMemo(() => {
    if (!spaCategoriesData) return [];

    return spaCategoriesData.map((category) => ({
      ...category,
      servicesCount: spaServicesData?.filter((service) => service.category_id?.id === category.id).length ?? 0,
      packagesCount: spaPackagesData?.filter((pkg) => pkg.category_id?.id === category.id).length ?? 0,
    }));
  }, [spaCategoriesData, spaServicesData, spaPackagesData]);

  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(135deg,_var(--color-bg-raised),_var(--color-bg-subtle))]">
        <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-sub)]">Spa Overview</p>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-5xl">
              Manage spa operations from one central workspace.
            </h1>
            <p className="max-w-3xl text-base leading-7 text-[var(--color-text-sub)]">
              The spa is organized around categories, services, packages, therapists, customers, and bookings with dynamic time-slot planning.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <BookingWindow>
              <button
                type="button"
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-text-gold)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
              >
                <CalendarDays className="size-4" />
                New Booking
              </button>
            </BookingWindow>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--color-text)] backdrop-blur transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <WandSparkles className="size-4 text-[var(--color-text-gold)]" />
              Build Package
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SpaStatCard
          icon={Leaf}
          title="Categories"
          isLoading={isLoadingCategories}
          value={spaCategoriesData?.length || 0}
          note="Massage, facial, sauna, wellness"
        />
        <SpaStatCard
          icon={Users2}
          title="Therapists"
          isLoading={isLoadingTherapists}
          value={spaTherapistsData?.length || 0}
          note="Shifts and availability by day"
        />
        <SpaStatCard icon={CircleDollarSign} title="Average ticket" value={1400} note="Single services and packages" />
        <SpaStatCard icon={Clock3} title="Time-slot model" value="Dynamic" note="Generated from opening hours" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SpaSectionCard
          title="Spa services by category"
          description="Services are organized by category and remain independent from therapists. The therapist is chosen later during booking."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {categoriesWithCounts?.map((item) => (
              <div key={item.name} className={`rounded-3xl border border-[var(--color-border)] bg-gradient-to-br p-5`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">{item.name}</h3>
                  {item.servicesCount > 0 && <SpaStatusPill label={`${item.servicesCount} services`} />}
                  {item.packagesCount > 0 && <SpaStatusPill label={`${item.packagesCount} packages`} />}
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-sub)]">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
            <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr] gap-4 border-b border-[var(--color-border)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-sub)] sm:grid">
              <span>Service</span>
              <span>Duration</span>
              <span>Price</span>
            </div>
            <div className="hidden divide-y divide-[var(--color-border)] sm:block">
              {spaServicesData?.map((service) => (
                <div key={service.id} className="grid grid-cols-[1.5fr_0.7fr_0.7fr] gap-4 px-5 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[var(--color-text)]">{service.name}</p>
                      <SpaStatusPill label={service.category_id?.name} />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-sub)]">{service.description}</p>
                  </div>
                  <div className="text-sm font-medium text-[var(--color-text)]">{service.duration}</div>
                  <div className="text-sm font-semibold text-[var(--color-text-gold)]">{service.price}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3 p-4 sm:hidden">
              {spaServicesData?.map((service) => (
                <div key={service.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--color-text)]">{service.name}</p>
                      <p className="mt-1 text-sm text-[var(--color-text-sub)]">{service.description}</p>
                    </div>
                    <SpaStatusPill label={service.category_id?.name} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                    <span className="text-[var(--color-text-sub)]">{service.duration}</span>
                    <span className="font-semibold text-[var(--color-text-gold)]">{service.price}</span>
                  </div>
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
              <div
                key={step}
                className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-4 sm:flex-row sm:items-center"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-text-gold)] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-text)]">{step}</p>
                  <p className="text-sm text-[var(--color-text-sub)]">A step in the spa booking lifecycle.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.92),_rgba(253,240,215,0.5))] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-sub)]">Time slots</p>
                <p className="mt-1 text-lg font-semibold text-[var(--color-text)]">Generated dynamically</p>
              </div>
              <Clock3 className="size-5 text-[var(--color-text-gold)]" />
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--color-text-sub)]">
              Slots are derived from opening hours, closing hours, service duration, and existing bookings.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <SpaStatusPill key={slot} label={slot} />
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 sm:p-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-sub)]">Customer types</p>
              <div className="mt-3 space-y-2">
                <div className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
                  <p className="font-semibold text-[var(--color-text)]">Hotel Guest</p>
                  <p className="text-sm text-[var(--color-text-sub)]">Linked to guest record when available.</p>
                </div>
                <div className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
                  <p className="font-semibold text-[var(--color-text)]">External Customer</p>
                  <p className="text-sm text-[var(--color-text-sub)]">Stored directly in the spa customer table.</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-sub)]">Booking constraints</p>
              <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-sub)]">
                <p className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">Service or package must be selected, never both.</p>
                <p className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
                  Therapist is chosen during booking, not on the service itself.
                </p>
                <p className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
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
            {spaPackagesWithServices?.map((pack) => (
              <div
                key={pack.id}
                className="rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-text)]">{pack.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-sub)]">{pack.description}</p>
                  </div>
                  <div className="rounded-2xl bg-[var(--color-text-gold)] px-4 py-2 text-right text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-90">Fixed price</p>
                    <p className="text-xl font-semibold">{pack.price}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pack.services.map((service) => (
                    <SpaStatusPill key={service.id} label={service.name} />
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
            {spaTherapistsData?.map((therapist) => (
              <div key={therapist.id} className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_rgba(212,175,55,0.18),_rgba(255,255,255,0.9))]">
                    <Gem className="size-5 text-[var(--color-text-gold)]" />
                  </div>
                  <SpaStatusPill label={therapist.availability} />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--color-text)]">{therapist.full_name}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-sub)]">{therapist.specialty}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-[var(--color-text-sub)]">
                  <Activity className="size-4 text-[var(--color-text-gold)]" />
                  {timeNormalization(therapist.shift_from)} - {timeNormalization(therapist.shift_to)}
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
      </section>
    </div>
  );
};

export default memo(Spa);
