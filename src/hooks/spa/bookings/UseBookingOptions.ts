import type { SelectOption } from '@/interfaces/ISpa';
import UseSpaCustomers from '../customers/UseSpaCusteomers';
import { UseSpaPackages } from '../packages/UseSpaPackages';
import UseSpaServices from '../services/UseSpaServices';
import UseSpaTherapists from '../therapists/UseSpaTherapists';
import UseSpaTherapistsByService from '../therapists/UseSpaTherapistsByService';
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
  const { data: therapistsForService = [] } = UseSpaTherapistsByService(selectedServiceId ?? '');
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
    if (selectedServiceId) {
      return therapistsForService.map((therapist) => ({ value: therapist.id, label: therapist.full_name }));
    }

    if (!selectedPackageId) {
      return therapists.map((therapist) => ({ value: therapist.id, label: therapist.full_name }));
    }

    const selectedPackage = packages.find((spaPackage) => spaPackage.id === selectedPackageId);
    const packageServiceIds = new Set(selectedPackage?.services?.map((service) => service.id) ?? []);
    if (!packageServiceIds.size) return [];

    return therapists
      .filter((therapist) => therapist.services.some((service) => packageServiceIds.has(service.id)))
      .map((therapist) => ({ value: therapist.id, label: therapist.full_name }));
  }, [selectedServiceId, selectedPackageId, therapistsForService, therapists, packages]);

  return { serviceOptions, packageOptions, customerOptions, therapistOptions, categoryOptions };
};

export default UseBookingOptions;
