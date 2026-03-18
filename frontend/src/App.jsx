import React from "react";
import { Routes, Route } from "react-router";
import ChatPage from "./pages/ChatPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import useAuthStore from "./store/useAuthStore.js";

function App() {
  const { authUser, isLoding, isLoggedIn, login } = useAuthStore();

  console.log("name", authUser);
  console.log("lodding : ", isLoding);
  console.log("isloggedIn : ", isLoggedIn)

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size[14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <button onClick={login} className="z-10 bg-gray-600 p-3 m-4 border-2 border-blue-800 rounded-2xl" >Login</button>
      <Routes>
        <Route path={"/"} element={<ChatPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/login"} element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
