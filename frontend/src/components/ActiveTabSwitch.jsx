import { useChatStore } from "../store/useChatStore";
import { MessageSquare, Users } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="w-full border-b border-slate-700/50 bg-slate-800/40 backdrop-blur-md py-3 flex justify-center">
      <div className="flex items-center gap-2 rounded-full bg-slate-700/30 p-1.5 shadow-inner">
        
        {/* Chats Tab */}
        <button
          onClick={() => setActiveTab("chats")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${activeTab === "chats"
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "text-slate-300 hover:bg-slate-700/50"
            }`}
        >
          <MessageSquare size={16} />
          <span>Chats</span>
        </button>

        {/* Contacts Tab */}
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${activeTab === "contacts"
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "text-slate-300 hover:bg-slate-700/50"
            }`}
        >
          <Users size={16} />
          <span>Contacts</span>
        </button>

      </div>
    </div>
  );
}

export default ActiveTabSwitch;
