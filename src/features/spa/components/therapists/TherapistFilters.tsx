import { memo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTherapistFilterContext, useTherapistRosterContext } from '@/stores/spa/SpaTherapistsContext';

function TherapistFilters() {
  const { search, specialty, availability, setSearch, setSpecialty, setAvailability } = useTherapistFilterContext();
  const { specialties } = useTherapistRosterContext();
  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_0.75fr_0.75fr]">
      <div className="relative">
        <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name, phone, or email"
          aria-label="Search therapists"
          className="pl-9"
        />
      </div>
      <Select value={specialty} onValueChange={setSpecialty}>
        <SelectTrigger aria-label="Filter by specialty">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All specialties</SelectItem>
          {specialties.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={availability} onValueChange={setAvailability}>
        <SelectTrigger aria-label="Filter by availability">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All availability</SelectItem>
          <SelectItem value="on">On duty</SelectItem>
          <SelectItem value="break">On break</SelectItem>
          <SelectItem value="off">Off duty</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
export default memo(TherapistFilters);
