import { DeleteItem } from '@/components/shared/Delete';
import { ManageCat } from '../../modals/C&ECategory/ManageCat';
import { useDeleteCat } from '@/hooks/spa/useHandleDeleteCat';
import { useCategory } from '@/stores/spa/Categories.store';
import { toast } from 'react-toastify';

const CategoryModals = () => {
  const {
    OpenAddCat,
    OpenDeleteModal,
    OpenUpdateCat,
    handleOpenAddCatChange,
    handleOpenDelete,
    handleOpenUpdateCatChange,
    selectedCategory,
    setSelectedCategory,
  } = useCategory();

  const { mutateAsync, isPending } = useDeleteCat();

  const handleDelete = async () => {
    const id = selectedCategory?.id;
    if (!id) return;

    try {
      await mutateAsync(id);
      toast.success('Category is deleted Successfully!');
      handleOpenDelete(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete room';

      toast.error(message);
    } finally {
      setSelectedCategory(undefined);
    }
  };

  return (
    <>
      <ManageCat mode="create" onOpenChange={handleOpenAddCatChange} open={OpenAddCat} />

      <ManageCat mode="edit" onOpenChange={handleOpenUpdateCatChange} open={OpenUpdateCat} category={selectedCategory} />

      <DeleteItem
        onConfirm={handleDelete}
        onOpenChange={handleOpenDelete}
        open={OpenDeleteModal}
        isDeleting={isPending}
        itemName={selectedCategory?.name}
        title="Delete category?"
      />
    </>
  );
};

export default CategoryModals;
