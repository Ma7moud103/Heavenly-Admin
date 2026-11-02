import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTherapistSchedules, saveTherapistDailySchedule, deleteTherapistDailySchedule, therapistKeys } from '@/data/spa/Therapists';
import type { TherapistDailyScheduleInput } from '@/interfaces/ISpa';

export const useTherapistSchedules = (therapistId: string, from: string, to: string) =>
  useQuery({
    queryKey: therapistKeys.schedules(therapistId, from, to),
    queryFn: () => getTherapistSchedules(therapistId, from, to),
    enabled: Boolean(therapistId && from && to),
  });

export const useSaveTherapistSchedule = (therapistId: string, from: string, to: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (schedule: TherapistDailyScheduleInput) => saveTherapistDailySchedule(therapistId, schedule),
    onSuccess: async (_, schedule) => {
      await queryClient.invalidateQueries({ queryKey: therapistKeys.schedules(therapistId, from, to) });
      await queryClient.invalidateQueries({ queryKey: therapistKeys.dailySchedule(therapistId, schedule.schedule_date) });
    },
  });
};

export const useDeleteTherapistSchedule = (therapistId: string, from: string, to: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTherapistDailySchedule,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: therapistKeys.schedules(therapistId, from, to) });
    },
  });
};
