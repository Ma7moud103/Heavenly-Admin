import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 rounded-3xl border border-[--color-border] bg-[--color-bg-raised] px-6 py-12 text-center">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[--color-text-gold]">
          404
        </p>
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="max-w-xl text-sm text-[--color-text-sub] sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/" className="btn btn-primary">
          Back to Dashboard
        </Link>
        <Link to="/rooms" className="btn btn-ghost">
          Go to Rooms
        </Link>
      </div>
    </section>
  )
}
