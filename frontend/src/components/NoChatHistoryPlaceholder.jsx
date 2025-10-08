import { MessageSquare } from "lucide-react";

function NoChatHistoryPlaceholder({ name, onSendQuickMessage }) {
  const quickMessages = ["Say Hello 👋", "How are you?", "Hi!", "What's up?", "Let's chat!"];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center relative p-6">
      
      {/* Icon */}
      <div className="p-6 mb-4 bg-slate-800/40 rounded-full border border-slate-700/30 shadow-inner">
        <MessageSquare size={48} className="text-slate-400" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
        No Chat History
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-slate-400 max-w-xs mb-6">
        You haven’t sent any messages to{" "}
        <span className="text-primary font-medium">{name}</span> yet.
        Tap one of the quick options to start!
      </p>

      {/* Quick Message Options */}
      <div className="flex flex-wrap gap-3 justify-center">
        {quickMessages.map((msg, idx) => (
          <button
            key={idx}
            onClick={() => onSendQuickMessage(msg)}
            className="px-4 py-2 bg-primary/20 text-primary rounded-xl hover:bg-primary/30 transition-all duration-200 shadow-md text-sm"
          >
            {msg}
          </button>
        ))}
      </div>

      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)]"></div>
    </div>
  );
}

export default NoChatHistoryPlaceholder;
