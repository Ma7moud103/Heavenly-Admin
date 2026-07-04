import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import UseSpaCategories from '@/hooks/spa/UseSpaCategories';
import { Tag } from 'lucide-react';

export default function SpaCategoriesPage() {
  const { data: spaCategories = [], isLoading, isError, error } = UseSpaCategories();
  return (
    <SpaHeader
      eyebrow="Spa Categories"
      title="Organize spa services by category."
      description="Categories are used to group services like massage, facial, sauna, and wellness."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Category cards" description="Simple static cards for future CRUD operations.">
        {isLoading ? <p className="text-sm text-[var(--color-text-sub)]">Loading categories...</p> : null}
        {isError ? (
          <p className="text-sm text-[var(--color-error)]">
            Failed to load categories{error instanceof Error ? `: ${error.message}` : '.'}
          </p>
        ) : null}
        {!isLoading && !isError && spaCategories.length === 0 ? (
          <p className="text-sm text-[var(--color-text-sub)]">No categories available yet.</p>
        ) : null}
        {!isLoading && !isError && spaCategories.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {spaCategories.map((category) => (
              <div key={category.id} className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="size-4 text-[var(--color-text-gold)]" />
                    <h3 className="text-lg font-semibold text-[var(--color-text)]">{category.name}</h3>
                  </div>
                  <SpaStatusPill label="Category" />
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-sub)]">{category.description}</p>
              </div>
            ))}
          </div>
        ) : null}
      </SpaSectionCard>
    </SpaHeader>
  );
}
