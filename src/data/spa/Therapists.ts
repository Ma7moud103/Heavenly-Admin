import { supabase } from '@/services/supabase';
import type { ICreateSpaTherapist, ISpaTherapists, TherapistDailySchedule, TherapistDailyScheduleInput } from '@/interfaces/ISpa';

export const therapistKeys = {
  all: ['spaTherapists'] as const,

  lists: () => [...therapistKeys.all, 'list'] as const,

  details: () => [...therapistKeys.all, 'detail'] as const,

  detail: (id: string) => [...therapistKeys.details(), id] as const,

  schedules: (id: string, from: string, to: string) => [...therapistKeys.detail(id), 'schedules', from, to] as const,

  dailySchedule: (id: string, date: string) => [...therapistKeys.detail(id), 'dailySchedule', date] as const,

  daySchedules: (date: string) => [...therapistKeys.all, 'daySchedules', date] as const,
};

export async function getTherapists(): Promise<ISpaTherapists[]> {
  const { data, error } = await supabase.from('spa_therapists').select('*').order('full_name');
  if (error) throw new Error(error.message);
  return (data ?? []) as ISpaTherapists[];
}
export async function getTherapistById(id: string): Promise<ISpaTherapists> {
  const { data, error } = await supabase.from('spa_therapists').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data as ISpaTherapists;
}
export async function getTherapistSchedules(id: string, from: string, to: string): Promise<TherapistDailySchedule[]> {
  const { data, error } = await supabase
    .from('spa_therapist_daily_schedules')
    .select('*, slots:spa_therapist_daily_time_slots(*)')
    .eq('therapist_id', id)
    .gte('schedule_date', from)
    .lte('schedule_date', to)
    .order('schedule_date');
  if (error) throw new Error(error.message);
  return (data ?? []) as TherapistDailySchedule[];
}
export async function getTherapistDailySchedule(id: string, date: string): Promise<TherapistDailySchedule | null> {
  const { data, error } = await supabase
    .from('spa_therapist_daily_schedules')
    .select('*, slots:spa_therapist_daily_time_slots(*)')
    .eq('therapist_id', id)
    .eq('schedule_date', date)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as TherapistDailySchedule | null;
}
export async function createTherapistWithSchedules(therapist: ICreateSpaTherapist, schedules: TherapistDailyScheduleInput[]) {
  const { data, error } = await supabase.rpc('create_spa_therapist_with_schedules', { p_therapist: therapist, p_schedules: schedules });
  if (error) throw new Error(error.message);
  return data as string;
}
export async function updateTherapist(id: string, therapist: ICreateSpaTherapist) {
  const { data, error } = await supabase
    .from('spa_therapists')
    .update({
      ...therapist,
      phone: therapist.phone.trim() || null,
      email: therapist.email.trim() || null,
      gender: therapist.gender.trim() || null,
      specialty: therapist.specialty.trim() || null,
      shift_from: therapist.shift_from || null,
      shift_to: therapist.shift_to || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as ISpaTherapists;
}
export async function deleteTherapist(id: string): Promise<void> {
  const { data: bookings, error: checkError } = await supabase.from('spa_bookings').select('id').eq('therapist_id', id).limit(1);
  if (checkError) throw new Error('Could not verify therapist bookings: ' + checkError.message);
  if (bookings?.length) throw new Error('This therapist has booking history and cannot be deleted.');
  const { error } = await supabase.from('spa_therapists').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
export async function saveTherapistDailySchedule(id: string, schedule: TherapistDailyScheduleInput): Promise<string> {
  const { data, error } = await supabase.rpc('save_spa_therapist_daily_schedule', {
    p_therapist_id: id,
    p_schedule_date: schedule.schedule_date,
    p_status: schedule.status,
    p_notes: schedule.notes,
    p_slots: schedule.slots,
  });
  if (error) throw new Error(error.message);
  return data as string;
}
export async function deleteTherapistDailySchedule(id: string): Promise<void> {
  const { error } = await supabase.from('spa_therapist_daily_schedules').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
