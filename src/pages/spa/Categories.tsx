import { Tag } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaPageShell } from '@/features/spa/components/SpaPageShell';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaCategories } from '@/features/spa/data';

export default function SpaCategoriesPage() {
  return (
    <SpaPageShell
      eyebrow="Spa Categories"
      title="Organize spa services by category."
      description="Categories are used to group services like massage, facial, sauna, and wellness."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Category cards" description="Simple static cards for future CRUD operations.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {spaCategories.map((category) => (
            <div key={category.name} className={`rounded-3xl border border-[--color-border] bg-gradient-to-br ${category.accent} p-5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-[--color-text-gold]" />
                  <h3 className="text-lg font-semibold text-[--color-text]">{category.name}</h3>
                </div>
                <SpaStatusPill label={`${category.count} services`} />
              </div>
              <p className="mt-3 text-sm leading-6 text-[--color-text-sub]">Used to group services and keep the catalog clean.</p>
            </div>
          ))}
        </div>
      </SpaSectionCard>
    </SpaPageShell>
  );
}
