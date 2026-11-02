import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SharedInput } from '@/components/shared/SharedInput';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ICreateSpaService, ISpaServices } from '@/interfaces/ISpa';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useCreateOrEditSpaService } from '@/hooks/spa/categories/useCorECat';
import SelectBoxField from './SelectBox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { SpaServicesSchema } from '@/utils/schemas';
import { FieldError } from '@/components/ui/field';

interface IProps {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: ISpaServices;
}

const defaultValues: ICreateSpaService = {
  name: '',
  description: '',
  duration: 0,
  price: 0,
  category_id: '',
  is_active: false,
};

export function ManageServices({ mode, open, onOpenChange, service }: IProps) {
  const serviceId = service && service.id;
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: {
      errors: { name: NameErr, description: desErr, duration: durErr, price: priceErr },
      isValid,
    },
  } = useForm<ICreateSpaService>({
    defaultValues,
    resolver: yupResolver(SpaServicesSchema),
  });

  const { mutateAsync, isPending } = useCreateOrEditSpaService(mode, serviceId);

  const OnSubmit: SubmitHandler<ICreateSpaService> = async (data) => {
    try {
      await mutateAsync(data);
      reset(defaultValues);
      toast.success(mode === 'edit' ? 'Service updated successfully' : 'Service created successfully');
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const title = mode === 'edit' ? 'Update Service' : 'Create New Service';
  const description =
    mode === 'edit' ? 'Update service details, pricing, category, and status.' : 'Add a service with its duration, price, and category.';
  const submitLabel = isPending ? (mode === 'edit' ? 'Saving...' : 'Creating...') : mode === 'edit' ? 'Save Changes' : 'Create Service';

  useEffect(() => {
    if (mode === 'edit' && service) {
      reset({
        name: service.name,
        description: service.description,
        category_id: service?.category_id?.id,
        duration: service.duration,
        is_active: service.is_active,
        price: service.price,
      });
    } else {
      reset(defaultValues);
    }
  }, [mode, service, reset]);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <form className="flex h-full flex-col gap-y-5 px-4" onSubmit={handleSubmit(OnSubmit)}>
          {/* {activeMutation ? <p className=" text-sm text-[--color-error]">{activeMutation}</p> : null} */}

          <SelectBoxField control={control} />
          <div className="flex flex-col gap-y-5">
            <div>
              <SharedInput
                {...register('name')}
                className="py-5"
                name="name"
                id="name"
                label="Service Name"
                placeholder="service name like the others"
                error={NameErr?.message}
              />
            </div>
            <div>
              <Label htmlFor="description">Service Description</Label>

              <Textarea
                {...register('description')}
                className="py-5 mt-2"
                name="description"
                id="description"
                placeholder="service description like the others"
              />
            </div>
            <FieldError className="text-xs text-[--color-error]">{desErr?.message}</FieldError>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <SharedInput
                {...register('duration')}
                className="py-5"
                name="duration"
                id="duration"
                type="number"
                label="Service Duration"
                placeholder="Duration in minutes"
                min={1}
                step={1}
                error={durErr?.message}
              />
            </div>
            <div>
              <SharedInput
                {...register('price')}
                className="py-5"
                name="price"
                id="price"
                type="number"
                label="Service Price"
                placeholder="Price"
                min={0.01}
                step={0.01}
                error={priceErr?.message}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="is_active"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              )}
            />
            <label htmlFor="is_active" className="text-sm text-muted-foreground">
              Active service
            </label>
          </div>

          <SheetFooter className="border-t border-[--color-border] sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary disabled:opacity-60" disabled={!isValid || isPending}>
              {submitLabel}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
