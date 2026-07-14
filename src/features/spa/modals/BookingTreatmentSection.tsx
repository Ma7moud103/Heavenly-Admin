import SelectBox from './SelectBox';
import { useFormContext } from 'react-hook-form';
import type { IBookingData } from '@/interfaces/ISpa';
import { FieldError } from '@/components/ui/field';
import UseBookingOptions from '@/hooks/spa/UseBookingOptions';
import UseBookingSelecttions from '@/hooks/spa/UseBookingSelecttions';

const BookingTreatmentSection = () => {
  const { serviceOptions, packageOptions } = UseBookingOptions();
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext<IBookingData>();

  const { handlePackageChange, handleServiceChange } = UseBookingSelecttions();

  const showServicePackageError = Boolean(errors.root?.message && (touchedFields.service_id || touchedFields.package_id));

  return (
    <>
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
    </>
  );
};

export default BookingTreatmentSection;
