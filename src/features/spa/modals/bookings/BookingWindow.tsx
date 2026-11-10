import { useState, type ReactNode } from 'react';
import { FormProvider, useForm, type DefaultValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { spaBookingSchema } from '@/utils/schemas';
import type { IBookingData, ISpaBookings } from '@/interfaces/ISpa';
import BookingForm from './BookingForm';

interface IProps {
  children: ReactNode;
  initialValues: DefaultValues<IBookingData>;
  booking?: ISpaBookings;
}

const BookingWindow = ({ children, initialValues, booking }: IProps) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<IBookingData>({
    defaultValues: initialValues,
    resolver: yupResolver(spaBookingSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-2xl">
        <FormProvider {...methods}>
          <BookingForm
            header={booking ? 'Edit Booking' : 'Create New Booking'}
            description={booking ? 'Update the upcoming spa appointment details.' : 'Build a spa booking with customer, therapist, slot, status, and price details.'}
            bookingId={booking?.id}
            onDone={() => setOpen(false)}
          />
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
};

export default BookingWindow;