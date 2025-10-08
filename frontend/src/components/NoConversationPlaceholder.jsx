import { MessageSquare } from "lucide-react";

function NoConversationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center relative p-6">
      
      {/* Icon */}
      <div className="p-6 mb-4 bg-slate-800/40 rounded-full border border-slate-700/30 shadow-inner animate-pulse">
        <MessageSquare size={48} className="text-slate-400" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
        No Conversation Selected
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-slate-400 max-w-xs">
        Select a chat from your list or start a new conversation to begin messaging instantly!
      </p>

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] animate-pulse"></div>
    </div>
  );
}

export default NoConversationPlaceholder;
