import { useMemo } from 'react';

const useFindById = <T extends { id: string }>(id: string, items: T[]) => {
  return useMemo(() => {
    return items.find((item) => item.id === id);
  }, [id, items]);
};

export default useFindById;
