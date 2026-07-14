import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import BookingForm from './BookingForm';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { spaBookingSchema } from '@/utils/schemas';
import type { IBookingData } from '@/interfaces/ISpa';
const initialValues: IBookingData = {
  booking_date: '',
  customer_id: '',
  end_time: '',
  notes: '',
  package_id: null,
  service_id: null,
  start_time: '',
  status: null,
  therapist_id: '',
  total_price: 0,
};

const BookingWindow = ({ children }: { children: ReactNode }) => {
  const methods = useForm<IBookingData>({
    defaultValues: initialValues,
    resolver: yupResolver(spaBookingSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="sm:max-w-2xl">
        <FormProvider {...methods}>
          <BookingForm />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingWindow;
