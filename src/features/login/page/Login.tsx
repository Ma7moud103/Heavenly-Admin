import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import LoginHeader from '../components/LoginHeader';

export default function Login() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-linear-to-r from-slate-50 via-white to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-sky-400/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-400/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-sky-400/5 via-transparent to-amber-400/5" />
      </div>

      <section className="mx-auto max-w-7xl relative z-10">
        {/* <RegisterWizard /> */}
        <LoginHeader />

        <div className="max-w-4xl mx-auto">
          <div className=" overflow-hidden rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
            <div className="p-8 sm:p-10 space-y-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-1">Here we go</p>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Profile Information</h2>
              <p className="text-slate-600 max-w-xl">Enter the basic profile details.</p>
              <LoginForm />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-600">
            Do you have an account?{' '}
            <Link to="/register" className="font-medium text-sky-600 transition-colors hover:text-sky-700">
              Sign up instead
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
