import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTherapist, therapistKeys } from '@/data/spa/Therapists';

export const useDeleteSpaTherapist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTherapist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: therapistKeys.all });
      await queryClient.invalidateQueries({ queryKey: ['spaTherapistBookingReferences'] });
    },
  });
};
