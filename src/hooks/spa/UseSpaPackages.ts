import { getSpaPackages, getSpaPackagesWithoutServices } from '@/data/spa/Packages';
import type { ISpaPackages, ISpaPackageServices } from '@/interfaces/ISpa';
import { useQuery } from '@tanstack/react-query';

const UseSpaPackages = () => {
  return useQuery<ISpaPackageServices[]>({
    queryKey: ['spaPackages'],
    queryFn: async () => {
      const { data, error } = await getSpaPackages();

      const packagesWithItsServices = Object.values(
        (data ?? []).reduce(
          (acc, row) => {
            const pkg = row.package_id;

            if (!acc[pkg.id]) {
              acc[pkg.id] = {
                ...pkg,
                services: [],
              };
            }

            acc[pkg.id].services.push(row.service_id);

            return acc;
          },
          {} as Record<string, any>,
        ),
      );

      if (error) {
        throw new Error(error.message);
      }

      return packagesWithItsServices ?? [];
    },
  });
};

const UseSpaPackagesWithoutServices = () => {
  return useQuery<ISpaPackages[]>({
    queryKey: ['spaPackagesWithoutServices'],
    queryFn: async () => {
      const { data, error } = await getSpaPackagesWithoutServices();

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
  });
};

export { UseSpaPackages, UseSpaPackagesWithoutServices };
