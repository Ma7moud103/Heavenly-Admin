import type { ISpaCategories } from '@/interfaces/ISpa';
import { createContext, useCallback, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

interface IProps {
  OpenAddCat: boolean;
  //   setOpenAddCat: Dispatch<SetStateAction<boolean>>;
  handleOpenAddCatChange: (status: boolean) => void;
  OpenUpdateCat: boolean;
  //   setOpenUpdateCat: Dispatch<SetStateAction<boolean>>;
  handleOpenUpdateCatChange: (status: boolean) => void;
  selectedCategory: ISpaCategories | undefined;
  setSelectedCategory: Dispatch<SetStateAction<ISpaCategories | undefined>>;
  OpenDeleteModal: boolean;
  //   setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  handleOpenDelete: (status: boolean) => void;
}

const CategoryContext = createContext<IProps | null>(null);

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  //   const { categoriesWithCounts, IsLoadingCategories } = UseCategoriesWithCounts();
  const [OpenAddCat, setOpenAddCat] = useState<boolean>(false);
  const [OpenUpdateCat, setOpenUpdateCat] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ISpaCategories | undefined>();
  const [OpenDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const handleOpenAddCatChange = useCallback((status: boolean) => {
    setOpenAddCat(status);
  }, []);

  const handleOpenUpdateCatChange = useCallback((status: boolean) => {
    setOpenUpdateCat(status);
  }, []);

  const handleOpenDelete = useCallback((status: boolean) => {
    setOpenDeleteModal(status);
  }, []);

  const value = useMemo(
    () => ({
      OpenAddCat,
      handleOpenAddCatChange,
      OpenUpdateCat,
      handleOpenUpdateCatChange,
      selectedCategory,
      setSelectedCategory,
      OpenDeleteModal,
      handleOpenDelete,
    }),
    [OpenAddCat, OpenUpdateCat, selectedCategory, OpenDeleteModal],
  );
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useCategory must be used within CategoryProvider');
  }

  return context;
};

export { useCategory, CategoryProvider };
