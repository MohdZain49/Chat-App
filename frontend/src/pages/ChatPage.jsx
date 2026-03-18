import React from "react";
import useAuthStore from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div className="z-10">
      <button onClick={logout} className="bg-gray-300 border-gray-900 p-4 m-4">Logout</button>
      ChatPage
    </div>
  );
}

export default ChatPage;
