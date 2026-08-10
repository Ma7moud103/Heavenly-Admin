import { useFormContext } from 'react-hook-form';

const RegisterProgress = () => {
  const { getValues } = useFormContext();
  const completion = 0; // Replace with actual completion logic

  return (
    <div className="max-w-3xl mx-auto mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-slate-600">Registration progress</span>
        <span className="text-sm font-bold text-slate-900">{completion}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-sky-500 via-cyan-400 to-amber-400 transition-all duration-700 ease-out"
          style={{ width: `${completion}%` }}
        />
      </div>
    </div>
  );
};

export default RegisterProgress;
