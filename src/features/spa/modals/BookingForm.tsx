import { useFormContext, type SubmitHandler } from 'react-hook-form';
import { Sparkles } from 'lucide-react';

import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { FieldGroup } from '@/components/ui/field';

import { type IBookingData } from '@/interfaces/ISpa';

import { toast } from 'react-toastify';
import BookingCustomerSection from './BookingCustomerSection';
import BookingTreatmentSection from './BookingTreatmentSection';
import BookingScheduleSection from './BookingScheduleSection';
import BookingPriceSection from './BookingPriceSection';
import BookingNotesSection from './BookingNotesSection';
import BookingFooter from './BookingFooter';
import UseCreateSpaBooking from '@/hooks/spa/UseCreateSpaBooking';
import UseBookingSelecttions from '@/hooks/spa/UseBookingSelecttions';

const BookingForm = () => {
  const { reset, handleSubmit } = useFormContext<IBookingData>();

  const { derivedTotalPrice } = UseBookingSelecttions();
  const { mutate } = UseCreateSpaBooking();

  const onSubmit: SubmitHandler<IBookingData> = (data) => {
    const submitData: IBookingData = {
      ...data,
      total_price: derivedTotalPrice,
    };

    console.log(submitData);

    mutate(data);

    reset();
    toast.success('new booking created successfully');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DrawerHeader className="  px-4 py-5 pr-12 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-text-gold)] text-white">
            <Sparkles className="size-5" />
          </span>
          <div className="min-w-0">
            <DrawerTitle className="text-xl text-[var(--color-text)] sm:text-2xl">Create New Booking</DrawerTitle>
            <DrawerDescription className="mt-1 text-sm leading-6 text-[var(--color-text-sub)]">
              Build a spa booking with customer, treatment, therapist, date, time, status, and price details.
            </DrawerDescription>
          </div>
        </div>
      </DrawerHeader>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <FieldGroup className="grid gap-4 md:grid-cols-2">
          <BookingCustomerSection />
          <BookingTreatmentSection />
          <BookingScheduleSection />

          <BookingPriceSection />
          <BookingNotesSection />
        </FieldGroup>
      </div>

      <BookingFooter />
    </form>
  );
};

export default BookingForm;
