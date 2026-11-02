import type { SelectOption } from '@/interfaces/ISpa';
import UseSpaCustomers from '../customers/UseSpaCusteomers';
import { UseSpaPackages } from '../packages/UseSpaPackages';
import UseSpaServices from '../services/UseSpaServices';
import UseSpaTherapists from '../therapists/UseSpaTherapists';
import { useMemo } from 'react';
import UseSpaCategories from '../categories/UseSpaCategories';

interface IProps {
  serviceOptions: SelectOption[];
  packageOptions: SelectOption[];
  customerOptions: SelectOption[];
  therapistOptions: SelectOption[];
  categoryOptions: SelectOption[];
}
const UseBookingOptions = (selectedServiceId?: string | null, selectedPackageId?: string | null): IProps => {
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
  const therapistOptions = useMemo<SelectOption[]>(() => {
    const selectedService = services.find((service) => service.id === selectedServiceId);
    const selectedPackage = packages.find((spaPackage) => spaPackage.id === selectedPackageId);
    const targetServices = selectedService ? [selectedService] : selectedPackage?.services ?? [];
    if (!targetServices.length) return [];
    const targetCategories = new Set(targetServices.map((service) => service.category_id?.name?.trim().toLowerCase()).filter(Boolean));
    const targetNames = new Set(targetServices.map((service) => service.name.trim().toLowerCase()));
    return therapists.filter((therapist) => {
      const specialty = therapist.specialty?.trim().toLowerCase();
      return Boolean(specialty && ([...targetCategories, ...targetNames].some((value) => specialty.includes(value!))));
    }).map((therapist) => ({ value: therapist.id, label: therapist.full_name }));
  }, [selectedServiceId, selectedPackageId, services, packages, therapists]);

  return { serviceOptions, packageOptions, customerOptions, therapistOptions, categoryOptions };
};

export default UseBookingOptions;
