import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Controller, useFormContext } from 'react-hook-form';
import SelectBox from './SelectBox';
import { Input } from '@/components/ui/input';
import { EStatus, type IBookingData, type SelectOption } from '@/interfaces/ISpa';
import { useMemo } from 'react';

const BookingScheduleSection = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<IBookingData>();
  const statusOptions = useMemo<SelectOption[]>(() => Object.values(EStatus).map((status) => ({ value: status, label: status })), []);
  return (
    <>
      <Field>
        <Label htmlFor="booking_date">Booking Date</Label>
        <Controller
          name="booking_date"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <DatePicker value={field.value} onChange={field.onChange} placeholder="Pick booking date" />
              {error && <FieldError>{error.message}</FieldError>}
            </>
          )}
        />
      </Field>

      <SelectBox label="Status" name="status" options={statusOptions} placeholder="Select status" control={control} />

      <Field>
        <Label htmlFor="start_time">Start Time</Label>
        <Input id="start_time" type="time" {...register('start_time')} />
        {errors.start_time && <FieldError>{errors.start_time.message}</FieldError>}
      </Field>

      <Field>
        <Label htmlFor="end_time">End Time</Label>
        <Input id="end_time" type="time" {...register('end_time')} />
        {errors.end_time && <FieldError>{errors.end_time.message}</FieldError>}
      </Field>
    </>
  );
};

export default BookingScheduleSection;
