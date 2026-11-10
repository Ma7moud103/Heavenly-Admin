import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
import { Save } from 'lucide-react';
import { memo } from 'react';

const BookingFooter = ({ isLoading, title }: { isLoading: boolean; title: string }) => {
  return (
    <DrawerFooter className=" px-4 py-4 ">
      <DrawerClose asChild>
        <Button
          disabled={isLoading}
          type="button"
          variant="outline"
          className={'w-full sm:w-auto transition-opacity ' + (isLoading ? 'opacity-60 cursor-not-allowed' : 'opacity-100')}
        >
          Cancel
        </Button>
      </DrawerClose>
      <Button
        disabled={isLoading}
        type="submit"
        className={
          'w-full gap-2 bg-[var(--color-text-gold)] text-white hover:bg-[var(--color-text-gold)]/90 sm:w-auto transition-all ' +
          (isLoading ? 'opacity-70 cursor-not-allowed' : 'opacity-100')
        }
      >
        <Save className={'size-4 ' + (isLoading ? 'animate-spin' : '')} />
        {title}
      </Button>
    </DrawerFooter>
  );
};

export default memo(BookingFooter);
