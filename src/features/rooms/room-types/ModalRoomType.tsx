import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { RoomTypePayload } from '../../../data/rooms&bookings/manageRoomType';
import type { IRoomsTypes } from '@/interfaces/IRooms';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/button';

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roomType: IRoomsTypes | null;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  form: RoomTypePayload;
  setForm: React.Dispatch<React.SetStateAction<RoomTypePayload>>;
  formError: string;
  isSaving: boolean;
}
const ModalRoomType = ({ form, formError, isSaving, onOpenChange, onSave, open, roomType, setForm }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" showCloseButton={!isSaving}>
        <form onSubmit={onSave}>
          <DialogHeader>
            <DialogTitle>{roomType ? 'Edit room type' : 'Create room type'}</DialogTitle>
            <DialogDescription>Use a clear category name and the standard price per night.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-5">
            <label className="grid gap-2 text-sm font-medium" htmlFor="room-type-name">
              Room type name
              <Input
                id="room-type-name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="e.g. Deluxe Suite"
                autoFocus
              />
            </label>
            <label className="grid gap-2 text-sm font-medium" htmlFor="room-type-price">
              Base price (EGP / night)
              <Input
                id="room-type-price"
                type="number"
                min="1"
                step="1"
                value={form.price || ''}
                onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
                placeholder="2500"
              />
            </label>
            {formError ? (
              <p role="alert" className="text-sm text-destructive">
                {formError}
              </p>
            ) : null}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : roomType ? 'Save changes' : 'Create room type'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalRoomType;
