import { supabase } from '@/services/supabase';
import { useQuery } from '@tanstack/react-query';

const PAGE_SIZE = 1000;
const UseSpaTherapistBooking = () => useQuery({
  queryKey: ['spaTherapistBookingReferences'],
  queryFn: async () => {
    const ids = new Set<string>();
    for (let from = 0; ; from += PAGE_SIZE) {
      const { data, error } = await supabase.from('spa_bookings').select('therapist_id').not('therapist_id', 'is', null).range(from, from + PAGE_SIZE - 1);
      if (error) throw new Error(error.message);
      const rows = data ?? [];
      rows.forEach((row) => { if (row.therapist_id) ids.add(row.therapist_id); });
      if (rows.length < PAGE_SIZE) break;
    }
    return ids;
  },
});
export default UseSpaTherapistBooking;