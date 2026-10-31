import type { SelectOption } from '@/interfaces/ISpa';
import UseSpaCustomers from './UseSpaCusteomers';
import { UseSpaPackages } from './UseSpaPackages';
import UseSpaServices from './UseSpaServices';
import UseSpaTherapists from './UseSpaTherapists';
import { useMemo } from 'react';
import UseSpaCategories from './UseSpaCategories';

interface IProps {
  serviceOptions: SelectOption[];
  packageOptions: SelectOption[];
  customerOptions: SelectOption[];
  therapistOptions: SelectOption[];
  categoryOptions: SelectOption[];
}
const UseBookingOptions = (): IProps => {
  const { data: services = [] } = UseSpaServices();
  const { data: packages = [] } = UseSpaPackages();
  const { data: therapists = [] } = UseSpaTherapists();
  const { data: customers = [] } = UseSpaCustomers();
  const { data: categories = [] } = UseSpaCategories();
  const categoryOptions = useMemo<SelectOption[]>(() => categories.map((category) => ({ value: category.id, label: category.name })), [categories]);

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

  return { serviceOptions, packageOptions, customerOptions, therapistOptions, categoryOptions };
};

export default UseBookingOptions;
