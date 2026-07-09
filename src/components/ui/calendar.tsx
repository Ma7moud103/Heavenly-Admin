import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

const weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

function isSameDate(first?: Date, second?: Date) {
  return (
    !!first &&
    !!second &&
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days: Array<Date | null> = Array.from({ length: firstDay }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
}

function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [monthDate, setMonthDate] = React.useState(() => selected ?? new Date());
  const days = getMonthDays(monthDate);
  const today = new Date();

  React.useEffect(() => {
    if (selected) setMonthDate(selected);
  }, [selected]);

  return (
    <div data-slot="calendar" className={cn('space-y-4 rounded-lg bg-popover text-popover-foreground', className)}>
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
        >
          <ChevronLeft />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="text-sm font-semibold text-foreground">{monthFormatter.format(monthDate)}</div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setMonthDate((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
        >
          <ChevronRight />
          <span className="sr-only">Next month</span>
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {weekdayLabels.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) =>
          date ? (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => onSelect?.(date)}
              className={cn(
                'flex aspect-square items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isSameDate(date, selected) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                isSameDate(date, today) && !isSameDate(date, selected) && 'ring-1 ring-[var(--color-text-gold)]',
              )}
            >
              {date.getDate()}
            </button>
          ) : (
            <div key={`blank-${index}`} className="aspect-square" />
          ),
        )}
      </div>
    </div>
  );
}

export { Calendar };
