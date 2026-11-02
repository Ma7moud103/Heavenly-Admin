import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ICreateSpaTherapist, TherapistDailyScheduleInput } from '@/interfaces/ISpa';
import { createTherapistWithSchedules, updateTherapist, therapistKeys } from '@/data/spa/Therapists';

interface IProps {
  therapist: ICreateSpaTherapist;
  schedules?: TherapistDailyScheduleInput[];
}
export const useCreateOrEditSpaTherapist = (mode: 'create' | 'edit', id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ therapist, schedules = [] }: IProps) => {
      if (mode === 'create') return createTherapistWithSchedules(therapist, schedules);
      if (!id) throw new Error('Therapist ID is required for editing');
      return updateTherapist(id, therapist);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: therapistKeys.all });
      await queryClient.invalidateQueries({ queryKey: ['spaTherapistBookingReferences'] });
    },
  });
};
