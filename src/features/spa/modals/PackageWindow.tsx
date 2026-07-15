import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import type { ReactNode } from 'react';
import { FormProvider, useForm, type DefaultValues, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { spaPackageSchema } from '@/utils/schemas';
import type { ICreatePackage } from '@/interfaces/ISpa';
import { Sparkles } from 'lucide-react';
import PackageForm from './PackageForm';

interface IProps {
  children: ReactNode;
  initialValues: DefaultValues<FieldValues>;
}

const PackageWindow = ({ children, initialValues }: IProps) => {
  // const [open, setOpen] = React.useState(false);

  const methods = useForm<ICreatePackage>({
    defaultValues: initialValues,
    resolver: yupResolver(spaPackageSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent
        className="sm:max-w-md min-h-0 overflow-y-auto"
        onPointerDownOutside={(e) => {
          // Allow closing only when the pointer is actually outside the drawer overlay area.
          // Prevent closing when interacting with Select dropdown content.
          e.preventDefault();
          // console.log(e.bubbles);
        }}
      >
        <FormProvider {...methods}>
          <PackageForm
            header="Create New Package"
            description="Build a spa package with name, description, price, active status, and category details."
            headerIcon={<Sparkles className="size-5" />}
          />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default PackageWindow;
