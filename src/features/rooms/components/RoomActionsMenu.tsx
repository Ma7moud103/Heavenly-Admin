import { Edit3, MoreHorizontal, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface IProps {
  onDelete: () => void
  onEdit: () => void
}

export function RoomActionsMenu({ onDelete, onEdit }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="rounded-lg p-2 transition-colors hover:bg-[--color-bg-subtle] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Room actions"
        >
          <MoreHorizontal className="h-4 w-4 text-[--color-text-muted]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 sm:min-w-36">
        <DropdownMenuItem onClick={onEdit}>
          <Edit3 className="h-4 w-4" />
          Edit room
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete} variant="destructive">
          <Trash2 className="h-4 w-4" />
          Delete room
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
