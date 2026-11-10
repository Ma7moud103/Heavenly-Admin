import { useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import TherapistServiceBadges from '@/features/spa/components/therapists/TherapistServiceBadges';
import UseTherapistServiceOptions from '@/hooks/spa/therapists/UseTherapistServiceOptions';
import type { TherapistService } from '@/interfaces/ISpa';

interface Props {
  existingServices?: TherapistService[];
}

interface FormValues {
  service_ids: string[];
}

export default function TherapistServicesSelect({ existingServices = [] }: Props) {
  const { data: serviceOptions = [], isLoading, isError } = UseTherapistServiceOptions();
  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<FormValues>();
  const serviceIds = useWatch({ control, name: 'service_ids' }) ?? [];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const availableServices = useMemo(() => {
    const options = new Map(serviceOptions.map((service) => [service.id, service]));
    existingServices.forEach((service) => {
      if (!options.has(service.id)) options.set(service.id, { ...service, category_name: 'Inactive service' });
    });
    return [...options.values()].sort(
      (left, right) => left.category_name.localeCompare(right.category_name) || left.name.localeCompare(right.name),
    );
  }, [existingServices, serviceOptions]);

  const selectedServices = useMemo(
    () => availableServices.filter((service) => serviceIds.includes(service.id)),
    [availableServices, serviceIds],
  );
  const groupedOptions = useMemo(() => {
    const groups = new Map<string, typeof availableServices>();
    const term = search.trim().toLowerCase();
    availableServices
      .filter(
        (service) =>
          !term || service.name.toLowerCase().includes(term) || service.category_name.toLowerCase().includes(term),
      )
      .forEach((service) => {
        const group = groups.get(service.category_name) ?? [];
        group.push(service);
        groups.set(service.category_name, group);
      });
    return [...groups.entries()].sort(([left], [right]) => left.localeCompare(right));
  }, [search, availableServices]);

  const toggleService = async (serviceId: string, checked: boolean) => {
    const currentIds = getValues('service_ids') ?? [];
    const nextIds = checked ? [...new Set([...currentIds, serviceId])] : currentIds.filter((id) => id !== serviceId);
    setValue('service_ids', nextIds, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    await trigger('service_ids');
  };

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">Services</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="outline" aria-expanded={open} className="w-full justify-start font-normal">
            {serviceIds.length
              ? serviceIds.length + ' service' + (serviceIds.length === 1 ? '' : 's') + ' selected'
              : 'Choose services'}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[min(24rem,calc(100vw-2rem))] p-3">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search services or categories"
            aria-label="Search services"
          />
          <div className="mt-3 max-h-72 space-y-4 overflow-y-auto">
            {isLoading ? <p className="py-3 text-sm text-muted-foreground">Loading services…</p> : null}
            {isError ? (
              <p role="alert" className="py-3 text-sm text-destructive">
                Could not load services.
              </p>
            ) : null}
            {!isLoading && !isError && groupedOptions.length === 0 ? (
              <p className="py-3 text-sm text-muted-foreground">No matching active services.</p>
            ) : null}
            {groupedOptions.map(([category, services]) => (
              <fieldset key={category} className="space-y-2">
                <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {category}
                </legend>
                {services.map((service) => {
                  const id = 'therapist-service-' + service.id;
                  return (
                    <div key={service.id} className="flex items-center gap-2">
                      <Checkbox
                        id={id}
                        checked={serviceIds.includes(service.id)}
                        onCheckedChange={(checked) => void toggleService(service.id, checked === true)}
                      />
                      <label htmlFor={id} className="cursor-pointer text-sm">
                        {service.name}
                      </label>
                    </div>
                  );
                })}
              </fieldset>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <TherapistServiceBadges services={selectedServices} />
      {errors.service_ids?.message ? (
        <p role="alert" className="text-sm text-destructive">
          {errors.service_ids.message}
        </p>
      ) : null}
      {!isLoading && !isError && serviceOptions.length === 0 ? (
        <p className="text-xs text-muted-foreground">No active services are available.</p>
      ) : null}
    </div>
  );
}
