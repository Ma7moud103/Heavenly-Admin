import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { IBookingData } from '@/interfaces/ISpa';
import { Controller, type Control, type FieldPath } from 'react-hook-form';

interface IProps {
  name: FieldPath<IBookingData>;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  control: Control<IBookingData>;
  onChangeExtra?: (value: string) => void;
}

const SelectBox = ({ label, name, options, placeholder, control, onChangeExtra }: IProps) => (
  <Field key={name}>
    <Label htmlFor={name}>{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Select
            name={field.name}
            value={String(field.value) ?? ''}
            onValueChange={(value) => {
              field.onChange(value);
              onChangeExtra?.(value);
            }}
          >
            <SelectTrigger id={name} className="w-full" onBlur={field.onBlur} ref={field.ref}>
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

          {error && <FieldError>{error.message}</FieldError>}
        </>
      )}
    />
  </Field>
);

export default SelectBox;
