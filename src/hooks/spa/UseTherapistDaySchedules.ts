import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import type { TherapistDailySchedule } from '@/interfaces/ISpa';

export default function UseTherapistDaySchedules(date: string) {
  return useQuery({
    queryKey: ['spaTherapistDaySchedules', date],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spa_therapist_daily_schedules')
        .select('*, slots:spa_therapist_daily_time_slots(*)')
        .eq('schedule_date', date);
      if (error) throw new Error(error.message);
      return (data ?? []) as TherapistDailySchedule[];
    },
    enabled: Boolean(date),
  });
}
