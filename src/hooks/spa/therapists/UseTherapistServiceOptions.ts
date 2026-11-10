import { useQuery } from '@tanstack/react-query';
import { getActiveTherapistServiceOptions } from '@/data/spa/Services';

export default function UseTherapistServiceOptions() {
  return useQuery({
    queryKey: ['spaTherapistServiceOptions'],
    queryFn: getActiveTherapistServiceOptions,
  });
}
