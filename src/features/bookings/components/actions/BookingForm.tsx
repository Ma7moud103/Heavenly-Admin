import { useEffect, useMemo, useReducer, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { BookingFormFields } from '@/features/bookings/components/actions/BookingFormFields';
import { buildCreateBookingFormState, buildCreateBookingPayload, getAvailableRooms, getNextBookingStatuses, validateBookingForm, type BookingFormState } from '@/features/bookings/bookingForm';
import { bookingFormReducer, initialBookingFormReducerState } from '@/features/bookings/bookingFormReducer';
import UseCreateBooking from '@/hooks/rooms&bookings/UseCreateBooking';
import type { IBookingStatus } from '@/interfaces/IBooking';
import type { IRoomBooking } from '@/interfaces/IRoomBookings';
import type { IRoom } from '@/interfaces/IRooms';
import type { IGuest } from '@/interfaces/IGuest';
import UseUpdateBooking from '@/hooks/rooms&bookings/UseUpdateBooking';

interface IProps {
  mode: 'create' | 'edit';
  open: boolean;
  booking?: IRoomBooking | null;
  rooms: IRoom[];
  guests: IGuest[];
  statuses: IBookingStatus[];
  bookings: IRoomBooking[];
  onOpenChange: (open: boolean) => void;
}

export function BookingForm({ mode, open, booking, rooms, guests, statuses, bookings, onOpenChange }: IProps) {
  const createBookingMutation = UseCreateBooking();
  const updateBookingMutation = UseUpdateBooking();
  const [state, dispatch] = useReducer(bookingFormReducer, initialBookingFormReducerState);
  const { form, errors } = state;
  const availableRooms = getAvailableRooms(rooms, bookings, form.check_in, form.check_out, mode === 'edit' ? booking?.id : undefined);
  const currentStatus = mode === 'edit' ? booking?.status?.name ?? '' : 'pending';
  const selectableStatuses = mode === 'create' ? statuses.filter((status) => status.name.toLowerCase() === 'pending') : getNextBookingStatuses(statuses, currentStatus);

  useEffect(() => {
    if (!open) return;

    if (mode === 'edit' && booking) {
      dispatch({ type: 'hydrate', booking });
      return;
    }

    const initialForm = buildCreateBookingFormState(rooms, guests, statuses);
    const initialAvailableRooms = getAvailableRooms(rooms, bookings, initialForm.check_in, initialForm.check_out);
    dispatch({
      type: 'initialize',
      form: { ...initialForm, room_id: initialAvailableRooms[0]?.id ?? '' },
    });
  }, [booking, bookings, guests, mode, open, rooms, statuses]);

  useEffect(() => {
    if (!open) {
      dispatch({ type: 'reset' });
    }
  }, [open]);

  const activeMutation = mode === 'edit' ? updateBookingMutation : createBookingMutation;

  useEffect(() => {
    if (form.room_id && !availableRooms.some((room) => room.id === form.room_id)) {
      dispatch({ type: 'setField', field: 'room_id', value: '' });
    }
  }, [availableRooms, form.room_id]);

  const hasRequiredOptions = useMemo(
    () => availableRooms.length > 0 && guests.length > 0 && selectableStatuses.length > 0,
    [availableRooms.length, guests.length, selectableStatuses.length],
  );

  const handleChange = <K extends keyof BookingFormState>(field: K, value: BookingFormState[K]) => {
    dispatch({
      type: 'setField',
      field,
      value,
    });
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      dispatch({ type: 'reset' });
      createBookingMutation.reset();
      updateBookingMutation.reset();
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasRequiredOptions) {
      toast.error('Booking setup data is incomplete');
      return;
    }

    const nextErrors = validateBookingForm(form, availableRooms, guests, selectableStatuses);
    if (Object.keys(nextErrors).length > 0) {
      dispatch({ type: 'setErrors', errors: nextErrors });
      return;
    }

    try {
      const payload = buildCreateBookingPayload(form, rooms);

      if (mode === 'edit' && booking) {
        await updateBookingMutation.mutateAsync({ bookingId: booking.id, payload });
        toast.success('Booking updated successfully');
      } else {
        await createBookingMutation.mutateAsync(payload);
        toast.success('Booking created successfully');
      }

      handleClose(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to ${mode} booking`;
      toast.error(message);
    }
  };

  const title = mode === 'edit' ? 'Edit Booking' : 'Create New Booking';
  const description =
    mode === 'edit'
      ? 'Update the guest, room, stay dates, and reservation status.'
      : 'Create a new reservation with a guest, room, stay dates, and status.';
  const submitLabel = activeMutation.isPending
    ? mode === 'edit'
      ? 'Saving...'
      : 'Creating...'
    : mode === 'edit'
      ? 'Save Changes'
      : 'Create Booking';

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl ">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <BookingFormFields form={form} errors={errors} rooms={availableRooms} guests={guests} statuses={selectableStatuses} onChange={handleChange} />

          {!hasRequiredOptions ? (
            <p className="px-4 text-sm text-[--color-text-sub]">
              {availableRooms.length ? 'Guests and booking statuses must be available before you can save.' : 'No rooms are available for these dates. Choose another stay range.'}
            </p>
          ) : null}

          {activeMutation.isError ? <p className="px-4 text-sm text-[--color-error]">{activeMutation.error.message}</p> : null}

          <SheetFooter className="border-t border-[--color-border] sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => handleClose(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={activeMutation.isPending || !hasRequiredOptions}>
              {submitLabel}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
