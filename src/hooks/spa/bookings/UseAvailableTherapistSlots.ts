import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import type { TherapistDailySchedule } from '@/interfaces/ISpa';

export interface AvailableTherapistSlot {
  start_time: string;
  end_time: string;
}

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const toTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;

export default function UseAvailableTherapistSlots(therapistId: string, date: string, duration: number, bookingId?: string) {
  return useQuery({
    queryKey: ['spaAvailableTherapistSlots', therapistId, date, duration, bookingId],
    enabled: Boolean(therapistId && date && duration > 0),
    queryFn: async (): Promise<AvailableTherapistSlot[]> => {
      const [scheduleResult, bookingsResult] = await Promise.all([
        supabase
          .from('spa_therapist_daily_schedules')
          .select('*, slots:spa_therapist_daily_time_slots(start_time,end_time,slot_type)')
          .eq('therapist_id', therapistId)
          .eq('schedule_date', date)
          .maybeSingle(),
        supabase
          .from('spa_bookings')
          .select('id,start_time,end_time,status')
          .eq('therapist_id', therapistId)
          .eq('booking_date', date)
          .neq('status', 'cancelled'),
      ]);

      if (scheduleResult.error) throw new Error(scheduleResult.error.message);
      if (bookingsResult.error) throw new Error(bookingsResult.error.message);

      const schedule = scheduleResult.data as TherapistDailySchedule | null;
      if (!schedule || schedule.status !== 'working') return [];

      const shifts = schedule.slots.filter((slot) => slot.slot_type === 'shift');
      const breaks = schedule.slots.filter((slot) => slot.slot_type === 'break');
      const busy = (bookingsResult.data ?? [])
        .filter((booking) => booking.id !== bookingId)
        .map((booking) => ({ start: toMinutes(booking.start_time), end: toMinutes(booking.end_time) }));
      const slots: AvailableTherapistSlot[] = [];

      for (const shift of shifts) {
        const shiftStart = toMinutes(shift.start_time);
        const shiftEnd = toMinutes(shift.end_time);
        for (let start = shiftStart; start + duration <= shiftEnd; start += 30) {
          const end = start + duration;
          const overlapsBreak = breaks.some((slot) => start < toMinutes(slot.end_time) && end > toMinutes(slot.start_time));
          const overlapsBooking = busy.some((slot) => start < slot.end && end > slot.start);
          if (!overlapsBreak && !overlapsBooking) slots.push({ start_time: toTime(start), end_time: toTime(end) });
        }
      }

      return slots;
    },
  });
}
