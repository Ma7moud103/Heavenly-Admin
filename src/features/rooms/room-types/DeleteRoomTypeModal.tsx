import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { IRoomsTypes } from '@/interfaces/IRooms';

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedType: IRoomsTypes | null;
  confirmDelete: () => void;
  deleteMutation: {
    isPending: boolean;
  };
}
const DeleteRoomTypeModal = ({ open, onOpenChange, selectedType, confirmDelete, deleteMutation }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={!deleteMutation.isPending}>
        <DialogHeader>
          <DialogTitle>Delete {selectedType?.name}?</DialogTitle>
          <DialogDescription>
            This removes the room type permanently. It cannot be undone. Types assigned to rooms may need to be reassigned first.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={confirmDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? 'Deleting…' : 'Delete room type'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoomTypeModal;
