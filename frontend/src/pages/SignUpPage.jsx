import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Lock, User, Loader2, MessageSquare } from "lucide-react";

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="relative min-h-[600px] flex flex-col md:flex-row items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 p-7 rounded-3xl">

    {/* ✨ Animated glowing border */}
    <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-move"></div>
    <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-0"></div>

     <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full">
      
      {/* 🌌 Background glow effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-[150px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-[150px] opacity-50 animate-pulse"></div>

      {/* Left: Info section */}
      <div className="flex-1 text-center md:text-left space-y-6 max-w-lg z-10 px-4 md:px-8">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <MessageSquare className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            ChitChat
          </h1>
        </div>

        <h2 className="text-3xl font-semibold text-slate-100/90 drop-shadow-sm">
          Connect. Share. Enjoy.
        </h2>

        <p className="text-slate-300 leading-relaxed text-base">
          Welcome to <span className="text-primary font-medium">ChitChat</span>. 
          Your next-gen messaging space built for real conversations.  
          Chat seamlessly, share moments, and stay close to the people who matter most.
        </p>

        <img
          src="https://media.istockphoto.com/id/1262582481/vector/chat-messages-smartphone-sms-on-mobile-phone-screen-man-woman-couple-chatting-messaging.jpg?s=612x612&w=0&k=20&c=KrRgOU5QHAoTe9NJvfu0vhRFsHxbwQRPRNAmPh4ml6Q="
          alt="Chat illustration"
          className="w-72 mx-auto md:mx-0 opacity-95 drop-shadow-lg transition-transform hover:scale-105 rounded-2xl duration-500 "
        />
      </div>

      {/* Right: Sign up form */}
      <div className="flex-1 w-full flex items-center justify-center z-10 mt-10 md:mt-0">
        <div className="relative w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-slate-700/40 rounded-3xl shadow-2xl p-8 transition-transform duration-300 hover:scale-[1.01]">
          
          {/* Inner glow accents */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/30 blur-[120px] rounded-full opacity-40"></div>
          <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-secondary/30 blur-[100px] rounded-full opacity-40"></div>

          {/* Header */}
          <h2 className="text-3xl font-bold text-center mb-2 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">
            Create Account
          </h2>
          <p className="text-center text-sm text-slate-400 mb-6">
            Join <span className="text-secondary font-medium">ChitChat</span> and start connecting instantly
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-300 font-medium flex items-center gap-2">
                  <User size={18} /> Full Name
                </span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input input-bordered w-full bg-slate-700/50 border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl text-slate-100 placeholder-slate-400"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-300 font-medium flex items-center gap-2">
                  <Mail size={18} /> Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full bg-slate-700/50 border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl text-slate-100 placeholder-slate-400"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-300 font-medium flex items-center gap-2">
                  <Lock size={18} /> Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full bg-slate-700/50 border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-xl text-slate-100 placeholder-slate-400"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="btn btn-primary w-full mt-4 font-semibold text-lg rounded-xl shadow-md shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary hover:underline hover:text-primary-focus"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SignUpPage;
