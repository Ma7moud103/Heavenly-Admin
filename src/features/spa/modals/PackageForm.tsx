import { useFormContext, type SubmitHandler } from 'react-hook-form';

import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { FieldGroup } from '@/components/ui/field';

import { type ICreatePackage, type IPacageInputs } from '@/interfaces/ISpa';

import type { ReactNode } from 'react';
import BookingFooter from './BFFeilds/BookingFooter';

import PackageInputs from './PFFeilds/PackageInputs';
import PackageSelecttions from './PFFeilds/PackageSelecttions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UseCreatePackage from '@/hooks/spa/UseCreatePackage';
import { toast } from 'react-toastify';

interface IProps {
  header: string;
  description: string;
  headerIcon: ReactNode;
}

const packageInputs: IPacageInputs<ICreatePackage>[] = [
  {
    labelName: 'Package Name',
    name: 'name',
    type: 'text',
    InputType: Input,
  },
  {
    labelName: 'Price',
    name: 'price',
    type: 'number',
    InputType: Input,
  },
  {
    labelName: 'Description',
    name: 'description',
    InputType: Textarea,
  },
];
const PackageForm = ({ header, description, headerIcon }: IProps) => {
  const { reset, handleSubmit } = useFormContext<ICreatePackage>();
  const { mutateAsync } = UseCreatePackage();

  const onSubmit: SubmitHandler<ICreatePackage> = (data) => {
    console.log(data);

    mutateAsync(
      data,

      {
        onSuccess: (data) => {
          console.log(data);
          reset();
          toast.success('new booking created successfully');
        },
        onError: (err) => {
          console.log(err.message);
          toast.error('something went wrong');
        },
      },
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DrawerHeader className="  px-4 py-5 pr-12 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-text-gold)] text-white">{headerIcon}</span>
          <div className="min-w-0">
            <DrawerTitle className="text-xl text-[var(--color-text)] sm:text-2xl">{header}</DrawerTitle>
            <DrawerDescription className="mt-1 text-sm leading-6 text-[var(--color-text-sub)]">{description}</DrawerDescription>
          </div>
        </div>
      </DrawerHeader>

      <div className="min-h-0 overflow-y-auto flex-1  px-4 py-4 sm:px-6">
        <FieldGroup className="flex flex-col gap-4 ">
          {packageInputs.map((input, i) => (
            <PackageInputs key={i} {...input} />
          ))}
          <PackageSelecttions />
        </FieldGroup>
      </div>

      <BookingFooter title="Save Package" isLoading={false} />
    </form>
  );
};

export default PackageForm;
