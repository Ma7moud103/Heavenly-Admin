import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { SharedInput } from '@/components/shared/SharedInput';
import { useForm, type SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldError } from '@/components/ui/field';
import type { ISpaCategories } from '@/interfaces/ISpa';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useCOrECat, type IPayload } from '@/hooks/spa/useCorECat';
interface IProps {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: ISpaCategories;
}

const schema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
});
const initialValues: IPayload = {
  description: '',
  name: '',
};

export function ManageCat({ mode, open, onOpenChange, category }: IProps) {
  const categoryId = category && category.id;
  const {
    handleSubmit,
    register,
    reset,
    formState: {
      errors: { name: NameErr, description: desErr },
      isValid,
    },
  } = useForm<IPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useCOrECat(mode, categoryId);

  const OnSubmit: SubmitHandler<IPayload> = async (data) => {
    try {
      await mutateAsync(data);
      console.log(data);

      reset();

      toast.success(mode === 'edit' ? 'Category updated successfully' : 'Category created successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
    }
  };

  const title = mode === 'edit' ? 'Update Category' : 'Create New Category';
  const description = mode === 'edit' ? 'Update Category details, pricing, image, type, and status.' : 'Create a Category with description, name';
  const submitLabel = isPending ? (mode === 'edit' ? 'Saving...' : 'Creating...') : mode === 'edit' ? 'Save Changes' : 'Create Category';

  useEffect(() => {
    if (mode === 'edit' && category) {
      reset({
        name: category.name,
        description: category.description,
      });
    } else {
      reset(initialValues);
    }
  }, [mode, category, reset]);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <form className="flex h-full flex-col gap-y-5" onSubmit={handleSubmit(OnSubmit)}>
          {/* {activeMutation ? <p className=" text-sm text-[--color-error]">{activeMutation}</p> : null} */}

          <div className="px-4">
            <SharedInput
              {...register('name')}
              className="py-5"
              name="name"
              id="name"
              label="Category Name"
              placeholder="category name like the others"
              // value={categ}
            />
            {NameErr && <FieldError>{NameErr.message}</FieldError>}
          </div>
          <div className="px-4">
            <SharedInput
              {...register('description')}
              className="py-5"
              name="description"
              id="description"
              label="Category description"
              placeholder="category description like the others"
            />
            {desErr && <FieldError>{desErr.message}</FieldError>}
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
