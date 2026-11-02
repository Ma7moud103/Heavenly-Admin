import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CalendarDays, Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

interface Props {
  onView: () => void;
  onEdit: () => void;
  onSchedule: () => void;
  onDelete: () => void;
  deleteLocked: boolean;
}
export default function TherapistActions({ onView, onEdit, onSchedule, onDelete, deleteLocked }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Therapist actions"
          className="rounded-lg p-2 hover:bg-(--color-bg-subtle) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onView}>
          <Eye className="size-4" /> View details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <Pencil className="size-4" /> Edit profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSchedule}>
          <CalendarDays className="size-4" /> Manage schedule
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} disabled={deleteLocked} variant="destructive">
          <Trash2 className="size-4" /> {deleteLocked ? 'Delete unavailable: has bookings' : 'Delete therapist'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
