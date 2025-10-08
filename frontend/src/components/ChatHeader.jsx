import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  useEffect(() => {
    const handleEscKey = (event) => {
        if (event.key==="Escape") setSelectedUser(null); 
    }
    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-slate-700/50 bg-slate-800/50 backdrop-blur-md rounded-t-3xl shadow-inner">
      
      {/* Left: Contact Name */}
      <div className="flex items-center gap-3">
        <div className="avatar online">
          <div className="w-12 h-12 rounded-full border border-slate-600/50">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-slate-100 truncate">
          {selectedUser.fullName}
        </h2>
      </div>

      {/* Right: Close Chat */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-full hover:bg-red-500/20 transition-all duration-300"
        title="Close Chat"
      >
        <X size={18} className="text-red-400" />
      </button>
    </div>
  );
}

export default ChatHeader;
