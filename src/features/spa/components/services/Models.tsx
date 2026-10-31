import { DeleteItem } from '@/components/shared/Delete';
import { useDeleteSpaService } from '@/hooks/spa/useDeleteSpaService';
import { toast } from 'react-toastify';
import { useService } from '@/stores/spa/Services.store';
import { ManageServices } from '../../modals/Services/ManageServices';

const ServiceModels = () => {
  const {
    OpenAddService,
    OpenDeleteModal,
    OpenUpdateService,
    selectedService,
    setOpenAddService,
    setOpenDeleteModal,
    setOpenUpdateService,
    setSelectedService,
  } = useService();

  const { mutateAsync, isPending } = useDeleteSpaService();

  const handleDelete = async () => {
    const id = selectedService?.id;
    if (!id) return;

    try {
      await mutateAsync(id);
      toast.success('Service is deleted Successfully!');
      setOpenDeleteModal(false);
      setSelectedService(undefined);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete service';

      toast.error(message);
    }
  };

  return (
    <>
      <ManageServices mode="create" onOpenChange={setOpenAddService} open={OpenAddService} />

      <ManageServices mode="edit" onOpenChange={setOpenUpdateService} open={OpenUpdateService} service={selectedService} />

      <DeleteItem
        onConfirm={handleDelete}
        onOpenChange={setOpenDeleteModal}
        open={OpenDeleteModal}
        isDeleting={isPending}
        itemName={selectedService?.name}
        title="Delete Service?"
      />
    </>
  );
};

export default ServiceModels;
