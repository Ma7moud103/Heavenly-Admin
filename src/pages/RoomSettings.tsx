import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { createRoomType } from '@/data/createRoomType';
import { useState } from 'react';
import type { FormEvent } from 'react';

interface IRoomsTypes {
  name: string;
  price: string | number;
}
const initialFormData: IRoomsTypes = {
  name: '',
  price: '',
};

const RoomSettings = () => {
  const [formData, setFormData] = useState<IRoomsTypes>(initialFormData);
  const [formErrors, setFormErrors] = useState<{ name: string; price: string } | null>(null);
  const { mutate } = createRoomType(setFormData);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formData.name || !formData.price) {
      setFormErrors({
        name: !formData.name ? 'Name is required' : '',
        price: !formData.price ? 'Price is required' : '',
      });
    } else {
      setFormErrors(null);
      mutate([formData]);
      setFormData(initialFormData);
    }
  }

  return (
    <>
      <form className="flex flex-col-reverse lg:flex-row gap-6" onSubmit={handleSubmit}>
        <section className="content flex-1">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fieldgroup-name">Room Type Name</FieldLabel>
              <Input
                className="py-5"
                id="fieldgroup-name"
                placeholder="Luxury Suite"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {formErrors?.name && <FieldError>{formErrors.name}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-price">Base Price</FieldLabel>
              <Input
                className="py-5"
                id="fieldgroup-price"
                type="number"
                placeholder="Type Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value === '' ? '' : Number(e.target.value),
                  })
                }
              />
              {formErrors?.price && <FieldError>{formErrors.price}</FieldError>}
            </Field>

            <Field orientation="horizontal">
              <Button onClick={() => setFormData(initialFormData)} className="p-5" type="reset" variant="outline">
                Reset
              </Button>
              <Button className="p-5" type="submit">
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </section>
        <div className="shrink-0 w-full md:hidden lg:w-[400px] lg:block p-4 lg:p-8 bg-[--color-bg-inset] rounded-lg shadow">
          <p className="  text-[--color-text-sub]">
            Here as an admin you can manage room types and their settings. you can create types and basic price for each type of room and also you can
            create statues for each room type.
          </p>
        </div>
      </form>
    </>
  );
};

export default RoomSettings;
