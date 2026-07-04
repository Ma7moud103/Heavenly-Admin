import { UserCircle2 } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaCustomers } from '@/features/spa/data';
import { SpaHeader } from '@/features/spa/components/SpaHeader';

export default function SpaGuestsPage() {
  return (
    <SpaHeader
      eyebrow="Spa Customers"
      title="Hotel guests and external customers."
      description="Customers are stored in a dedicated spa table, whether they are hotel guests or external visitors."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Customer list" description="A simple customer directory for future create, edit, delete, and view actions.">
        <div className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
          <div className="hidden grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-4 border-b border-[var(--color-border)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-sub)] sm:grid">
            <span>Name</span>
            <span>Type</span>
            <span>Phone</span>
            <span>Email</span>
          </div>
          <div className="hidden divide-y divide-[var(--color-border)] sm:block">
            {spaCustomers.map((customer) => (
              <div key={customer.name} className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-4 px-5 py-4">
                <div className="flex items-center gap-2">
                  <UserCircle2 className="size-4 text-[var(--color-text-gold)]" />
                  <p className="font-semibold text-[var(--color-text)]">{customer.name}</p>
                </div>
                <SpaStatusPill label={customer.type} />
                <div className="text-sm text-[var(--color-text-sub)]">{customer.phone}</div>
                <div className="text-sm text-[var(--color-text-sub)]">{customer.email}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3 p-4 sm:hidden">
            {spaCustomers.map((customer) => (
              <div key={customer.name} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--color-text)]">{customer.name}</p>
                    <p className="mt-1 text-sm text-[var(--color-text-sub)]">{customer.email}</p>
                  </div>
                  <SpaStatusPill label={customer.type} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <span className="text-[var(--color-text-sub)]">Phone</span>
                  <span className="text-right text-[var(--color-text)]">{customer.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpaSectionCard>
    </SpaHeader>
  );
}
