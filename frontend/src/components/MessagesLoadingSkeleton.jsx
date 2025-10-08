import React from "react";

function MessagesLoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-4 px-6 py-4">
      
      {/* Left bubble skeleton */}
      <div className="flex justify-start">
        <div className="w-48 h-12 bg-slate-700/40 rounded-xl animate-pulse"></div>
      </div>

      {/* Right bubble skeleton */}
      <div className="flex justify-end">
        <div className="w-36 h-10 bg-primary/30 rounded-xl animate-pulse"></div>
      </div>

      {/* Left bubble skeleton */}
      <div className="flex justify-start">
        <div className="w-40 h-12 bg-slate-700/40 rounded-xl animate-pulse"></div>
      </div>

      {/* Right bubble skeleton */}
      <div className="flex justify-end">
        <div className="w-44 h-10 bg-primary/30 rounded-xl animate-pulse"></div>
      </div>

      {/* Left bubble skeleton */}
      <div className="flex justify-start">
        <div className="w-32 h-10 bg-slate-700/40 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

export default MessagesLoadingSkeleton;
