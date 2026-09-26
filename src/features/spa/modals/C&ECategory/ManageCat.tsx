import { type FormEvent } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

import type { IRoom, RoomStatus, IRoomsTypes } from '@/interfaces/IRooms';

interface IProps {
  mode: 'create' | 'edit';
  open: boolean;
  room?: IRoom | null;
  roomStatuses: RoomStatus[];
  roomTypes: IRoomsTypes[];
  onOpenChange: (open: boolean) => void;
}

export function ManageCat({ mode, open, room, roomStatuses, roomTypes, onOpenChange }: IProps) {
  //   useEffect(() => {
  //     if (!open) return;

  //     if (mode === 'edit' && room) {
  //       setForm(buildRoomFormState(room));
  //       return;
  //     }

  //     const defaultRoomTypeId = getDefaultRoomTypeId(roomTypes);
  //     setForm((current) => {
  //       const roomTypeId = current.room_type_id || defaultRoomTypeId;

  //       return {
  //         ...initialCreateRoomForm,
  //         room_type_id: roomTypeId,
  //         status_id: getDefaultRoomStatusId(roomStatuses),
  //         base_price: getRoomTypePrice(roomTypes, roomTypeId),
  //       };
  //     });
  //   }, [mode, open, room, roomStatuses, roomTypes]);

  const activeMutation = mode === 'edit' ? true : false;

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    // const nextErrors = validateCreateRoomForm(form);
    // if (Object.keys(nextErrors).length > 0) {
    //   setErrors(nextErrors);
    //   return;
    // }
    // try {
    //   const payload = buildCreateRoomPayload(form);
    //   if (mode === 'edit' && room) {
    //     await updateRoomMutation.mutateAsync({ roomId: room.id, payload });
    //     toast.success('Room updated successfully');
    //   } else {
    //     await createRoomMutation.mutateAsync(payload);
    //     toast.success('Room created successfully');
    //   }
    //   handleClose(false);
    // } catch (error) {
    //   const message = error instanceof Error ? error.message : `Failed to ${mode} room`;
    //   toast.error(message);
    // }
  };

  const title = mode === 'edit' ? 'Update Room' : 'Create New Room';
  const description =
    mode === 'edit'
      ? 'Update room details, pricing, image, type, and status.'
      : 'Create a room with pricing, capacity, image, and linked room type and status.';
  const submitLabel = activeMutation ? (mode === 'edit' ? 'Saving...' : 'Creating...') : mode === 'edit' ? 'Save Changes' : 'Create Room';

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          {/* <CreateRoomFormFields errors={errors} form={form} roomStatuses={roomStatuses} roomTypes={roomTypes} onChange={handleChange} /> */}

          {activeMutation ? <p className="px-4 text-sm text-[--color-error]">{activeMutation}</p> : null}

          <SheetFooter className="border-t border-[--color-border] sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => handleClose(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={activeMutation}>
              {submitLabel}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
