import { UserCircle2 } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import UseSpaCustomers from '@/hooks/spa/UseSpaCusteomers';

export default function SpaGuestsPage() {
  const { data: customers } = UseSpaCustomers();
  return (
    <SpaHeader
      eyebrow="Spa Customers"
      title="Hotel guests and external customers."
      description="Customers are stored in a dedicated spa table, whether they are hotel guests or external visitors."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Customer list" description="A simple customer directory for future create, edit, delete, and view actions.">
        <div className="overflow-hidden rounded-[1.75rem] border border-(--color-border  bg-(--color-bg-subtle)">
          <div className="hidden grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-4 border-b border-(--color-border  px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-sub) sm:grid">
            <span>Name</span>
            <span>Type</span>
            <span>Phone</span>
            <span>Email</span>
          </div>
          <div className="hidden divide-y divide-(--color-border) sm:block">
            {customers?.map((customer) => (
              <div key={customer.full_name} className="grid grid-cols-[1.3fr_0.8fr_0.8fr_1fr] gap-4 px-5 py-4">
                <div className="flex items-center gap-2">
                  <UserCircle2 className="size-4 text-(--color-text-gold)]" />
                  <p className="font-semibold text-(--color-text)">{customer.full_name}</p>
                </div>
                <SpaStatusPill label={customer.customer_type} />
                <div className="text-sm text-(--color-text-sub)">{customer.phone}</div>
                <div className="text-sm text-(--color-text-sub)">{customer.email}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3 p-4 sm:hidden">
            {customers?.map((customer) => (
              <div key={customer.full_name} className="rounded-2xl border border-(--color-border  bg-(--color-bg-raised)p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-(--color-text)">{customer.full_name}</p>
                    <p className="mt-1 text-sm text-(--color-text-sub)">{customer.email}</p>
                  </div>
                  <SpaStatusPill label={customer.customer_type} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <span className="text-(--color-text-sub)">Phone</span>
                  <span className="text-right text-(--color-text)">{customer.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SpaSectionCard>
    </SpaHeader>
  );
}
