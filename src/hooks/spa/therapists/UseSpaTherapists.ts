import { useQuery } from '@tanstack/react-query';
import { getTherapists, therapistKeys } from '@/data/spa/Therapists';

const UseSpaTherapists = () => useQuery({ queryKey: therapistKeys.all, queryFn: getTherapists });
export default UseSpaTherapists;
