import { Button } from '@/components/ui/button';
import { useTherapistActionsContext } from '@/stores/spa/SpaTherapistsContext';

export function AddTherapistButton() {
  const { openCreate } = useTherapistActionsContext();
  return (
    <Button
      onClick={openCreate}
      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-text-gold) p-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
    >
      Add New Therapist
    </Button>
  );
}
