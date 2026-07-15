import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

interface IProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  options: { value: string; label: string }[];
  control: Control<T>;
  onChangeExtra?: (value: string) => void;
}

function SelectBox<T extends FieldValues>({ label, name, options, placeholder = 'Select an item', control, onChangeExtra }: IProps<T>) {
  return (
    <Field key={name}>
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              name={field.name}
              value={field.value === null || field.value === undefined ? '' : String(field.value)}
              onValueChange={(value) => {
                field.onChange(value);
                onChangeExtra?.(value);
              }}
            >
              <SelectTrigger id={name} className="w-full" ref={field.ref}>
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
}

export default SelectBox;
