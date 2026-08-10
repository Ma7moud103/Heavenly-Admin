import { useAuthStore } from '@/stores/auth/auth.store';
import { STEPS } from '@/utils/register/constants.constants';
import { Check } from 'lucide-react';

const StepIndicator = () => {
  const step = useAuthStore((state) => state.step);
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      {STEPS.map((item, index) => {
        const isCurrent = item.id === step;
        const isDone = item.id < step;
        const Icon = item.icon;

        return (
          <div key={item.id} className="flex items-center">
            <div
              className={`flex bg-red-50 p-2 items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-linear-to-r from-sky-50 to-cyan-50 border border-sky-200 shadow-lg shadow-sky-100'
                  : isDone
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-white border border-slate-200'
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  isDone
                    ? 'bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-200'
                    : isCurrent
                      ? 'bg-linear-to-br from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-200'
                      : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div className="hidden sm:block">
                <p className={`text-sm font-semibold ${isCurrent || isDone ? 'text-slate-900' : 'text-slate-500'}`}>{item.label}</p>
                <p className="text-xs text-slate-500">Step {item.id}</p>
              </div>
            </div>
            {index < STEPS.length - 1 && <div className={`w-12 h-0.5 mx-2 rounded-full ${item.id < step ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
