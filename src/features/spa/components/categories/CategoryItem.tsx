import { Button } from '@/components/ui/button';
import { Gift, LockKeyhole, PencilLine, Scissors, Tag, Trash2 } from 'lucide-react';
import type { ICategoryWithCounts } from '@/interfaces/ISpa';
import { useCategory } from '@/stores/spa/Categories.store';

const CategoryItem = ({ category }: { category: ICategoryWithCounts }) => {
  const { handleOpenDelete, handleOpenUpdateCatChange, setSelectedCategory } = useCategory();
  const hasItems = category.servicesCount > 0 || category.packagesCount > 0;
  const deleteTitle = hasItems
    ? `Remove ${category.servicesCount} service(s) and ${category.packagesCount} package(s) before deleting this category.`
    : `Delete ${category.name}`;

  return (
    <article className="group flex min-h-full flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-[var(--color-text-gold)]">
            <Tag className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-sub)]">Spa category</p>
            <h3 className="mt-1 break-words text-lg font-semibold text-[var(--color-text)]">{category.name}</h3>
          </div>
        </div>

        <p className="mt-4 min-h-12 text-sm leading-6 text-[var(--color-text-sub)]">{category.description || 'No description provided.'}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-sub)]"><Scissors className="size-3.5" />Services</div>
            <p className="mt-1 text-xl font-semibold text-[var(--color-text)]">{category.servicesCount}</p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 py-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-sub)]"><Gift className="size-3.5" />Packages</div>
            <p className="mt-1 text-xl font-semibold text-[var(--color-text)]">{category.packagesCount}</p>
          </div>
        </div>
      </div>

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)]/70 p-4">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="min-h-10 flex-1 gap-2 border-[var(--color-border)] bg-white hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
            onClick={() => {
              setSelectedCategory(category);
              handleOpenUpdateCatChange(true);
            }}
            aria-label={`Edit ${category.name}`}
          >
            <PencilLine className="size-4" />Edit
          </Button>
          <Button
            type="button"
            variant={hasItems ? 'outline' : 'destructive'}
            className={`min-h-10 flex-1 gap-2 ${hasItems ? 'cursor-not-allowed border-dashed text-[var(--color-text-sub)]' : ''}`}
            disabled={hasItems}
            title={deleteTitle}
            aria-label={hasItems ? `Cannot delete ${category.name}: category still has services or packages` : `Delete ${category.name}`}
            onClick={() => {
              setSelectedCategory(category);
              handleOpenDelete(true);
            }}
          >
            {hasItems ? <LockKeyhole className="size-4" /> : <Trash2 className="size-4" />}
            {hasItems ? 'In use' : 'Delete'}
          </Button>
        </div>
        {hasItems && <p className="mt-2 text-center text-xs leading-5 text-[var(--color-text-sub)]">Delete is available after this category has no services or packages.</p>}
      </footer>
    </article>
  );
};

export default CategoryItem;