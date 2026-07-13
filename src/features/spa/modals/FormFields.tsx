import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import SelectBox from './SelectBox';
import {
  Controller,
  useWatch,
  type Control,
  type UseFormSetValue,
  type FieldErrors,
  type FieldNamesMarkedBoolean,
  type UseFormRegister,
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import UseSpaServices from '@/hooks/spa/UseSpaServices';
import { UseSpaPackagesWithoutServices } from '@/hooks/spa/UseSpaPackages';
import UseSpaTherapists from '@/hooks/spa/UseSpaTherapists';
import UseSpaCustomers from '@/hooks/spa/UseSpaCusteomers';
import { useEffect, useMemo } from 'react';
import { EStatus, type IBookingData } from '@/interfaces/ISpa';
import { DatePicker } from '@/components/ui/date-picker';

interface IProps {
  register: UseFormRegister<IBookingData>;
  control: Control<IBookingData>;
  setValue: UseFormSetValue<IBookingData>;
  errors: FieldErrors<IBookingData>;
  touchedFields: Partial<Readonly<FieldNamesMarkedBoolean<IBookingData>>>;
}
interface SelectOption {
  value: string;
  label: string;
}

const FormFields = ({ control, setValue, errors, touchedFields, register }: IProps) => {
  const { data: services = [] } = UseSpaServices();
  const { data: packages = [] } = UseSpaPackagesWithoutServices();
  const { data: therapists = [] } = UseSpaTherapists();
  const { data: customers = [] } = UseSpaCustomers();

  const customerOptions = useMemo<SelectOption[]>(
    () => customers.map((customer) => ({ value: customer.id, label: customer.full_name })),
    [customers],
  );
  const therapistOptions = useMemo<SelectOption[]>(
    () => therapists.map((therapist) => ({ value: therapist.id, label: therapist.full_name })),
    [therapists],
  );
  const serviceOptions = useMemo<SelectOption[]>(() => services.map((service) => ({ value: service.id, label: service.name })), [services]);
  const packageOptions = useMemo<SelectOption[]>(() => packages.map((spaPackage) => ({ value: spaPackage.id, label: spaPackage.name })), [packages]);

  const statusOptions = useMemo<SelectOption[]>(() => Object.values(EStatus).map((status) => ({ value: status, label: status })), []);

  const selectedServiceId = useWatch({ control, name: 'service_id' });
  const selectedPackageId = useWatch({ control, name: 'package_id' });

  const selectedService = useMemo(() => services.find((service) => service.id === selectedServiceId), [selectedServiceId, services]);
  const selectedPackage = useMemo(() => packages.find((spaPackage) => spaPackage.id === selectedPackageId), [selectedPackageId, packages]);

  const derivedTotalPrice = selectedService?.price ?? selectedPackage?.price ?? 0;

  const handleServiceChange = (serviceId: string) => {
    if (!serviceId) return;

    setValue('package_id', null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const handlePackageChange = (packageId: string) => {
    if (!packageId) return;

    setValue('service_id', null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const showServicePackageError = Boolean(errors.root?.message && (touchedFields.service_id || touchedFields.package_id));

  useEffect(() => {
    setValue('total_price', derivedTotalPrice);
  }, [selectedService?.price, selectedPackage?.price]);

  return (
    <FieldGroup className="grid gap-4 md:grid-cols-2">
      <SelectBox label="Customer" name="customer_id" options={customerOptions} placeholder="Select customer" control={control} />
      <SelectBox label="Therapist" name="therapist_id" options={therapistOptions} placeholder="Select therapist" control={control} />
      <SelectBox
        label="Service"
        name="service_id"
        options={serviceOptions}
        placeholder="Select service"
        control={control}
        onChangeExtra={handleServiceChange}
      />
      <SelectBox
        label="Package"
        name="package_id"
        options={packageOptions}
        placeholder="Select package"
        control={control}
        onChangeExtra={handlePackageChange}
      />
      {showServicePackageError ? <FieldError className="md:col-span-2">{errors.root?.message}</FieldError> : null}

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

      <Field className="text-center w-full md:col-span-2 py-2 bg-[var(--color-text-gold)]/30 rounded-2xl">
        <h1>Total Price</h1>
        <p className="text-lg font-semibold text-[var(--color-text-gold)]">{derivedTotalPrice.toLocaleString()}</p>
      </Field>

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
    </FieldGroup>
  );
};

export default FormFields;
