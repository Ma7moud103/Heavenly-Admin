import { Field, FieldError } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import type { ICreatePackage, IPacageInputs } from '@/interfaces/ISpa';
import { useFormContext } from 'react-hook-form';

const PackageInputs = ({ labelName, name, type, InputType }: IPacageInputs<ICreatePackage>) => {
  const {
    register,

    formState: { errors },
  } = useFormContext();

  return (
    <Field className="">
      <Label htmlFor={name}>{labelName}</Label>
      <InputType
        //   {...Field()}
        {...register(name)}
        placeholder={`Type ${labelName}`}
        {...(type ? { type } : {})}
        className="flex  w-full resize-y rounded-md px-3 py-2 text-sm  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {errors[name] && <FieldError>{`${errors[name].message}`}</FieldError>}
    </Field>
  );
};

export default PackageInputs;
