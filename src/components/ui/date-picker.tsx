import * as React from 'react';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const displayFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function toDate(value?: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function toInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function DatePicker({ value, onChange, placeholder = 'Pick a date', className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const selectedDate = toDate(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" className={cn('h-9 w-full justify-start gap-2 px-3 text-left font-normal', !selectedDate && 'text-muted-foreground', className)}>
          <CalendarIcon className="size-4" />
          {selectedDate ? displayFormatter.format(selectedDate) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(20rem,calc(100vw-2rem))] p-3">
        <Calendar
          selected={selectedDate}
          onSelect={(date) => {
            onChange?.(toInputDate(date));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
