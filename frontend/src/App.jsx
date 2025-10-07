import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router";
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from './store/useAuthStore';
import PageLoader from './components/PageLoader';
import { Toaster } from 'react-hot-toast';

function App() {

  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});

  if(isCheckingAuth) return <PageLoader />

  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>

      {/*decorators - background and glow shapes */}

       {/* 🌀 Soft gradient blobs */}
      <div className="absolute top-[-10rem] left-[-10rem] w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-[-10rem] right-[-10rem] w-[25rem] h-[25rem] bg-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>

      {/* 🕸️ Subtle grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.primary/10)_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 pointer-events-none"></div>


      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
