import { useMemo } from 'react';
import UseSpaCategories from './UseSpaCategories';
import { UseSpaPackagesWithoutServices } from './UseSpaPackages';
import UseSpaServices from './UseSpaServices';

const UseCategoriesWithCounts = () => {
  const { data: spaPackagesData, isLoading: IsLoadingPackages } = UseSpaPackagesWithoutServices();
  const { data: spaCategoriesData, isLoading: IsLoadingCategories } = UseSpaCategories();

  const { data: spaServicesData, isLoading: IsLoadingServices } = UseSpaServices();

  const categoriesWithCounts = useMemo(() => {
    if (!spaCategoriesData) return [];

    return spaCategoriesData.map((category) => ({
      ...category,
      servicesCount: spaServicesData?.filter((service) => service.category_id?.id === category.id).length ?? 0,
      packagesCount: spaPackagesData?.filter((pkg) => pkg.category_id?.id === category.id).length ?? 0,
    }));
  }, [spaCategoriesData, spaServicesData, spaPackagesData]);

  return { categoriesWithCounts, spaServicesData, IsLoadingPackages, IsLoadingCategories, IsLoadingServices };
};

export default UseCategoriesWithCounts;
