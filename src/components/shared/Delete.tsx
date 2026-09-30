import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: string;
  description?: string;

  itemName?: string;

  onConfirm: () => Promise<void> | void;

  isDeleting?: boolean;
}

export function DeleteItem({ open, onOpenChange, title = 'Delete item?', description, itemName, onConfirm, isDeleting = false }: IProps) {
  const handleClose = (nextOpen: boolean) => {
    if (!isDeleting) {
      onOpenChange(nextOpen);
    }
  };

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl text-center">{title}</DialogTitle>

          <DialogDescription className="text-center">
            {description ?? `Are you sure you want to delete ${itemName ? `"${itemName}"` : 'this item'}? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="border-t bg-transparent border-t-[--color-border]">
          <button type="button" className="btn btn-ghost" onClick={() => handleClose(false)} disabled={isDeleting}>
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary bg-[--color-error] text-white hover:bg-[--color-error]/90 disabled:opacity-70"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
