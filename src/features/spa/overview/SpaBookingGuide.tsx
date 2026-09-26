import { SpaSectionCard } from '../components/SpaSectionCard';
const bookingSteps: string[] = ['Choose customer type', 'Select service or package', 'Assign therapist', 'Pick a dynamic time slot'];

const SpaBookingGuide = () => {
  return (
    <SpaSectionCard
      title="Booking rules and flow"
      description="The booking can target either a single service or a package, never both and never neither."
    >
      <div className="space-y-3">
        {bookingSteps.map((step, index) => (
          <div
            key={step + 1}
            className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-4 py-4 sm:flex-row sm:items-center"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-text-gold)] text-sm font-semibold text-white">
              {index + 1}
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text)]">{step}</p>
              <p className="text-sm text-[var(--color-text-sub)]">A step in the spa booking lifecycle.</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 sm:p-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-sub)]">Customer types</p>
          <div className="mt-3 space-y-2">
            <div className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-text)]">Hotel Guest</p>
              <p className="text-sm text-[var(--color-text-sub)]">Linked to guest record when available.</p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
              <p className="font-semibold text-[var(--color-text)]">External Customer</p>
              <p className="text-sm text-[var(--color-text-sub)]">Stored directly in the spa customer table.</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-sub)]">Booking constraints</p>
          <div className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-sub)]">
            <p className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">Service or package must be selected, never both.</p>
            <p className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
              Therapist is chosen during booking, not on the service itself.
            </p>
            <p className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3">
              Package keeps its own final price for predictable checkout.
            </p>
          </div>
        </div>
      </div>
    </SpaSectionCard>
  );
};

export default SpaBookingGuide;
