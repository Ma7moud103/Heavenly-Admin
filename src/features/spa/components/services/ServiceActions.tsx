import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Edit3, LockKeyhole, MoreHorizontal, Trash2 } from 'lucide-react';

interface IProps {
  onEdit: () => void;
  onDelete: () => void;
  locked?: boolean;
  lockMessage?: string;
}
const ServiceActions = ({ onDelete, onEdit, locked = false, lockMessage = 'This service has booking history and is protected.' }: IProps) => {
  if (locked) {
    return (
      <button
        type="button"
        disabled
        title={lockMessage}
        aria-label={lockMessage}
        className="inline-flex cursor-not-allowed items-center gap-2 self-start rounded-lg p-2 text-(--color-text-sub) opacity-60 sm:justify-self-end"
      >
        <LockKeyhole className="size-4" />
        <span className="text-xs sm:hidden">Protected</span>
      </button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-lg p-2 transition-colors hover:bg-[--color-bg-subtle] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:justify-self-end"
          aria-label="Service actions"
        >
          <MoreHorizontal className="size-4 cursor-pointer text-[--color-text-muted]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 sm:min-w-36">
        <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
          <Edit3 className="size-4" />
          Edit Service
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={onDelete} variant="destructive">
          <Trash2 className="size-4" />
          Delete Service
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ServiceActions;
