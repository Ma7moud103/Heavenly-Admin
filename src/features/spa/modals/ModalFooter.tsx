import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Save } from 'lucide-react';

interface IProps {
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  submitText: string;
}
const ModalFooter = ({ isDirty, isSubmitting, isValid, submitText }: IProps) => {
  return (
    <DrawerFooter className=" px-4 py-4 ">
      <DrawerClose asChild>
        <Button type="button" variant="outline" className="w-full sm:w-auto">
          Cancel
        </Button>
      </DrawerClose>

      <Button
        type="submit"
        className="w-full gap-2 bg-[var(--color-text-gold)] text-white hover:bg-[var(--color-text-gold)]/90 sm:w-auto"
        disabled={!isDirty || !isValid || isSubmitting}
      >
        <Save className="size-4" />
        {submitText}
      </Button>
    </DrawerFooter>
  );
};

export default ModalFooter;
