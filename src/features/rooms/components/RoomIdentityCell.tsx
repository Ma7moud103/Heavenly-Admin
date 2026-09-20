import type { IRoom } from '@/interfaces/IRooms';
import { BedDouble, Layers } from 'lucide-react';
import { memo } from 'react';

const RoomIdentityCell = memo(function RoomIdentityCell({ row, setSelectedRoomId }: { row: IRoom; setSelectedRoomId: (id: string | null) => void }) {
  return (
    <>
      <button
        onClick={() => {
          setSelectedRoomId(row.id);
        }}
        type="button"
        className="cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[--color-bg-inset]">
            {row.image_url ? (
              <img
                src={row.image_url}
                alt={row.title || `Room ${row.id}`}
                loading="lazy"
                decoding="async"
                fetchPriority="high"
                sizes="40px"
                className="h-full w-full object-cover"
              />
            ) : (
              <BedDouble className="h-5 w-5 text-[--color-text-sub]" />
            )}
          </div>
          <div className="min-w-0">
            <div className="truncate font-semibold">{row.title || row.id}</div>
            <div className="flex items-center gap-1 text-xs text-[--color-text-muted]">
              <Layers className="h-3 w-3" /> Capacity {row.capacity}
            </div>
          </div>
        </div>
      </button>
    </>
  );
});

export default RoomIdentityCell;
