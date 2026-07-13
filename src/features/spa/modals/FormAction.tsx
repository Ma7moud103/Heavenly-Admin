import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Sparkles } from 'lucide-react';
import FormFields from './FormFields';
import ModalFooter from './ModalFooter';
import type { Control, FieldErrors, FieldNamesMarkedBoolean, SubmitHandler, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { type UseFormReset, type UseFormHandleSubmit } from 'react-hook-form';
import type { IBookingData } from '@/interfaces/ISpa';
import UseCreateSpaBooking from '@/hooks/spa/UseCreateSpaBooking';

import { toast } from 'react-toastify';
interface IProps {
  reset: UseFormReset<IBookingData>;
  handleSubmit: UseFormHandleSubmit<IBookingData>;
  register: UseFormRegister<IBookingData>;
  control: Control<IBookingData>;
  setValue: UseFormSetValue<IBookingData>;
  errors: FieldErrors<IBookingData>;
  touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<IBookingData>>>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
}
const FormAction = ({ reset, handleSubmit, control, errors, register, setValue, touchedFields, isDirty, isSubmitting, isValid }: IProps) => {
  const { mutate, isSuccess } = UseCreateSpaBooking();
  const isLoading = isSubmitting;

  const onSubmit: SubmitHandler<IBookingData> = (data) => {
    // const submitData: BookingSubmitData = {
    //   ...data,
    //   // total_price: derivedTotalPrice,
    // };

    mutate(data);
    if (isSuccess) {
      console.log('New booking data:', data);

      reset();
      toast.success('new booking created successfully');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full max-h-full flex-col">
      <DrawerHeader className="  px-4 py-5 pr-12 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-text-gold)] text-white">
            <Sparkles className="size-5" />
          </span>
          <div className="min-w-0">
            <DrawerTitle className="text-xl text-[var(--color-text)] sm:text-2xl">Create New Booking</DrawerTitle>
            <DrawerDescription className="mt-1 text-sm leading-6 text-[var(--color-text-sub)]">
              Build a spa booking with customer, treatment, therapist, date, time, status, and an automatically calculated price.
            </DrawerDescription>
          </div>
        </div>
      </DrawerHeader>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <FormFields control={control} errors={errors} register={register} setValue={setValue} touchedFields={touchedFields} />
      </div>

      <ModalFooter isDirty={isDirty} isSubmitting={isLoading} isValid={isValid} submitText="Save Booking" />
    </form>
  );
};

export default FormAction;
