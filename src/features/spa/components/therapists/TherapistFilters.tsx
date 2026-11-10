import { memo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTherapistFilterContext } from '@/stores/spa/SpaTherapistsContext';
import UseSpaTherapists from '@/hooks/spa/therapists/UseSpaTherapists';

function TherapistFilters() {
  const { search, serviceId, availability, setSearch, setServiceId, setAvailability } = useTherapistFilterContext();
  const { data: therapists } = UseSpaTherapists();
  const services = [...new Map((therapists ?? []).flatMap((therapist) => therapist.services.map((service) => [service.id, service.name] as const))).entries()]
    .sort(([, left], [, right]) => left.localeCompare(right));

    // console.log('therapists', therapists);

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
      <Select value={serviceId} onValueChange={setServiceId}>
        <SelectTrigger className="w-full" aria-label="Filter by service">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All services</SelectItem>
          {services.map(([id, name]) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={availability} onValueChange={setAvailability}>
        <SelectTrigger className="w-full" aria-label="Filter by availability">
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
