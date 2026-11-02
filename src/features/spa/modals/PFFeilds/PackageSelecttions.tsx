import { Field, FieldError } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SelectBox from '@/components/shared/SelectBox';
import UseBookingOptions from '@/hooks/spa/bookings/UseBookingOptions';
import type { ICreatePackage } from '@/interfaces/ISpa';
import { X } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';

const PackageSelecttions = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ICreatePackage>();
  const { categoryOptions, serviceOptions } = UseBookingOptions();
  const selectedServices = useWatch({ control, name: 'services' }) ?? [];

  return (
    <>
      <SelectBox<ICreatePackage>
        control={control}
        label="Select Category"
        name="category_id"
        options={categoryOptions}
        placeholder="Select category"
      />
      <Field>
        <label className="text-sm font-medium" htmlFor="package-services">
          Select services
        </label>
        <Select
          value=""
          onValueChange={(serviceId) => {
            if (!selectedServices.includes(serviceId)) {
              setValue('services', [...selectedServices, serviceId], { shouldDirty: true, shouldTouch: true, shouldValidate: true });
            }
          }}
        >
          <SelectTrigger id="package-services" className="w-full">
            <SelectValue placeholder="Add a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions
              .filter((option) => !selectedServices.includes(option.value))
              .map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2">
          {selectedServices.map((serviceId) => {
            const service = serviceOptions.find((option) => option.value === serviceId);
            return service ? (
              <button
                key={serviceId}
                type="button"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
                onClick={() =>
                  setValue(
                    'services',
                    selectedServices.filter((id) => id !== serviceId),
                    { shouldDirty: true, shouldTouch: true, shouldValidate: true },
                  )
                }
              >
                {service.label}
                <X className="size-3" />
              </button>
            ) : null;
          })}
        </div>
        {errors.services?.message && <FieldError>{errors.services.message}</FieldError>}
      </Field>
    </>
  );
};

export default PackageSelecttions;
