import { Button } from '@/components/ui/button';
import CategoryItem from '@/features/spa/components/categories/CategoryItem';
import CategoryModals from '@/features/spa/components/categories/Modals';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import UseCategoriesWithCounts from '@/hooks/spa/categories/UseCategoriesWithCounts';
import { useCategory } from '@/stores/spa/Categories.store';
import { memo } from 'react';

const SpaCategoriesPage = function () {
  const { categoriesWithCounts, IsLoadingCategories } = UseCategoriesWithCounts();

  const { handleOpenAddCatChange } = useCategory();

  return (
    <SpaHeader
      eyebrow="Spa Categories"
      title="Organize spa services by category."
      description="Categories are used to group services like massage, facial, sauna, and wellness."
      actions={
        <Button
          onClick={() => handleOpenAddCatChange(true)}
          className=" inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-text-gold)  p-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          Create New Category
        </Button>
      }
    >
      <SpaSectionCard title="Category directory" description="Manage category details and see which services and packages belong to each category.">
        {IsLoadingCategories ? <p className="text-sm text-(--color-text-sub)">Loading categories...</p> : null}

        {!IsLoadingCategories && categoriesWithCounts.length === 0 ? (
          <p className="text-sm text-(--color-text-sub)">No categories available yet.</p>
        ) : null}
        {!IsLoadingCategories && categoriesWithCounts.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {categoriesWithCounts.map((category) => (
              <CategoryItem category={category} key={category.id} />
            ))}
          </div>
        ) : null}
      </SpaSectionCard>
      <CategoryModals />
    </SpaHeader>
  );
};
export default memo(SpaCategoriesPage);
