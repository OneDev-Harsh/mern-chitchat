import React from "react";
import { useChatStore } from "../store/useChatStore";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-9xl h-[85vh] md:h-[700px] mx-auto flex rounded-3xl overflow-hidden border border-slate-700/30 bg-slate-900/40 backdrop-blur-md shadow-2xl animate-fade-in">

      {/* 🌈 Accent Glow Backgrounds */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/30 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10rem] right-[-10rem] w-80 h-80 bg-secondary/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* LEFT SIDEBAR */}
      <aside className="relative w-80 bg-slate-800/50 backdrop-blur-lg border-r border-slate-700/30 flex flex-col rounded-l-3xl">
        {/* top section: profile + tab switch */}
        <div className="sticky top-0 z-10 bg-slate-800/60 backdrop-blur-md rounded-tl-3xl">
          <ProfileHeader />
          <ActiveTabSwitch />
        </div>

        {/* list section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
      </aside>

      {/* RIGHT CHAT AREA */}
      <main className="relative flex-1 flex flex-col bg-slate-900/60 backdrop-blur-lg rounded-r-3xl">
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <NoConversationPlaceholder />
          </div>
        )}
      </main>

      {/* Moving border glow */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border-[1.5px] border-transparent bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.primary/30),theme(colors.secondary/30),theme(colors.primary/30))] opacity-30 animate-border-spin"></div>
    </div>
  );
}

export default ChatPage;
