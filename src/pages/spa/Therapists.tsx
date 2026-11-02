import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';

import { AddTherapistButton } from '@/features/spa/components/therapists/AddTherapistButton';
import TherapistFilters from '@/features/spa/components/therapists/TherapistFilters';
import TherapistStats from '@/features/spa/components/therapists/TherapistStats';
import TherapistMoadels from '@/features/spa/modals/therapists/TherapistMoadels';
import { SpaTherapistsProvider } from '@/stores/spa/SpaTherapistsContext';
import TherapistTable from '@/features/spa/components/therapists/TherapistTable';

export default function TherapistsPageContent() {
  return (
    <SpaTherapistsProvider>
      <SpaHeader
        eyebrow="Spa Therapists"
        title="Therapist roster and availability."
        description="Manage therapist profiles and date-based working schedules."
        actions={<AddTherapistButton />}
      >
        <TherapistStats />
        <SpaSectionCard title="Therapist roster" description="Search, filter, and manage therapist details and schedules.">
          <TherapistFilters />
          <TherapistTable />
        </SpaSectionCard>
        <TherapistMoadels />
      </SpaHeader>
    </SpaTherapistsProvider>
  );
}
