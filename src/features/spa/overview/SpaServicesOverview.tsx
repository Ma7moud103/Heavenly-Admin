import { SpaSectionCard } from '../components/SpaSectionCard';
import { SpaStatusPill } from '../components/SpaStatusPill';

import UseCategoriesWithCounts from '@/hooks/spa/UseCategoriesWithCounts';

const SpaServicesOverview = () => {
  const { categoriesWithCounts, spaServicesData } = UseCategoriesWithCounts();

  return (
    <SpaSectionCard
      title="Spa categories by services & packages"
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
  );
};

export default SpaServicesOverview;
