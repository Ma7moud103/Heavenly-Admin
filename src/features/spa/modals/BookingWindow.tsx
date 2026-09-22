import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import BookingForm from './BookingForm';
import type { ReactNode } from 'react';
import { FormProvider, useForm, type DefaultValues, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { spaBookingSchema } from '@/utils/schemas';
import type { IBookingData } from '@/interfaces/ISpa';
import { Sparkles } from 'lucide-react';

interface IProps {
  children: ReactNode;
  initialValues: DefaultValues<FieldValues>;
}

const BookingWindow = ({ children, initialValues }: IProps) => {
  // const [open, setOpen] = React.useState(false);

  const methods = useForm<IBookingData>({
    defaultValues: initialValues,
    resolver: yupResolver(spaBookingSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="sm:max-w-2xl min-h-0 overflow-y-auto">
        <FormProvider {...methods}>
          <BookingForm
            header="Create New Booking"
            description="Build a spa booking with customer, treatment, therapist, date, time, status, and price details."
            headerIcon={<Sparkles className="size-5" />}
          />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingWindow;
