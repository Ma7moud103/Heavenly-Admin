import UseSpaCategories from '@/hooks/spa/categories/UseSpaCategories';
import type { ISpaCategories, ISpaServices } from '@/interfaces/ISpa';
import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

interface IProps {
  OpenAddService: boolean;
  OpenUpdateService: boolean;
  selectedService: ISpaServices | undefined;
  setSelectedService: Dispatch<SetStateAction<ISpaServices | undefined>>;
  OpenDeleteModal: boolean;
  setOpenAddService: Dispatch<SetStateAction<boolean>>;
  setOpenUpdateService: Dispatch<SetStateAction<boolean>>;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  selectedCategory: ISpaCategories | undefined;
  setselectedCategory: Dispatch<SetStateAction<ISpaCategories | undefined>>;
}

const ServiceContext = createContext<IProps | null>(null);

const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const { data: categories } = UseSpaCategories();
  const [selectedCategory, setselectedCategory] = useState<ISpaCategories | undefined>(() => {
    if (categories && categories.length > 0) {
      return categories[0] as ISpaCategories;
    }
  });
  const [OpenAddService, setOpenAddService] = useState<boolean>(false);
  const [OpenUpdateService, setOpenUpdateService] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<ISpaServices | undefined>();
  const [OpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      OpenAddService,
      OpenUpdateService,
      selectedService,
      setSelectedService,
      OpenDeleteModal,
      setOpenAddService,
      setOpenUpdateService,
      setOpenDeleteModal,
      selectedCategory,
      setselectedCategory,
    }),
    [OpenAddService, OpenUpdateService, selectedService, OpenDeleteModal, selectedCategory],
  );
  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
};

const useService = () => {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error('useService must be used within ServiceProvider');
  }

  return context;
};

export { ServiceProvider, useService };
