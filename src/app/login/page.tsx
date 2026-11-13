"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Smartphone,
  CheckCircle2,
  Heart,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useFidaleEvents();

  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [role, setRole] = useState<"couple" | "vendor">("couple");
  const [email, setEmail] = useState("adaeze.nwosu@gmail.com");
  const [phone, setPhone] = useState("+234 803 555 0192");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const identifier = authMethod === "email" ? email : phone;
      login(identifier, role);
      if (role === "couple") {
        router.push("/dashboard");
      } else {
        router.push("/vendor-dashboard");
      }
    }, 600);
  };

  const handleQuickLogin = (targetRole: "couple" | "vendor") => {
    setIsLoading(true);
    setTimeout(() => {
      if (targetRole === "couple") {
        login("adaeze.nwosu@gmail.com", "couple", "Adaeze & Tunde");
        router.push("/dashboard");
      } else {
        login("bimpe@bridalartistry.ng", "vendor", "Bimpe Onakoya Artistry");
        router.push("/vendor-dashboard");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-500 via-aso-600 to-amber-400 flex items-center justify-center text-white font-display font-bold text-xl shadow-md shadow-coral-500/20 group-hover:scale-105 transition-transform">
            F
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-stone-900">
            Fidale<span className="text-coral-500">Events</span>
          </span>
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          Welcome back
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
          Log in to manage your wedding website, RSVPs, or vendor profile
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40">
          {/* Quick Persona Demo Switcher */}
          <div className="mb-6 p-2 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-stone-400 pl-2">One-Click Demo:</span>
            <button
              type="button"
              onClick={() => handleQuickLogin("couple")}
              className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 font-bold text-stone-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 text-coral-500 fill-coral-500" />
              <span>Couple</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("vendor")}
              className="flex-1 py-1.5 px-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-200 font-bold text-stone-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-aso-600" />
              <span>Vendor</span>
            </button>
          </div>

          {/* Social Auth Button */}
          <button
            type="button"
            onClick={() => handleQuickLogin("couple")}
            className="w-full py-3 px-4 rounded-2xl border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-bold flex items-center justify-center gap-2.5 shadow-sm transition-all hover:bg-stone-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-stone-400 font-medium uppercase tracking-wider">
                or sign in with
              </span>
            </div>
          </div>

          {/* Auth Method Tabs */}
          <div className="flex rounded-xl bg-stone-100 p-1 mb-5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMethod("email")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === "email"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod("phone")}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === "phone"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>WhatsApp / SMS OTP</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {authMethod === "email" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-stone-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setForgotModal(true)}
                      className="text-xs font-semibold text-coral-600 hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Phone number (NG / Diaspora)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 803 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                  />
                </div>

                {otpSent ? (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Enter 6-digit OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="482910"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono text-center tracking-widest text-base font-bold focus:outline-none focus:border-coral-500"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Code sent via WhatsApp/SMS •{" "}
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-coral-600 hover:underline font-semibold"
                      >
                        Resend
                      </button>
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(true);
                      setOtpCode("482910");
                    }}
                    className="w-full py-2.5 rounded-xl bg-aso-50 hover:bg-aso-100 text-aso-800 font-bold text-xs transition-colors"
                  >
                    Send Instant Verification OTP
                  </button>
                )}
              </>
            )}

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded accent-coral-500"
                />
                <span>Keep me signed in</span>
              </label>

              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit SSL</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-coral-500 to-aso-600 hover:from-coral-600 hover:to-aso-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-coral-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Fidale Events</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-stone-500">
            Don&apos;t have a wedding website yet?{" "}
            <Link href="/signup" className="font-bold text-coral-600 hover:underline">
              Create one for free
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="font-display font-bold text-lg text-stone-900">Reset your password</h3>
            {resetSent ? (
              <div className="py-4 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-xs text-stone-600">
                  Password reset link sent to <strong>{email}</strong>. Check your inbox and spam folder.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModal(false);
                    setResetSent(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-3 text-xs">
                <p className="text-stone-500">
                  Enter your registered email and we&apos;ll send you a secure link to reset your password.
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetSent(true)}
                    className="flex-1 py-2.5 rounded-xl bg-coral-500 text-white font-bold"
                  >
                    Send Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

