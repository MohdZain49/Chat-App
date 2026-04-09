import React, { useEffect } from "react";
import { X } from "lucide-react";

import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";

function ChatHeader() {
  const { onlineUsers } = useAuthStore();
  const { selectedUser, setSelectedUser } = useChatStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="p-4 bg-slate-800/50 border-b border-slate-700/50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div
            className={`avatar ${
              isOnline ? "avatar-online" : "avatar-offline"
            }  size-14`}
          >
            <img
              src={selectedUser.profilePic || "./avatar.png"}
              alt={selectedUser.fullName}
              className="size-full rounded-full"
            />
          </div>
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px]  truncate">
              {selectedUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">{isOnline ? "Online" : "Offline"}</p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X className="size-5 text-slate-400 hover:text-slate-200 transition-colors" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
