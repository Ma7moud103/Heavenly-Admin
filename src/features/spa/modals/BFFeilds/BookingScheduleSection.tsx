import { DatePicker } from '@/components/ui/date-picker';
import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import SelectBox from '../../../../components/shared/SelectBox';
import { EStatus, type IBookingData, type SelectOption } from '@/interfaces/ISpa';
import { useEffect, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UseBookingSelecttions from '@/hooks/spa/bookings/UseBookingSelecttions';
import UseAvailableTherapistSlots from '@/hooks/spa/bookings/UseAvailableTherapistSlots';
import { timeNormalization } from '@/utils/dates';

const BookingScheduleSection = ({ bookingId }: { bookingId?: string }) => {
  const { control, setValue, formState: { errors } } = useFormContext<IBookingData>();
  const therapistId = useWatch({ control, name: 'therapist_id' });
  const bookingDate = useWatch({ control, name: 'booking_date' });
  const startTime = useWatch({ control, name: 'start_time' });
  const { derivedDuration } = UseBookingSelecttions();
  const { data: slots = [], isLoading, isError } = UseAvailableTherapistSlots(therapistId, bookingDate, derivedDuration, bookingId);
  const statusOptions = useMemo<SelectOption[]>(() => Object.values(EStatus).map((status) => ({ value: status, label: status.replace('_', ' ') })), []);

  useEffect(() => {
    if (isLoading) return;
    const selectedSlot = slots.find((slot) => slot.start_time === startTime);
    if (startTime && !selectedSlot) {
      setValue('start_time', '', { shouldDirty: true, shouldValidate: true });
      setValue('end_time', '', { shouldDirty: true, shouldValidate: true });
    } else if (selectedSlot) {
      setValue('end_time', selectedSlot.end_time, { shouldValidate: true });
    }
  }, [isLoading, setValue, slots, startTime]);

  return (
    <>
      <Field>
        <Label htmlFor="booking_date">Booking Date</Label>
        <Controller
          name="booking_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                setValue('start_time', '', { shouldDirty: true, shouldValidate: true });
                setValue('end_time', '', { shouldDirty: true, shouldValidate: true });
              }}
              placeholder="Pick booking date"
            />
          )}
        />
        {errors.booking_date && <FieldError>{errors.booking_date.message}</FieldError>}
      </Field>

      <SelectBox<IBookingData> label="Status" name="status" options={statusOptions} placeholder="Select status" control={control} />

      <Field>
        <Label htmlFor="booking-slot">Available appointment slot</Label>
        <Controller
          name="start_time"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value || undefined}
              onValueChange={(value) => {
                const slot = slots.find((option) => option.start_time === value);
                if (!slot) return;
                field.onChange(slot.start_time);
                setValue('end_time', slot.end_time, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
              }}
              disabled={!therapistId || !bookingDate || !derivedDuration || isLoading || isError || !slots.length}
            >
              <SelectTrigger id="booking-slot">
                <SelectValue placeholder={isLoading ? 'Loading available slots…' : 'Select an available slot'} />
              </SelectTrigger>
              <SelectContent>
                {slots.map((slot) => (
                  <SelectItem key={slot.start_time} value={slot.start_time}>
                    {timeNormalization(slot.start_time)} – {timeNormalization(slot.end_time)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.start_time && <FieldError>{errors.start_time.message}</FieldError>}
        {errors.end_time && <FieldError>{errors.end_time.message}</FieldError>}
        {!therapistId ? <p className="text-xs text-muted-foreground">Choose a therapist first.</p> : null}
        {therapistId && !bookingDate ? <p className="text-xs text-muted-foreground">Choose a date to see this therapist’s slots.</p> : null}
        {therapistId && bookingDate && !derivedDuration ? <p className="text-xs text-muted-foreground">Choose a service or package to calculate slot length.</p> : null}
        {therapistId && bookingDate && derivedDuration && !isLoading && !isError && !slots.length ? <p className="text-xs text-muted-foreground">No available slots for this therapist on the selected date.</p> : null}
        {isError ? <p className="text-xs text-destructive">Could not load this therapist’s available slots.</p> : null}
      </Field>
    </>
  );
};

export default BookingScheduleSection;