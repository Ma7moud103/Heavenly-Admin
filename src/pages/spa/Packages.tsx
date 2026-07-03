import { Gift } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaPageShell } from '@/features/spa/components/SpaPageShell';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaPackages } from '@/features/spa/data';

export default function SpaPackagesPage() {
  return (
    <SpaPageShell
      eyebrow="Spa Packages"
      title="Package collections with fixed prices."
      description="Packages are treated as collections of services with their own final price for the booking flow."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Package cards" description="A later form can create and update these bundles.">
        <div className="space-y-4">
          {spaPackages.map((pack) => (
            <div key={pack.name} className="rounded-3xl border border-[--color-border] bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Gift className="size-4 text-[--color-text-gold]" />
                    <h3 className="text-lg font-semibold text-[--color-text]">{pack.name}</h3>
                  </div>
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
    </SpaPageShell>
  );
}
