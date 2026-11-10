import { useQuery } from '@tanstack/react-query';
import { getTherapistsByService, therapistKeys } from '@/data/spa/Therapists';

export default function UseSpaTherapistsByService(serviceId: string) {
  return useQuery({
    queryKey: therapistKeys.byService(serviceId),
    queryFn: () => getTherapistsByService(serviceId),
    enabled: Boolean(serviceId),
    refetchInterval: 60_000,
  });
}
