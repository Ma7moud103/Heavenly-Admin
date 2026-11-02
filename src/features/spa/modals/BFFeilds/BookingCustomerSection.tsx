import SelectBox from '../../../../components/shared/SelectBox';
import { useFormContext, useWatch } from 'react-hook-form';
import type { IBookingData } from '@/interfaces/ISpa';
import UseBookingOptions from '@/hooks/spa/bookings/UseBookingOptions';

const BookingCustomerSection = () => {
  const { control } = useFormContext<IBookingData>();
  const serviceId = useWatch({ control, name: 'service_id' });
  const packageId = useWatch({ control, name: 'package_id' });
  const { customerOptions, therapistOptions } = UseBookingOptions(serviceId, packageId);
  return (
    <>
      <SelectBox label="Customer" name="customer_id" options={customerOptions} placeholder="Select customer" control={control} />
      <SelectBox label="Therapist" name="therapist_id" options={therapistOptions} placeholder={serviceId || packageId ? 'Select matching therapist' : 'Choose a service or package first'} control={control} />
    </>
  );
};

export default BookingCustomerSection;

