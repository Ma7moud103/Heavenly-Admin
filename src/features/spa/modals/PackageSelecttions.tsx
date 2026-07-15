import { useFormContext } from 'react-hook-form';
import SelectBox from './SelectBox';
import UseBookingOptions from '@/hooks/spa/UseBookingOptions';
import type { ICreatePackage, SelectOption } from '@/interfaces/ISpa';

const PackageSelecttions = () => {
  const { control } = useFormContext<ICreatePackage>();
  const { categoryOptions } = UseBookingOptions();
  const ActiveStateOptions: SelectOption[] = [
    { label: 'Yes', value: 'true' },
    { label: 'No', value: 'false' },
  ];
  return (
    <>
      <SelectBox<ICreatePackage>
        control={control}
        label="Select Cateogry"
        name="category_id"
        options={categoryOptions}
        placeholder="Select Category"
      />
      <SelectBox<ICreatePackage>
        control={control}
        label="Select Active State"
        name="is_active"
        options={ActiveStateOptions}
        placeholder="Select Category"
      />
    </>
  );
};

export default PackageSelecttions;
