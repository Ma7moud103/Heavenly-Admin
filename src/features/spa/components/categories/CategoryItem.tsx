import { Button } from '@/components/ui/button';
import { Edit, Tag, Trash } from 'lucide-react';
import { SpaStatusPill } from '../SpaStatusPill';
import type { ICategoryWithCounts } from '@/interfaces/ISpa';
import { useCategory } from '@/stores/spa/Categories.store';

const CategoryItem = ({ category }: { category: ICategoryWithCounts }) => {
  const { handleOpenDelete, handleOpenUpdateCatChange, setSelectedCategory } = useCategory();

  return (
    <div key={category.id} className="rounded-3xl border border-(--color-border) bg-(--color-bg-subtle) p-5 flex flex-col gap-y-3">
      <div className="flex items-center gap-2">
        <Tag className="size-4 text-(--color-text-gold)" />
        <h3 className="text-lg font-semibold text-(--color-text)">{category.name}</h3>
      </div>
      <p className="mt-1 text-sm leading-6 text-(--color-text-sub)">{category.description}</p>

      <div className="flex items-center gap-x-3">
        {category.packagesCount > 0 && <SpaStatusPill label={`Packages ${category.packagesCount}`} />}
        {category.servicesCount > 0 && <SpaStatusPill label={`Services ${category.servicesCount}`} />}
      </div>

      <div className="flex items-center gap-x-1">
        {!(category.packagesCount > 0) && !(category.servicesCount > 0) && (
          <Button
            onClick={() => {
              setSelectedCategory(category);
              handleOpenDelete(true);
            }}
            variant={'outline'}
            className="cursor-pointer"
          >
            <Trash color="var(--color-text-gold)" size={20} />
          </Button>
        )}
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => {
            setSelectedCategory(category);
            handleOpenUpdateCatChange(true);
          }}
        >
          <Edit color="var(--color-text-gold)" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;
