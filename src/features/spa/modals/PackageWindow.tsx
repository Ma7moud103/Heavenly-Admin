import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { spaPackageSchema } from '@/utils/schemas';
import type { ICreatePackage, ISpaPackages } from '@/interfaces/ISpa';
import { Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import PackageForm from './PackageForm';

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'create' | 'edit';
  packageItem?: ISpaPackages;
}

const emptyValues: ICreatePackage = { category_id: '', description: '', is_active: true, name: '', price: null, services: [] };

const PackageWindow = ({ open, onOpenChange, mode, packageItem }: IProps) => {
  const methods = useForm<ICreatePackage>({ defaultValues: emptyValues, resolver: yupResolver(spaPackageSchema), mode: 'onTouched' });

  useEffect(() => {
    if (!open) return;
    methods.reset(mode === 'edit' && packageItem ? {
      name: packageItem.name,
      description: packageItem.description,
      price: packageItem.price,
      is_active: packageItem.is_active,
      category_id: packageItem.category_id?.id ?? '',
      services: packageItem.services?.map((service) => service.id) ?? [],
    } : emptyValues);
  }, [open, mode, packageItem, methods]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="sm:max-w-md min-h-0 overflow-y-auto rounded-none">
        <FormProvider {...methods}>
          <PackageForm
            mode={mode}
            packageId={packageItem?.id}
            onSaved={() => onOpenChange(false)}
            headerIcon={<Sparkles className="size-5" />}
          />
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default PackageWindow;