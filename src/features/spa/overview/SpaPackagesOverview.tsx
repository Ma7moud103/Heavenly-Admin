import { UseSpaPackages } from '@/hooks/spa/UseSpaPackages';
import { SpaSectionCard } from '../components/SpaSectionCard';
import { SpaStatusPill } from '../components/SpaStatusPill';

const SpaPackagesOverview = () => {
  const { data: spaPackagesWithServices } = UseSpaPackages();

  return (
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
  );
};

export default SpaPackagesOverview;
