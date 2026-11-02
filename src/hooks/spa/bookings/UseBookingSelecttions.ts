import type { IBookingData } from '@/interfaces/ISpa';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import UseSpaServices from '../services/UseSpaServices';
import { UseSpaPackages } from '../packages/UseSpaPackages';

interface IReturnedValues {
  derivedTotalPrice: number;
  derivedDuration: number;
  handleServiceChange: (serviceId: string) => void;
  handlePackageChange: (packageId: string) => void;
}
const UseBookingSelecttions = (): IReturnedValues => {
  const { control, setValue } = useFormContext<IBookingData>();

  const { data: services = [] } = UseSpaServices();
  const { data: packages = [] } = UseSpaPackages();
  const selectedServiceId = useWatch({ control, name: 'service_id' });
  const selectedPackageId = useWatch({ control, name: 'package_id' });

  const selectedService = useMemo(() => services.find((service) => service.id === selectedServiceId), [selectedServiceId, services]);
  const selectedPackage = useMemo(() => packages.find((spaPackage) => spaPackage.id === selectedPackageId), [selectedPackageId, packages]);

  const derivedTotalPrice = selectedService?.price ?? selectedPackage?.price ?? 0;
  const derivedDuration = selectedService?.duration ?? selectedPackage?.services?.reduce((total, service) => total + service.duration, 0) ?? 0;

  const handleServiceChange = (serviceId: string) => {
    setValue('therapist_id', '', { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    if (!serviceId) return;

    setValue('package_id', null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

  const handlePackageChange = (packageId: string) => {
    setValue('therapist_id', '', { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    if (!packageId) return;

    setValue('service_id', null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };
  return { derivedTotalPrice, derivedDuration, handleServiceChange, handlePackageChange };
};

export default UseBookingSelecttions;
