import { UserCircle2 } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaPageShell } from '@/features/spa/components/SpaPageShell';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaCustomers } from '@/features/spa/data';

export default function SpaGuestsPage() {
  return (
    <SpaPageShell
      eyebrow="Spa Customers"
      title="Hotel guests and external customers."
      description="Customers are stored in a dedicated spa table, whether they are hotel guests or external visitors."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Customer list" description="A simple customer directory for future create, edit, delete, and view actions.">
        <div className="overflow-hidden rounded-[1.75rem] border border-[--color-border] bg-[--color-bg-subtle]">
          <div className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-4 border-b border-[--color-border] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[--color-text-sub]">
            <span>Name</span>
            <span>Type</span>
            <span>Phone</span>
            <span>Email</span>
          </div>
          <div className="divide-y divide-[--color-border]">
            {spaCustomers.map((customer) => (
              <div key={customer.name} className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-4 px-5 py-4">
                <div className="flex items-center gap-2">
                  <UserCircle2 className="size-4 text-[--color-text-gold]" />
                  <p className="font-semibold text-[--color-text]">{customer.name}</p>
                </div>
                <SpaStatusPill label={customer.type} />
                <div className="text-sm text-[--color-text-sub]">{customer.phone}</div>
                <div className="text-sm text-[--color-text-sub]">{customer.email}</div>
              </div>
            ))}
          </div>
        </div>
      </SpaSectionCard>
    </SpaPageShell>
  );
}
