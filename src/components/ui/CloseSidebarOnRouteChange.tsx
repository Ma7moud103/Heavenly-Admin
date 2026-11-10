import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '@/components/ui/sidebar';

export function CloseSidebarOnRouteChange() {
  const { setOpenMobile } = useSidebar();
  const { pathname } = useLocation();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return null;
}
