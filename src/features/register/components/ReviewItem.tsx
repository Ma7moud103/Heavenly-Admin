const ReviewItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-2">{label}</p>
      <p className="text-sm font-medium text-slate-900">{value || 'Not provided'}</p>
    </div>
  );
};

export default ReviewItem;
