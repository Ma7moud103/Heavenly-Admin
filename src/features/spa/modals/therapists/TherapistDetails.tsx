import { useTherapistActionsContext, useTherapistUiContext } from '@/stores/spa/SpaTherapistsContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TherapistServiceBadges from '@/features/spa/components/therapists/TherapistServiceBadges';

const TherapistDetails = () => {
  const { selected, detailsOpen, setDetailsOpen } = useTherapistUiContext();
  const { openEdit, openSchedule } = useTherapistActionsContext();

  return (
    <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selected?.full_name}</DialogTitle>
          <DialogDescription>Therapist profile</DialogDescription>
        </DialogHeader>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Phone</dt>
            <dd>{selected?.phone || '—'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd>{selected?.email || '—'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Gender</dt>
            <dd>{selected?.gender || '—'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Availability</dt>
            <dd>{selected?.current_availability || '—'}</dd>
          </div>
          <div className="col-span-2">
            <dt className="mb-2 text-muted-foreground">Services</dt>
            <TherapistServiceBadges services={selected?.services ?? []} limit={selected?.services.length ?? 0} />
          </div>
        </dl>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setDetailsOpen(false);
              if (selected) openSchedule(selected);
            }}
          >
            Manage schedule
          </Button>
          <Button
            onClick={() => {
              setDetailsOpen(false);
              if (selected) openEdit(selected);
            }}
          >
            Edit profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TherapistDetails;
