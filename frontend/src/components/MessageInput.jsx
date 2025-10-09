import React, { useRef, useState, useEffect } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";

function MessageInput() {
  const playRandomKeyStrokeSound = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const { sendMessage, isSoundEnabled, selectedUser } = useChatStore();

  // --- auto resize textarea ---
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [text]);

  const handleSend = () => {
    if (!text.trim() && !imagePreview) return;

    sendMessage({
      text,
      image: imagePreview,
      receiverId: selectedUser?._id,
    });

    setText("");
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (isSoundEnabled && e.key.length === 1) {
      playRandomKeyStrokeSound();
    }
  };

  return (
    <div className="w-full bg-base-200/70 backdrop-blur-md border-t border-base-300 p-3 md:p-4 flex-shrink-0">
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-3 relative w-fit">
          <img
            src={imagePreview}
            alt="preview"
            className="w-28 h-28 object-cover rounded-xl border border-base-300 shadow-md"
          />
          <button
            onClick={() => setImagePreview(null)}
            className="absolute -top-2 -right-2 bg-error text-white rounded-full p-1 hover:bg-error/80"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-3">
        <button
          onClick={() => fileInputRef.current.click()}
          className="btn btn-ghost btn-circle hover:bg-base-300"
        >
          <Image size={20} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Type a message..."
          className="textarea textarea-bordered w-full resize-none rounded-2xl bg-base-100/90 backdrop-blur-md text-base min-h-[3rem]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleSend}
          className="btn btn-primary btn-circle hover:scale-105 active:scale-95 transition-transform"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
