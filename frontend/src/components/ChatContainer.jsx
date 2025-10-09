import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Fetch messages when user changes
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  // Auto-scroll only the messages section
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-base-100">
      {/* Header */}
      <ChatHeader />

      {/* Scrollable messages area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 px-6 py-6 overflow-y-auto space-y-6 custom-scrollbar"
      >
        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length > 0 ? (
          <div className="max-w-6xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble relative break-words max-w-[75%] ${
                    msg.senderId === authUser._id
                      ? "bg-green-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover mb-2"
                    />
                  )}
                  {msg.text && <p>{msg.text}</p>}
                  <p className="text-[11px] mt-1 opacity-75 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      {/* Input Box (stays fixed at bottom within layout) */}
      <div className="border-t border-base-300 bg-base-200/80 backdrop-blur-md">
        <MessageInput />
      </div>
    </div>
  );
}

export default ChatContainer;
