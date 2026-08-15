import { ShieldCheck } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 mb-6">
        <ShieldCheck className="h-4 w-4" />
        Heavenly Admin
      </div>
      <h1 className="font-bold text-5xl md:text-6xl  tracking-tight text-slate-900 mb-4 capitalize">Change your Password now</h1>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">Welcome back! you can change your password now just type your email.</p>
    </div>
  );
};

export default Header;
