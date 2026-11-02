import { DeleteItem } from '@/components/shared/Delete';

import { ManageTherapist } from '@/features/spa/modals/therapists/ManageServices';
import TherapistScheduleManager from '@/features/spa/modals/therapists/TherapistScheduleManager';
import { useTherapistUiContext } from '@/stores/spa/SpaTherapistsContext';
import TherapistDetails from './TherapistDetails';

export default function TherapistMoadels() {
  const {
    selected,
    formOpen,
    scheduleOpen,
    deleteOpen,
    deletePending,
    deleteLocked,
    deleteReason,
    setFormOpen,
    setScheduleOpen,
    setDeleteOpen,
    handleDelete,
  } = useTherapistUiContext();
  return (
    <>
      <ManageTherapist
        key={selected?.id ?? 'new'}
        mode={selected ? 'edit' : 'create'}
        open={formOpen}
        onOpenChange={setFormOpen}
        therapist={selected}
      />
      {selected && <TherapistScheduleManager open={scheduleOpen} onOpenChange={setScheduleOpen} therapist={selected} />}
      <DeleteItem
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        isDeleting={deletePending}
        itemName={selected?.full_name}
        title="Delete therapist?"
        description={deleteLocked ? deleteReason : undefined}
      />
      <TherapistDetails />
    </>
  );
}
