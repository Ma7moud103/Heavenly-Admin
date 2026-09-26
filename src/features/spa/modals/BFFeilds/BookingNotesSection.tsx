import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import type { IBookingData } from '@/interfaces/ISpa';
import { useFormContext } from 'react-hook-form';

const BookingNotesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IBookingData>();
  return (
    <>
      <Field className="md:col-span-2">
        <Label htmlFor="notes">Booking Notes</Label>
        <textarea
          id="notes"
          rows={5}
          placeholder="Add special requests or internal notes"
          className="flex min-h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register('notes')}
        />
        {errors.notes && <FieldError>{errors.notes.message}</FieldError>}
      </Field>
    </>
  );
};

export default BookingNotesSection;
