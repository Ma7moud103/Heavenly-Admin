import { useFormContext, type SubmitHandler } from 'react-hook-form';
import { DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { FieldGroup } from '@/components/ui/field';
import type { ICreatePackage, IPacageInputs } from '@/interfaces/ISpa';
import type { ReactNode } from 'react';
import BookingFooter from './BFFeilds/BookingFooter';
import PackageInputs from './PFFeilds/PackageInputs';
import PackageSelecttions from './PFFeilds/PackageSelecttions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import UseCreatePackage from '@/hooks/spa/packages/UseCreatePackage';
import { toast } from 'react-toastify';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';

interface IProps {
  mode: 'create' | 'edit';
  packageId?: string;
  onSaved: () => void;
  headerIcon: ReactNode;
}
const packageInputs: IPacageInputs<ICreatePackage>[] = [
  { labelName: 'Package Name', name: 'name', type: 'text', InputType: Input },
  { labelName: 'Price', name: 'price', type: 'number', InputType: Input },
  { labelName: 'Description', name: 'description', InputType: Textarea },
];

const PackageForm = ({ mode, packageId, onSaved, headerIcon }: IProps) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<ICreatePackage>();
  const { mutateAsync, isPending } = UseCreatePackage(packageId);

  const onSubmit: SubmitHandler<ICreatePackage> = async (data) => {
    try {
      await mutateAsync(data);
      toast.success(mode === 'edit' ? 'Package updated successfully' : 'Package created successfully');
      reset();
      onSaved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save package');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DrawerHeader className="px-4 py-5 pr-12 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-text-gold)] text-white">{headerIcon}</span>
          <div className="min-w-0">
            <DrawerTitle className="text-xl text-[var(--color-text)] sm:text-2xl">
              {mode === 'edit' ? 'Edit Package' : 'Create New Package'}
            </DrawerTitle>
            <DrawerDescription className="mt-1 text-sm leading-6 text-[var(--color-text-sub)]">
              Set the package price, category, and included services.
            </DrawerDescription>
          </div>
        </div>
      </DrawerHeader>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <FieldGroup className="flex flex-col gap-4">
          {packageInputs.map((input) => (
            <PackageInputs key={input.name} {...input} />
          ))}
          <PackageSelecttions />
          <Controller
            name="is_active"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] p-3 text-sm font-medium">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} aria-label="Package is active" />
                <span>Active package</span>
              </label>
            )}
          />
        </FieldGroup>
      </div>
      <BookingFooter title={mode === 'edit' ? 'Save Changes' : 'Create Package'} isLoading={isPending || isSubmitting} />
    </form>
  );
};

export default PackageForm;
