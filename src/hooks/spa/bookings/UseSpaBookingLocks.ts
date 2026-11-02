import { supabase } from '@/services/supabase';
import { useQuery } from '@tanstack/react-query';

interface IBookingReferences { service_id: string | null; package_id: string | null }
interface IPackageServiceReference { package_id: string; service_id: string }
const PAGE_SIZE = 1000;

const UseSpaBookingLocks = () => useQuery({
  queryKey: ['spaBookingReferences'],
  queryFn: async () => {
    const rows: IBookingReferences[] = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await supabase.from('spa_bookings').select('service_id,package_id').range(from, from + PAGE_SIZE - 1);
      if (error) throw new Error(error.message);
      const page = (data ?? []) as IBookingReferences[];
      rows.push(...page);
      if (page.length < PAGE_SIZE) break;
    }

    const packageIds = new Set(rows.flatMap((booking) => booking.package_id ? [booking.package_id] : []));
    const serviceIds = new Set(rows.flatMap((booking) => booking.service_id ? [booking.service_id] : []));
    if (packageIds.size) {
      const { data, error } = await supabase.from('spa_package_services').select('package_id,service_id').in('package_id', [...packageIds]);
      if (error) throw new Error(error.message);
      const packageServices = (data ?? []) as IPackageServiceReference[];
      for (const relation of packageServices) serviceIds.add(relation.service_id);
    }
    return { serviceIds, packageIds };
  },
});

export default UseSpaBookingLocks;