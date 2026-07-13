import { useForm } from 'react-hook-form';
import { type ReactNode } from 'react';

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import { EStatus, type IBookingData } from '@/interfaces/ISpa';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormAction from './FormAction';

const schema: yup.ObjectSchema<IBookingData> = yup
  .object({
    booking_date: yup.string().required('You must pick a booking date'),

    customer_id: yup.string().required('You must select a customer'),

    start_time: yup.string().required('Please select the start time'),

    end_time: yup.string().required('Please select the end time'),

    notes: yup.string().defined(),

    package_id: yup.string().nullable().defined(),

    service_id: yup.string().nullable().defined(),

    status: yup.mixed<EStatus>().oneOf(Object.values(EStatus)).nullable().required('Please select a status'),

    therapist_id: yup.string().required('Please select a therapist'),
    total_price: yup.number().required(),
  })
  .test('service-or-package', 'You must select either a service or a package', (value) => {
    if (!value) return false;

    const hasService = !!value.service_id;
    const hasPackage = !!value.package_id;

    return hasService || hasPackage;
  });

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
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid, touchedFields },
  } = useForm<IBookingData>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="sm:max-w-2xl">
        <FormAction
          handleSubmit={handleSubmit}
          reset={reset}
          control={control}
          errors={errors}
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          isValid={isValid}
          register={register}
          setValue={setValue}
          touchedFields={touchedFields}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default BookingWindow;
