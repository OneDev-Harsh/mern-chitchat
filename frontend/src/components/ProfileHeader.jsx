import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { LogOut, Volume2Icon, VolumeX, Camera, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio("/mouse-click.mp3")

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setSelectedImage(base64Image);
        await updateProfile({profilePic: base64Image});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/60 backdrop-blur-lg rounded-t-3xl shadow-lg">
      {/* Left: Profile */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Avatar with online indicator */}
        <div
          className="avatar online cursor-pointer hover:scale-[1.05] transition-transform duration-300"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="w-14 rounded-full ring-2 ring-primary/40 relative group overflow-hidden">
            <img
              src={
                selectedImage ||
                authUser?.profilePic ||
                "/avatar.png"
              }
              alt="profile"
              className="object-cover w-full h-full"
            />
            {/* Hover overlay for upload */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
              <Camera size={18} className="text-white" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col truncate">
          <span className="text-base font-semibold text-slate-100 truncate">
            {authUser?.fullName || "Guest User"}
          </span>
          <span className="text-xs text-slate-400 truncate max-w-[180px]">
            {authUser?.email || "guest@chitchat.com"}
          </span>
        </div>
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sound toggle */}
        <button
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((error) => console.log("Audio Play Failed: ", error));
            toggleSound();
          }}
          className="p-2 rounded-full hover:bg-slate-700/50 transition-all duration-300"
          title={isSoundEnabled ? "Mute Sounds" : "Unmute Sounds"}
        >
          {isSoundEnabled ? (
            <Volume2Icon size={19} className="text-primary" />
          ) : (
            <VolumeOffIcon size={19} className="text-slate-400" />
          )}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-2 rounded-full hover:bg-red-500/20 transition-all duration-300"
          title="Logout"
        >
          <LogOut size={19} className="text-red-400" />
        </button>
      </div>
    </div>
  );
}

export default ProfileHeader;
