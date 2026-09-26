import { Button } from '@/components/ui/button';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import UseCategoriesWithCounts from '@/hooks/spa/UseCategoriesWithCounts';
import { Edit, Tag, Trash } from 'lucide-react';

export default function SpaCategoriesPage() {
  const { categoriesWithCounts, IsLoadingCategories } = UseCategoriesWithCounts();
  return (
    <SpaHeader
      eyebrow="Spa Categories"
      title="Organize spa services by category."
      description="Categories are used to group services like massage, facial, sauna, and wellness."
      actions={
        <Button className=" inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-text-gold)  p-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto">
          Create New Category
        </Button>
      }
    >
      <SpaSectionCard title="Category cards" description="Simple static cards for future CRUD operations.">
        {IsLoadingCategories ? <p className="text-sm text-(--color-text-sub)">Loading categories...</p> : null}

        {!IsLoadingCategories && categoriesWithCounts.length === 0 ? (
          <p className="text-sm text-(--color-text-sub)">No categories available yet.</p>
        ) : null}
        {!IsLoadingCategories && categoriesWithCounts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categoriesWithCounts.map((category) => (
              <div key={category.id} className="rounded-3xl border border-(--color-border) bg-(--color-bg-subtle) p-5 flex flex-col gap-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="size-4 text-[var(--color-text-gold)]" />
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">{category.name}</h3>
                </div>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text-sub)]">{category.description}</p>

                <div className="flex items-center gap-x-3">
                  {category.packagesCount > 0 && <SpaStatusPill label={`Packages ${category.packagesCount}`} />}
                  {category.servicesCount > 0 && <SpaStatusPill label={`Services ${category.servicesCount}`} />}
                </div>

                <div className="flex items-center gap-x-1">
                  {!(category.packagesCount > 0) && !(category.servicesCount > 0) && (
                    <Button variant={'outline'} className="cursor-pointer">
                      <Trash color="var(--color-text-gold)" size={20} />
                    </Button>
                  )}
                  <Button variant={'outline'} className="cursor-pointer">
                    <Edit color="var(--color-text-gold)" size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </SpaSectionCard>
    </SpaHeader>
  );
}
