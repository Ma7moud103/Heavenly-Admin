import UseSpaTherapists from '@/hooks/spa/UseSpaTherapists';
import SpaStatCard from '../components/SpaStatCard';
import { CircleDollarSign, Clock3, Leaf, Users2 } from 'lucide-react';

import type { LucideIcon } from 'lucide-react';
import UseSpaCategories from '@/hooks/spa/UseSpaCategories';

export interface ISpaStatCard {
  icon: LucideIcon;
  title: string;
  value: number | string;
  note: string;
  isLoading?: boolean;
}

const SpaStatistics = () => {
  const { data: spaTherapistsData, isLoading: isLoadingTherapists } = UseSpaTherapists();
  const { data: spaCategoriesData, isLoading: isLoadingCategories } = UseSpaCategories();

  const spaStatCards: ISpaStatCard[] = [
    {
      icon: Leaf,
      title: 'Categories',
      value: spaCategoriesData?.length || 0,
      note: 'Massage, facial, sauna, wellness',
      isLoading: isLoadingCategories,
    },
    {
      icon: Users2,
      title: 'Therapists',
      value: spaTherapistsData?.length || 0,
      note: 'Registered customers',
      isLoading: isLoadingTherapists,
    },
    {
      icon: CircleDollarSign,
      title: 'Average Ticket',
      value: 1400,
      note: 'Single Services And Packages',
      // isLoading: isLoadingBookings,
    },
    {
      icon: Clock3,
      title: 'Time-slot Model',
      value: 'dynamic',
      note: 'Generated from opening hours',
    },
  ];
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {spaStatCards.map((item) => (
        <SpaStatCard key={item.title} icon={item.icon} title={item.title} isLoading={item?.isLoading} value={item.value} note={item.note} />
      ))}
      {/* <SpaStatCard
        icon={Users2}
        title="Therapists"
        isLoading={isLoadingTherapists}
        value={spaTherapistsData?.length || 0}
        note="Shifts and availability by day"
      />
      <SpaStatCard icon={CircleDollarSign} title="Average ticket" value={1400} note="Single services and packages" />
      <SpaStatCard icon={Clock3} title="Time-slot model" value="Dynamic" note="Generated from opening hours" /> */}
    </section>
  );
};

export default SpaStatistics;
