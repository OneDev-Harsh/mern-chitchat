import { MessageSquareOff } from "lucide-react";

function NoChatsFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/30 shadow-inner space-y-4">
      {/* Icon */}
      <div className="p-4 bg-slate-700/30 rounded-full border border-slate-600/40">
        <MessageSquareOff size={42} className="text-slate-400" />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-slate-200">
        No Chats Found
      </h2>

      {/* Subtitle */}
      <p className="text-slate-400 text-sm max-w-xs">
        Looks like you haven’t started a conversation yet.  
        Find someone from your contacts and start chatting!
      </p>

      {/* Subtle Glow Animation */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] animate-pulse"></div>
    </div>
  );
}

export default NoChatsFound;
