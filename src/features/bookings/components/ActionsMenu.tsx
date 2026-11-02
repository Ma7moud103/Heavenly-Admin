import { Edit3, MoreHorizontal, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface BookingActionsMenuProps {
  onDelete: () => void;
  onEdit?: () => void;
}

export function ActionsMenu({ onDelete, onEdit }: BookingActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="rounded-lg p-2 transition-colors hover:bg-[--color-bg-subtle] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Booking actions">
          <MoreHorizontal className="size-4 cursor-pointer text-[--color-text-muted]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 sm:min-w-36">
        {onEdit ? <DropdownMenuItem className="cursor-pointer" onClick={onEdit}><Edit3 className="size-4" />Edit booking</DropdownMenuItem> : null}
        <DropdownMenuItem className="cursor-pointer" onClick={onDelete} variant="destructive"><Trash2 className="size-4" />Delete booking</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}