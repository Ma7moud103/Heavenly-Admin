import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import useFindById from '@/hooks/rooms&bookings/useFindById';
import UseRooms from '@/hooks/rooms&bookings/UseRooms';

const RoomDetails = ({ selectedRoomId, setSelectedRoomId }: { selectedRoomId: string | null; setSelectedRoomId: (id: string | null) => void }) => {
  if (!selectedRoomId) return null;

  const { data: RoomsData } = UseRooms();
  const selectedRoom = useFindById(selectedRoomId, RoomsData);

  const isOpenModal = selectedRoomId !== null;

  const handleCloseModal = () => {
    setSelectedRoomId(null);
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={handleCloseModal}>
      <DialogContent className="min-w-[80vw] sm:max-w-3xl overflow-hidden rounded-2xl p-0">
        {/* Header */}
        <DialogHeader className="border-b px-6 py-5">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Room Details</span>

              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium capitalize text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                {selectedRoom?.status?.label}
              </span>
            </div>

            <DialogTitle className="truncate text-2xl font-semibold">{selectedRoom?.title}</DialogTitle>

            <DialogDescription className="mt-1">{selectedRoom?.room_type?.name}</DialogDescription>
          </div>
        </DialogHeader>

        <div className="no-scrollbar max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
              <div className="flex min-h-70 items-center justify-center rounded-2xl  ">
                {selectedRoom?.image_url ? (
                  <img
                    src={selectedRoom.image_url}
                    alt={selectedRoom.title ?? 'Room image'}
                    draggable={false}
                    className="
                    
                     max-h-75
                      max-w-full
                      rounded-xl
                      object-contain
                      select-none
                      hover:shadow-md
                      transition-all
                      duration-500
                      ease-out
                      hover:scale-[1.015]
                    "
                  />
                ) : (
                  <span className="text-sm text-muted-foreground">No image available</span>
                )}
              </div>

              {/* Room Information */}
              <section className="flex flex-col">
                <h3 className="mb-3 text-sm font-semibold">Room Information</h3>

                <div className="grid flex-1 grid-cols-2 gap-3">
                  {/* Room Type */}
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Room Type</p>

                    <p className="mt-1 truncate text-sm font-semibold">{selectedRoom?.room_type?.name}</p>
                  </div>

                  {/* Capacity */}
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Capacity</p>

                    <p className="mt-1 text-sm font-semibold">{selectedRoom?.capacity} Guests</p>
                  </div>

                  {/* Floor */}
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Floor</p>

                    <p className="mt-1 text-sm font-semibold">{selectedRoom?.floor ?? 'Not specified'}</p>
                  </div>

                  {/* Status */}
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-xs text-muted-foreground">Status</p>

                    <p className="mt-1 text-sm font-semibold capitalize">{selectedRoom?.status?.label}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* ================================================== */}
            {/* SECOND ROW — PRICING                              */}
            {/* ================================================== */}

            <section>
              <h3 className="mb-3 text-sm font-semibold">Pricing</h3>

              <div className="flex items-center justify-between rounded-xl border bg-muted/20 p-4">
                <div>
                  <p className="text-xs text-muted-foreground">Base Price</p>

                  <p className="mt-1 text-2xl font-bold">{selectedRoom?.base_price?.toLocaleString()} EGP</p>
                </div>

                <span className="rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">Per Night</span>
              </div>
            </section>

            {/* ================================================== */}
            {/* THIRD ROW — DESCRIPTION                           */}
            {/* ================================================== */}

            <section>
              <h3 className="mb-3 text-sm font-semibold">Description</h3>

              <div className="rounded-xl border bg-muted/20 p-4">
                <p className="text-sm leading-6 text-muted-foreground">{selectedRoom?.description || 'No description available.'}</p>
              </div>
            </section>

            {/* ================================================== */}
            {/* FOURTH ROW — METADATA                             */}
            {/* ================================================== */}

            <section>
              <h3 className="mb-3 text-sm font-semibold">Additional Information</h3>

              <div className="divide-y rounded-xl border">
                <div className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="text-sm text-muted-foreground">Room ID</span>

                  <span className="max-w-[60%] truncate text-xs font-medium">{selectedRoom?.id}</span>
                </div>

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-muted-foreground">Created At</span>

                  <span className="text-sm font-medium">
                    {selectedRoom?.created_at ? new Date(selectedRoom.created_at).toLocaleDateString() : '-'}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetails;
