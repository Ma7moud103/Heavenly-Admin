import { memo } from 'react';

import SpaHero from '@/features/spa/overview/SpaHero';
import SpaStatistics from '@/features/spa/overview/SpaStatistics';
import SpaServicesOverview from '@/features/spa/overview/SpaServicesOverview';
import SpaBookingGuide from '@/features/spa/overview/SpaBookingGuide';
import SpaPackagesOverview from '@/features/spa/overview/SpaPackagesOverview';

const Spa = () => {
  return (
    <div className="flex flex-col gap-6">
      <SpaHero />

      <SpaStatistics />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SpaServicesOverview />

        <SpaBookingGuide />
      </section>

      <SpaPackagesOverview />
    </div>
  );
};

export default memo(Spa);
