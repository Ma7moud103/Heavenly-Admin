import { useFormContext, type SubmitHandler } from 'react-hook-form';
import { SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import type { IBookingData } from '@/interfaces/ISpa';
import { toast } from 'react-toastify';

import UseCreateSpaBooking from '@/hooks/spa/bookings/UseCreateSpaBooking';
import { UseUpdateSpaBooking } from '@/hooks/spa/bookings/UseSpaBookingActions';
import UseBookingSelecttions from '@/hooks/spa/bookings/UseBookingSelecttions';
import BookingCustomerSection from './BookingCustomerSection';
import BookingTreatmentSection from './BookingTreatmentSection';
import BookingScheduleSection from './BookingScheduleSection';
import BookingNotesSection from './BookingNotesSection';
import BookingPriceSection from './BookingPriceSection';

interface IProps {
  header: string;
  description: string;
  bookingId?: string;
  onDone: () => void;
}

const BookingForm = ({ header, description, bookingId, onDone }: IProps) => {
  const { handleSubmit } = useFormContext<IBookingData>();
  const { derivedTotalPrice } = UseBookingSelecttions();
  const { mutateAsync: createBooking, isPending: isCreating } = UseCreateSpaBooking();
  const { mutateAsync: updateBooking, isPending: isUpdating } = UseUpdateSpaBooking();
  const isPending = isCreating || isUpdating;

  const onSubmit: SubmitHandler<IBookingData> = async (data) => {
    try {
      const submitData: IBookingData = { ...data, total_price: derivedTotalPrice };
      if (bookingId) await updateBooking({ id: bookingId, booking: submitData });
      else await createBooking(submitData);
      toast.success(bookingId ? 'Booking updated successfully.' : 'Booking created successfully.');
      onDone();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save booking.');
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>{header}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>
      <form className="flex flex-col gap-5 px-4 pb-6" onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-4 rounded-2xl border border-(--color-border) p-4">
          <h3 className="font-semibold">Guest and therapist</h3>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <BookingCustomerSection />
          </FieldGroup>
        </section>

        <section className="space-y-4 rounded-2xl border border-(--color-border) p-4">
          <h3 className="font-semibold">Treatment</h3>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <BookingTreatmentSection />
          </FieldGroup>
        </section>

        <section className="space-y-4 rounded-2xl border border-(--color-border) p-4">
          <h3 className="font-semibold">Appointment schedule</h3>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <BookingScheduleSection bookingId={bookingId} />
          </FieldGroup>
        </section>

        <section className="space-y-4 rounded-2xl border border-(--color-border) p-4">
          <h3 className="font-semibold">Price and notes</h3>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <BookingPriceSection />
            <BookingNotesSection />
          </FieldGroup>
        </section>

        <SheetFooter className="border-t border-(--color-border) sm:flex-row sm:justify-end">
          <SheetClose asChild>
            <Button type="button" variant="ghost" disabled={isPending}>Cancel</Button>
          </SheetClose>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : bookingId ? 'Save changes' : 'Create booking'}
          </Button>
        </SheetFooter>
      </form>
    </>
  );
};

export default BookingForm;