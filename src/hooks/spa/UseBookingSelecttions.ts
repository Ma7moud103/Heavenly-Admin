import type { IBookingData } from '@/interfaces/ISpa';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import UseSpaServices from './UseSpaServices';
import { UseSpaPackagesWithoutServices } from './UseSpaPackages';

interface IReturnedValues {
  derivedTotalPrice: number;
  handleServiceChange: (serviceId: string) => void;
  handlePackageChange: (packageId: string) => void;
}
const UseBookingSelecttions = (): IReturnedValues => {
  const { control, setValue } = useFormContext<IBookingData>();

  const { data: services = [] } = UseSpaServices();
  const { data: packages = [] } = UseSpaPackagesWithoutServices();
  const selectedServiceId = useWatch({ control, name: 'service_id' });
  const selectedPackageId = useWatch({ control, name: 'package_id' });

  const selectedService = useMemo(() => services.find((service) => service.id === selectedServiceId), [selectedServiceId, services]);
  const selectedPackage = useMemo(() => packages.find((spaPackage) => spaPackage.id === selectedPackageId), [selectedPackageId, packages]);

  const derivedTotalPrice = selectedService?.price ?? selectedPackage?.price ?? 0;

  const handleServiceChange = (serviceId: string) => {
    if (!serviceId) return;

    setValue('package_id', null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const handlePackageChange = (packageId: string) => {
    if (!packageId) return;

    setValue('service_id', null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };
  return { derivedTotalPrice, handleServiceChange, handlePackageChange };
};

export default UseBookingSelecttions;
