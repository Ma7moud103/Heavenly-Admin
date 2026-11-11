import { supabase } from '@/services/supabase';
import type {
  ICreateSpaTherapist,
  Therapist,
  TherapistDailySchedule,
  TherapistDailyScheduleInput,
  TherapistService,
} from '@/interfaces/ISpa';

type TherapistRow = Omit<Therapist, 'services'> & { spa_services: TherapistService[] | null };

const therapistSelect =
  'id, full_name, phone, email, gender, avatar_url, current_availability, created_at, updated_at, spa_services!spa_therapist_services(id, name)';

function mapTherapist(row: TherapistRow): Therapist {
  const { spa_services, ...therapist } = row;
  return { ...therapist, services: spa_services ?? [] };
}

export const therapistKeys = {
  all: ['spaTherapists'] as const,

  lists: () => [...therapistKeys.all, 'list'] as const,

  details: () => [...therapistKeys.all, 'detail'] as const,

  detail: (id: string) => [...therapistKeys.details(), id] as const,

  schedules: (id: string, from: string, to: string) => [...therapistKeys.detail(id), 'schedules', from, to] as const,

  dailySchedule: (id: string, date: string) => [...therapistKeys.detail(id), 'dailySchedule', date] as const,

  daySchedules: (date: string) => [...therapistKeys.all, 'daySchedules', date] as const,

  byService: (serviceId: string) => [...therapistKeys.all, 'service', serviceId] as const,
};

export async function getTherapists(): Promise<Therapist[]> {
  const { data, error } = await supabase.from('spa_therapists').select(therapistSelect).order('full_name');
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as TherapistRow[]).map(mapTherapist);
}
export async function getTherapistById(id: string): Promise<Therapist> {
  const { data, error } = await supabase.from('spa_therapists').select(therapistSelect).eq('id', id).single();
  if (error) throw new Error(error.message);
  return mapTherapist(data as unknown as TherapistRow);
}
export async function getTherapistsByService(serviceId: string): Promise<Therapist[]> {
  const { data, error } = await supabase
    .from('spa_therapists')
    .select(
      'id, full_name, phone, email, gender, avatar_url, current_availability, created_at, updated_at, spa_services!spa_therapist_services!inner(id, name)',
    )
    .eq('spa_services.id', serviceId)
    .order('full_name');
  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as TherapistRow[]).map(mapTherapist);
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
export async function createTherapistWithSchedules(
  therapist: ICreateSpaTherapist,
  schedules: TherapistDailyScheduleInput[],
) {
  const { data, error } = await supabase.rpc('create_spa_therapist_with_schedules', {
    p_therapist: therapist,
    p_schedules: schedules,
  });
  if (error) throw new Error(error.message);
  return data as string;
}
export async function updateTherapist(id: string, therapist: ICreateSpaTherapist): Promise<void> {
  const { service_ids, ...profile } = therapist;
  const { error: profileError } = await supabase
    .from('spa_therapists')
    .update({
      ...profile,
      phone: profile.phone.trim() || null,
      email: profile.email.trim() || null,
      gender: profile.gender.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
  if (profileError) throw new Error(profileError.message);

  const { error: servicesError } = await supabase.rpc('set_spa_therapist_services', {
    p_therapist_id: id,
    p_service_ids: service_ids,
  });
  if (servicesError) throw new Error(servicesError.message);
}
export async function deleteTherapist(id: string): Promise<void> {
  const { data: bookings, error: checkError } = await supabase
    .from('spa_bookings')
    .select('id')
    .eq('therapist_id', id)
    .limit(1);
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
