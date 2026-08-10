import { Link } from 'react-router-dom';
import RegisterWizard from '../components/RegisterWizard';

export default function Register() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-linear-to-r from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-sky-400/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-sky-400/5 via-transparent to-amber-400/5" />
      </div>

      <section className="mx-auto max-w-7xl relative z-10">
        <RegisterWizard />

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-sky-600 transition-colors hover:text-sky-700">
              Sign in instead
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
