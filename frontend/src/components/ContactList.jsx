import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";

function ContactList() {
  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound message="No contacts found" />;

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence>
        {allContacts.map((user) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300
                ${
                  selectedUser?._id === user._id
                    ? "bg-primary/20 border border-primary/40"
                    : "hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50"
                }`}
            >
              {/* Left Section - Avatar + Info */}
              <div
                onClick={() => setSelectedUser(user)}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                {/* Avatar */}
                <div className="avatar online">
                  <div className="w-12 rounded-full border border-slate-600/50">
                    <img
                      src={user.profilePic || "/avatar.png"}
                      alt={user.fullName}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col truncate">
                  <h3 className="font-medium text-slate-100 truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-sm text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Right Section - Message Button */}
              <button
                onClick={() => setSelectedUser(user)}
                className="opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity duration-300 p-2 rounded-full hover:bg-primary/20 hover:scale-105"
                title="Start Chat"
              >
                <MessageSquare size={18} className="text-primary" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ContactList;
