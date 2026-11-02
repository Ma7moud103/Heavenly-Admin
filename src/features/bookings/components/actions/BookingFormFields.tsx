import { CalendarDays, Hotel, User } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { IBookingStatus } from '@/interfaces/IBooking';
import type { IRoom } from '@/interfaces/IRooms';
import type { BookingFormState } from '@/features/bookings/bookingForm';
import { calculateBookingNights, calculateBookingTotal } from '@/features/bookings/bookingForm';
import { formatCurrency } from '@/lib/utils';
import type { IGuest } from '@/interfaces/IGuest';

interface BookingFormFieldsProps {
  form: BookingFormState;
  errors: Partial<Record<keyof BookingFormState, string>>;
  rooms: IRoom[];
  guests: IGuest[];
  statuses: IBookingStatus[];
  onChange: <K extends keyof BookingFormState>(field: K, value: BookingFormState[K]) => void;
}

export function BookingFormFields({ form, errors, rooms, guests, statuses, onChange }: BookingFormFieldsProps) {
  const nights = calculateBookingNights(form.check_in, form.check_out);
  const total = calculateBookingTotal(form, rooms);

  return (
    <div className="grid gap-5 px-4 pb-6">
      <label className="grid gap-2 text-sm text-[--color-text-sub]">
        <span className="flex items-center gap-2 font-medium text-[--color-text]"><Hotel className="size-4" />Available room</span>
        <Select value={form.room_id || undefined} onValueChange={(value) => onChange('room_id', value)}>
          <SelectTrigger className="w-full bg-background"><SelectValue placeholder="Choose an available room" /></SelectTrigger>
          <SelectContent>
            {rooms.map((room) => <SelectItem key={room.id} value={room.id}>{room.title || room.id} · {room.room_type?.name || 'Room'} · {formatCurrency(Number(room.base_price || 0))}/night</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.room_id ? <span className="text-xs text-[--color-error]">{errors.room_id}</span> : null}
        <span className="text-xs text-[--color-text-muted]">{rooms.length} room{rooms.length === 1 ? '' : 's'} available for these dates</span>
      </label>

      <label className="grid gap-2 text-sm text-[--color-text-sub]">
        <span className="flex items-center gap-2 font-medium text-[--color-text]"><User className="size-4" />Guest</span>
        <Select value={form.guest_id === '' ? undefined : String(form.guest_id)} onValueChange={(value) => onChange('guest_id', Number(value))}>
          <SelectTrigger className="w-full bg-background"><SelectValue placeholder="Choose a guest" /></SelectTrigger>
          <SelectContent>{guests.map((guest) => <SelectItem key={guest.id} value={String(guest.id)}>{guest.first_name} {guest.last_name}</SelectItem>)}</SelectContent>
        </Select>
        {errors.guest_id ? <span className="text-xs text-[--color-error]">{errors.guest_id}</span> : null}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-[--color-text-sub]">
          <span className="flex items-center gap-2 font-medium text-[--color-text]"><CalendarDays className="size-4" />Check-in</span>
          <DatePicker value={form.check_in} onChange={(value) => onChange('check_in', value)} placeholder="Select check-in" />
          {errors.check_in ? <span className="text-xs text-[--color-error]">{errors.check_in}</span> : null}
        </label>
        <label className="grid gap-2 text-sm text-[--color-text-sub]">
          <span className="flex items-center gap-2 font-medium text-[--color-text]"><CalendarDays className="size-4" />Check-out</span>
          <DatePicker value={form.check_out} onChange={(value) => onChange('check_out', value)} placeholder="Select check-out" />
          {errors.check_out ? <span className="text-xs text-[--color-error]">{errors.check_out}</span> : null}
        </label>
      </div>

      <label className="grid gap-2 text-sm text-[--color-text-sub]">
        <span className="font-medium text-[--color-text]">Booking status</span>
        <Select value={form.status_id || undefined} onValueChange={(value) => onChange('status_id', value)}>
          <SelectTrigger className="w-full bg-background"><SelectValue placeholder="Select status" /></SelectTrigger>
          <SelectContent>{statuses.map((status) => <SelectItem key={status.id} value={String(status.id)}>{status.label || status.name}</SelectItem>)}</SelectContent>
        </Select>
        {errors.status_id ? <span className="text-xs text-[--color-error]">{errors.status_id}</span> : null}
        {statuses.some((status) => status.name === 'cancelled') && statuses.length < 5 ? <span className="text-xs text-[--color-text-muted]">Status can only move forward or be cancelled.</span> : null}
      </label>

      <div className="rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] p-4">
        <div className="flex items-center justify-between gap-3 text-sm"><span className="text-[--color-text-sub]">Stay length</span><span className="font-semibold text-[--color-text]">{nights > 0 ? nights + ' night' + (nights > 1 ? 's' : '') : '—'}</span></div>
        <div className="mt-2 flex items-center justify-between gap-3 text-sm"><span className="text-[--color-text-sub]">Estimated total</span><span className="font-semibold text-[--color-text-gold]">{total > 0 ? formatCurrency(total) : '—'}</span></div>
      </div>
    </div>
  );
}