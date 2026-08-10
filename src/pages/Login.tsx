import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-r from-slate-50 via-white to-slate-100 px-4">
      <section className="w-full max-w-md space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-950">Sign in</h1>
          <p className="text-sm text-slate-600">Authentication will be connected here later.</p>
        </div>

        <p className="text-center text-sm text-slate-600">
          Need an account?{' '}
          <Link to="/register" className="font-medium text-sky-600 transition-colors hover:text-sky-700">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
