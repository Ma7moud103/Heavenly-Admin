import { useFormContext, type SubmitHandler } from 'react-hook-form';

import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { FieldGroup } from '@/components/ui/field';

import { type IBookingData } from '@/interfaces/ISpa';

import { toast } from 'react-toastify';
import BookingCustomerSection from './BookingCustomerSection';
import BookingTreatmentSection from './BookingTreatmentSection';
import BookingScheduleSection from './BookingScheduleSection';
import BookingPriceSection from './BookingPriceSection';
import BookingNotesSection from './BookingNotesSection';
import UseCreateSpaBooking from '@/hooks/spa/UseCreateSpaBooking';
import UseBookingSelecttions from '@/hooks/spa/UseBookingSelecttions';
import type { ReactNode } from 'react';
import BookingFooter from './BookingFooter';

interface IProps {
  header: string;
  description: string;
  headerIcon: ReactNode;
}
const BookingForm = ({ header, description, headerIcon }: IProps) => {
  const { reset, handleSubmit } = useFormContext<IBookingData>();

  const { derivedTotalPrice } = UseBookingSelecttions();

  const { mutateAsync, isPending } = UseCreateSpaBooking();

  const onSubmit: SubmitHandler<IBookingData> = (data) => {
    const submitData: IBookingData = {
      ...data,
      total_price: derivedTotalPrice,
    };

    mutateAsync(submitData, {
      onSuccess: (data) => {
        console.log(data);
        reset();
        toast.success('new booking created successfully');
      },
      onError: (err) => {
        console.log(err.message);
        toast.error('something went wrong');
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DrawerHeader className="  px-4 py-5 pr-12 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-text-gold)] text-white">{headerIcon}</span>
          <div className="min-w-0">
            <DrawerTitle className="text-xl text-[var(--color-text)] sm:text-2xl">{header}</DrawerTitle>
            <DrawerDescription className="mt-1 text-sm leading-6 text-[var(--color-text-sub)]">{description}</DrawerDescription>
          </div>
        </div>
      </DrawerHeader>

      <div className="min-h-0 overflow-y-auto flex-1  px-4 py-4 sm:px-6">
        <FieldGroup className="grid gap-4 md:grid-cols-2">
          <BookingCustomerSection />
          <BookingTreatmentSection />
          <BookingScheduleSection />

          <BookingPriceSection />
          <BookingNotesSection />
        </FieldGroup>
      </div>

      <BookingFooter title=" Save Booking" isLoading={isPending} />
    </form>
  );
};

export default BookingForm;
