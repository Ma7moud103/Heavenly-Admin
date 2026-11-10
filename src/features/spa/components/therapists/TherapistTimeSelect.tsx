import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  label: string;
}

const quarterHourTimes = Array.from({ length: 96 }, (_, index) => {
  const hour = String(Math.floor(index / 4)).padStart(2, '0');
  const minute = String((index % 4) * 15).padStart(2, '0');
  return `${hour}:${minute}`;
});

export default function TherapistTimeSelect({ value, onValueChange, label }: Props) {
  const times = value && !quarterHourTimes.includes(value) ? [value, ...quarterHourTimes] : quarterHourTimes;

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger aria-label={label} className="w-full">
        <SelectValue placeholder="Choose a time" />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {times.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
