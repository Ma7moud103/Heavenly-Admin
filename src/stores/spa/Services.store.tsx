import { createContext, useContext, useMemo, type ReactNode } from 'react';

interface IProps {}

const ServiceContext = createContext<IProps | null>(null);

const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(() => ({}), []);
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
