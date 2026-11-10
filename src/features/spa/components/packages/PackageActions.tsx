import type { ISpaPackages } from "@/interfaces/ISpa";
import { LockKeyhole, PencilLine, Trash2 } from "lucide-react";

interface IPackageActionsProps {
  item: ISpaPackages;
  locked: boolean;
  lockMessage: string;
  onEdit: (item: ISpaPackages) => void;
  onDelete: (item: ISpaPackages) => void;
}
const PackageActions = ({ item, locked, lockMessage, onEdit, onDelete }: IPackageActionsProps) => (
  <div className="flex items-center justify-end gap-1">
    {locked ? (
      <span title={lockMessage} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
        <LockKeyhole className="size-4" />
        Protected
      </span>
    ) : (
      <>
        <button
          type="button"
          onClick={() => onEdit(item)}
          title="Edit package"
          aria-label={`Edit ${item.name}`}
          className="rounded-lg p-2 text-[var(--color-text-sub)] transition-colors hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PencilLine className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(item)}
          title="Delete package"
          aria-label={`Delete ${item.name}`}
          className="rounded-lg p-2 text-[var(--color-error)] transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Trash2 className="size-4" />
        </button>
      </>
    )}
  </div>
);

export default PackageActions;