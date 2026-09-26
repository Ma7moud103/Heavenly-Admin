import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import UseBookingSelecttions from '@/hooks/spa/UseBookingSelecttions';
import type { IBookingData } from '@/interfaces/ISpa';
import { useFormContext } from 'react-hook-form';

const BookingPriceSection = () => {
  const { register } = useFormContext<IBookingData>();

  const { derivedTotalPrice } = UseBookingSelecttions();
  return (
    <Field className="">
      <h1>Total Price</h1>
      <Input disabled type="number" value={derivedTotalPrice} {...register('total_price')} className="" />
    </Field>
  );
};

export default BookingPriceSection;
