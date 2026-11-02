import { useMemo, useState, type FormEvent } from 'react';
import { Edit3, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

import type { RoomTypePayload } from '@/data/rooms&bookings/createRoomType';
import UseCreateRoomType from '@/hooks/rooms&bookings/UseCreateRoomType';
import UseDeleteRoomType from '@/hooks/rooms&bookings/UseDeleteRoomType';
import UseUpdateRoomType from '@/hooks/rooms&bookings/UseUpdateRoomType';
import UseRoomsTypes from '@/hooks/rooms&bookings/UseRoomsTypes';
import type { IRoomsTypes } from '@/interfaces/IRooms';
import ModalRoomType from '@/features/rooms/room-types/ModalRoomType';
import DeleteRoomTypeModal from '@/features/rooms/room-types/DeleteRoomTypeModal';
import { formatCurrency } from '@/lib/utils';

const initialValue: RoomTypePayload = { name: '', price: 0 };

const RoomSettings = () => {
  const { data: roomTypes = [], isLoading, isError, error } = UseRoomsTypes();
  const createMutation = UseCreateRoomType();
  const updateMutation = UseUpdateRoomType();
  const deleteMutation = UseDeleteRoomType();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<IRoomsTypes | null>(null);
  const [form, setForm] = useState<RoomTypePayload>(initialValue);
  const [formError, setFormError] = useState('');

  const sortedTypes = useMemo(() => [...roomTypes].sort((a, b) => a.name.localeCompare(b.name)), [roomTypes]);
  const isSaving = createMutation.isPending || updateMutation.isPending;

  const openCreate = () => {
    setSelectedType(null);
    setForm(initialValue);
    setFormError('');
    setFormOpen(true);
  };

  const openEdit = (roomType: IRoomsTypes) => {
    setSelectedType(roomType);
    setForm({ name: roomType.name, price: roomType.price });
    setFormError('');
    setFormOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = form.name.trim();

    if (!name || form.price <= 0) {
      setFormError('Enter a room type name and a base price greater than zero.');
      return;
    }

    try {
      const payload = { name, price: form.price };
      if (selectedType?.id) {
        await updateMutation.mutateAsync({ roomTypeId: selectedType.id, payload });
        toast.success('Room type updated successfully');
      } else {
        await createMutation.mutateAsync(payload);
        toast.success('Room type created successfully');
      }
      setFormOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to save this room type.');
    }
  };

  const confirmDelete = async () => {
    if (!selectedType?.id) return;

    try {
      await deleteMutation.mutateAsync(selectedType.id);
      toast.success('Room type deleted successfully');
      setDeleteOpen(false);
      setSelectedType(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to delete this room type.');
    }
  };

  return (
    <main className="space-y-4 sm:space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] p-4 sm:flex-row sm:items-end sm:justify-between sm:p-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-primary">Room configuration</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Room types</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Set the default nightly price for each accommodation category. New rooms can inherit these prices.
          </p>
        </div>
        <Button type="button" onClick={openCreate} className="w-full sm:w-auto">
          <Plus /> Create room type
        </Button>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[--color-border] bg-background">
        <div className="flex items-center justify-between border-b border-[--color-border] px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold">All room types</h2>
            <p className="text-sm text-muted-foreground">
              {sortedTypes.length} configured type{sortedTypes.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        {isLoading ? <p className="px-5 py-12 text-center text-sm text-muted-foreground">Loading room types…</p> : null}
        {isError ? <p className="px-5 py-12 text-center text-sm text-destructive">{error.message}</p> : null}
        {!isLoading && !isError && sortedTypes.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium">No room types yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Create your first type to start organizing rooms and their default rates.</p>
          </div>
        ) : null}
        {!isLoading && !isError && sortedTypes.length > 0 ? (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-160">
              <thead className="border-b border-[--color-border] bg-muted/30">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room type</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Base price</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rooms</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedTypes.map((roomType) => (
                  <tr key={roomType.id ?? roomType.name} className="border-b border-[--color-border-subtle] last:border-0 hover:bg-muted/30">
                    <td className="px-5 py-4 font-medium">{roomType.name}</td>
                    <td className="px-5 py-4">
                      {formatCurrency(roomType.price)} <span className="text-xs text-muted-foreground">/ night</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{roomType.count ?? 0}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => openEdit(roomType)}>
                          <Edit3 /> Edit
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setSelectedType(roomType);
                            setDeleteOpen(true);
                          }}
                        >
                          <Trash2 /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {!isLoading && !isError && sortedTypes.length > 0 ? (
          <div className="space-y-3 p-3 md:hidden">
            {sortedTypes.map((roomType) => (
              <article key={roomType.id ?? roomType.name} className="rounded-xl border border-[--color-border] bg-muted/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 truncate font-semibold">{roomType.name}</h3>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {roomType.count ?? 0} rooms
                  </span>
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Base price</p>
                    <p className="mt-1 font-semibold">
                      {formatCurrency(roomType.price)} <span className="text-xs font-normal text-muted-foreground">/ night</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-[--color-border-subtle] pt-3">
                  <Button type="button" size="sm" variant="outline" onClick={() => openEdit(roomType)}>
                    <Edit3 /> Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      setSelectedType(roomType);
                      setDeleteOpen(true);
                    }}
                  >
                    <Trash2 /> Delete
                  </Button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <ModalRoomType
        open={formOpen}
        onOpenChange={setFormOpen}
        roomType={selectedType}
        onSave={handleSubmit}
        form={form}
        setForm={setForm}
        formError={formError}
        isSaving={isSaving}
      />
      <DeleteRoomTypeModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        selectedType={selectedType}
        confirmDelete={confirmDelete}
        deleteMutation={deleteMutation}
      />
    </main>
  );
};

export default RoomSettings;
