function UsersLoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {Array(6).fill().map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm"
        >
          {/* Avatar skeleton */}
          <div className="w-10 h-10 rounded-full bg-slate-700/60"></div>

          {/* Text skeletons */}
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/5 bg-slate-700/60 rounded"></div>
            <div className="h-2 w-2/5 bg-slate-700/50 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;

