import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller, type Control, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';

interface IProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, FieldPath<TFieldValues>>;
}

const SelectBox = <TFieldValues extends FieldValues>({ label, name, options, placeholder, control, rules }: IProps<TFieldValues>) => (
  <Field key={name}>
    <Label htmlFor={name}>{label}</Label>
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Select onValueChange={field.onChange} value={field.value ?? ''}>
          <SelectTrigger id={name} className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  </Field>
);

export default SelectBox;
