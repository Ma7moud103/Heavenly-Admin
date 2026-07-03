import { PencilLine, Plus, Trash2, View } from 'lucide-react';

const baseButtonClass =
  'inline-flex items-center gap-2 rounded-xl border border-[--color-border] bg-white/80 px-4 py-2.5 text-sm font-semibold text-[--color-text] shadow-sm transition-transform hover:-translate-y-0.5';

export function SpaCrudButtons() {
  return (
    <>
      <button type="button" className={`${baseButtonClass} bg-[--color-text-gold] text-white`}>
        <Plus className="size-4" />
        Create
      </button>
      <button type="button" className={baseButtonClass}>
        <PencilLine className="size-4" />
        Edit
      </button>
      <button type="button" className={baseButtonClass}>
        <Trash2 className="size-4" />
        Delete
      </button>
      <button type="button" className={baseButtonClass}>
        <View className="size-4" />
        View
      </button>
    </>
  );
}
