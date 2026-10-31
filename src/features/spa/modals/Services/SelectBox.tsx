import SelectBox from '@/components/shared/SelectBox';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import UseSpaCategories from '@/hooks/spa/UseSpaCategories';
import type { ICreateSpaService } from '@/interfaces/ISpa';
import type { Control, FieldValues } from 'react-hook-form';
interface IProps<T extends FieldValues> {
  control: Control<T>;
  //   defaultValue?: string;
}
const SelectBoxField = ({ control }: IProps<ICreateSpaService>) => {
  const { data: Categories, isLoading, isError } = UseSpaCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading categories.</div>;
  }

  if (!Categories || Categories.length === 0) {
    return <div>No categories found.</div>;
  }

  return (
    <SelectBox
      //   defaultValue={defaultValue}
      options={Categories.map((category) => ({ value: category.id, label: category.name }))}
      name="category_id"
      label="Category"
      placeholder="Select a category"
      control={control}
    />
  );
};

export default SelectBoxField;
