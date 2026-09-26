"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconBox() {
  return (
    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
      <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconEye({ show }: { show: boolean }) {
  return show ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// ── Shared field style ────────────────────────────────────────────────────────

const inputCls =
  "w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

function InputField({
  icon,
  type,
  placeholder,
  value,
  onChange,
  right,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  right?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className={inputCls}
        autoComplete="off"
      />
      {right && (
        <span className="absolute inset-y-0 right-3 flex items-center">{right}</span>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode]           = useState<"login" | "signup">("login");
  const [method, setMethod]       = useState<"email" | "mobile">("email");
  const [showPassword, setShowPw] = useState(false);

  // Form fields
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [mobile,   setMobile]   = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Frontend-only: skip auth, go straight to dashboard
    router.push("/dashboard");
  }

  const isLogin  = mode === "login";
  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">

          {/* Header band */}
          <div className=" px-8 py-8 text-center">
            <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <IconBox />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">StockSense</h1>
            <p className="text-blue-100 text-sm mt-1">Inventory Management System</p>
          </div>

          {/* Form section */}
          <div className="px-8 py-7">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isLogin ? "Sign in to continue to your workspace" : "Fill in your details to get started"}
              </p>
            </div>

            {/* Login method tabs (login mode only) */}
            {isLogin && (
              <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-1 mb-5 bg-slate-50 dark:bg-slate-800/50">
                {(["email", "mobile"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                      method === m
                        ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    {m === "email" ? "Email" : "Mobile"}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full name (signup only) */}
              {isSignup && (
                <InputField
                  icon={<IconUser />}
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={setName}
                />
              )}

              {/* Email or mobile */}
              {(isSignup || method === "email") ? (
                <InputField
                  icon={<IconMail />}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={setEmail}
                />
              ) : (
                <InputField
                  icon={<IconPhone />}
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={setMobile}
                />
              )}

              {/* Mobile (signup only, after email) */}
              {isSignup && (
                <InputField
                  icon={<IconPhone />}
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobile}
                  onChange={setMobile}
                />
              )}

              {/* Password */}
              <InputField
                icon={<IconLock />}
                type={showPassword ? "text" : "password"}
                placeholder={isSignup ? "Create Password" : "Password"}
                value={password}
                onChange={setPassword}
                right={
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <IconEye show={showPassword} />
                  </button>
                }
              />

              {/* Forgot password (login only) */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:bg-blue-800 transition shadow-sm mt-1"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-400 dark:text-slate-500">OR</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            {/* Google SSO placeholder */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition"
              onClick={() => alert("Google login setup required")}
            >
              {/* Google colour icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            {/* Toggle login / signup */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => { setMode(isLogin ? "signup" : "login"); setName(""); setEmail(""); setMobile(""); setPassword(""); }}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-5">
          StockSense · TechCatalyst Demo · Frontend only
        </p>
      </div>
    </div>
  );
}
