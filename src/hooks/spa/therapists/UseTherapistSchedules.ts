import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTherapistSchedules, saveTherapistDailySchedule, deleteTherapistDailySchedule, therapistKeys } from '@/data/spa/Therapists';
import type { TherapistDailyScheduleInput } from '@/interfaces/ISpa';

export const useTherapistSchedules = (therapistId: string, from: string, to: string) =>
  useQuery({
    queryKey: therapistKeys.schedules(therapistId, from, to),
    queryFn: () => getTherapistSchedules(therapistId, from, to),
    enabled: Boolean(therapistId && from && to),
  });

export const useSaveTherapistSchedule = (therapistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (schedule: TherapistDailyScheduleInput) => saveTherapistDailySchedule(therapistId, schedule),
    onSuccess: async (_, schedule) => {
      await queryClient.invalidateQueries({ queryKey: [...therapistKeys.detail(therapistId), 'schedules'] });
      await queryClient.invalidateQueries({ queryKey: therapistKeys.dailySchedule(therapistId, schedule.schedule_date) });
      await queryClient.invalidateQueries({ queryKey: therapistKeys.daySchedules(schedule.schedule_date) });
    },
  });
};

export const useDeleteTherapistSchedule = (therapistId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTherapistDailySchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [...therapistKeys.detail(therapistId), 'schedules'] });
      await queryClient.invalidateQueries({ queryKey: [...therapistKeys.all, 'daySchedules'] });
      await queryClient.invalidateQueries({ queryKey: [...therapistKeys.detail(therapistId), 'dailySchedule'] });
    },
  });
};
