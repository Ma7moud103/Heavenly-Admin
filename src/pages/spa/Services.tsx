import { Scissors } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaPageShell } from '@/features/spa/components/SpaPageShell';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaServices } from '@/features/spa/data';

export default function SpaServicesPage() {
  return (
    <SpaPageShell
      eyebrow="Spa Services"
      title="Manage single spa services."
      description="Each service belongs to a category and has its own duration, price, and description."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Services list" description="Static service cards ready for future create, edit, delete, and view actions.">
        <div className="overflow-hidden rounded-[1.75rem] border border-[--color-border] bg-[--color-bg-subtle]">
          <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr] gap-4 border-b border-[--color-border] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[--color-text-sub]">
            <span>Service</span>
            <span>Category</span>
            <span>Duration</span>
            <span>Price</span>
          </div>
          <div className="divide-y divide-[--color-border]">
            {spaServices.map((service) => (
              <div key={service.name} className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr] gap-4 px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Scissors className="size-4 text-[--color-text-gold]" />
                    <p className="font-semibold text-[--color-text]">{service.name}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[--color-text-sub]">{service.description}</p>
                </div>
                <div><SpaStatusPill label={service.category} /></div>
                <div className="text-sm font-medium text-[--color-text]">{service.duration}</div>
                <div className="text-sm font-semibold text-[--color-text-gold]">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </SpaSectionCard>
    </SpaPageShell>
  );
}
