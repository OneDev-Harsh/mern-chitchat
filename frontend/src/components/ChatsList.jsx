import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { motion, AnimatePresence } from "framer-motion";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {chats.map((chat) => (
          <motion.div
            key={chat._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              onClick={() => setSelectedUser(chat)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
                ${
                  selectedUser?._id === chat._id
                    ? "bg-primary/20 border border-primary/40"
                    : "hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50"
                }`}
            >
              {/* Avatar */}
              <div className="avatar online">
                <div className="w-12 rounded-full border border-slate-600/50">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-slate-100 truncate">
                  {chat.fullName}
                </h3>
                <p className="text-sm text-slate-400 truncate">
                  {chat.lastMessage?.text
                    ? chat.lastMessage.text
                    : "Start a conversation"}
                </p>
              </div>

              {/* Timestamp */}
              {chat.lastMessage?.createdAt && (
                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ChatsList;
