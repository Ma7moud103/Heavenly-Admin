import SelectBox from '../../../../components/shared/SelectBox';
import { useFormContext } from 'react-hook-form';
import type { IBookingData } from '@/interfaces/ISpa';
import UseBookingOptions from '@/hooks/spa/UseBookingOptions';

const BookingCustomerSection = () => {
  const { control } = useFormContext<IBookingData>();
  const { customerOptions, therapistOptions } = UseBookingOptions();
  return (
    <>
      <SelectBox label="Customer" name="customer_id" options={customerOptions} placeholder="Select customer" control={control} />
      <SelectBox label="Therapist" name="therapist_id" options={therapistOptions} placeholder="Select therapist" control={control} />
    </>
  );
};

export default BookingCustomerSection;
