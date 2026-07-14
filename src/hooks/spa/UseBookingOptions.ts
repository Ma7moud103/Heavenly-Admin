import type { SelectOption } from '@/interfaces/ISpa';
import UseSpaCustomers from './UseSpaCusteomers';
import { UseSpaPackagesWithoutServices } from './UseSpaPackages';
import UseSpaServices from './UseSpaServices';
import UseSpaTherapists from './UseSpaTherapists';
import { useMemo } from 'react';

interface IProps {
  serviceOptions: SelectOption[];
  packageOptions: SelectOption[];
  customerOptions: SelectOption[];
  therapistOptions: SelectOption[];
}
const UseBookingOptions = (): IProps => {
  const { data: services = [] } = UseSpaServices();
  const { data: packages = [] } = UseSpaPackagesWithoutServices();
  const { data: therapists = [] } = UseSpaTherapists();
  const { data: customers = [] } = UseSpaCustomers();

  const serviceOptions = useMemo<SelectOption[]>(() => services.map((service) => ({ value: service.id, label: service.name })), [services]);
  const packageOptions = useMemo<SelectOption[]>(() => packages.map((spaPackage) => ({ value: spaPackage.id, label: spaPackage.name })), [packages]);

  const customerOptions = useMemo<SelectOption[]>(
    () => customers.map((customer) => ({ value: customer.id, label: customer.full_name })),
    [customers],
  );
  const therapistOptions = useMemo<SelectOption[]>(
    () => therapists.map((therapist) => ({ value: therapist.id, label: therapist.full_name })),
    [therapists],
  );

  return { serviceOptions, packageOptions, customerOptions, therapistOptions };
};

export default UseBookingOptions;
