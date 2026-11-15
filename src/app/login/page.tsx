"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Info,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import { DEMO_ACCOUNTS, homePathForRole } from "@/lib/auth-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { user, authReady, login, requestOtp, verifyOtp } = useFidaleEvents();

  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+234 ");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [forgotModal, setForgotModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Already signed in? Send them where they belong.
  useEffect(() => {
    if (authReady && user) {
      router.replace(next || homePathForRole(user.role));
    }
  }, [authReady, user, next, router]);

  const goAfterLogin = (role: Parameters<typeof homePathForRole>[0]) => {
    router.push(next || homePathForRole(role));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const res = await login(email, password, rememberMe);
    setIsLoading(false);
    if (!res.ok) return setError(res.error);
    goAfterLogin(res.user.role);
  };

  const handleSendOtp = () => {
    setError(null);
    const res = requestOtp(phone);
    if (!res.ok) return setError(res.error);
    setOtpSent(true);
    setDemoOtp(res.demoCode);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = verifyOtp(phone, otpCode, rememberMe);
    if (!res.ok) return setError(res.error);
    goAfterLogin(res.user.role);
  };

  const fillDemo = (idx: number) => {
    const d = DEMO_ACCOUNTS[idx];
    setAuthMethod("email");
    setEmail(d.email);
    setPassword(d.password);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <Link href="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-coral-500 via-aso-600 to-amber-400 flex items-center justify-center text-white font-display font-bold text-xl shadow-md shadow-coral-500/20 group-hover:scale-105 transition-transform">
            F
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-stone-900">
            Fidale<span className="text-coral-500">Events</span>
          </span>
        </Link>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">Welcome back</h1>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
          Log in to manage your event website, guests, or vendor profile
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40">
          {next && (
            <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>Please log in to continue to <strong>{next}</strong>.</span>
            </div>
          )}

          {/* Google */}
          <button
            type="button"
            onClick={() =>
              setNotice(
                "Google sign-in needs a Google OAuth client ID and a backend. It will be connected when the API is set up — use email or phone for now."
              )
            }
            className="w-full py-3 px-4 rounded-2xl border border-stone-300 hover:border-stone-400 bg-white text-stone-700 text-xs font-bold flex items-center justify-center gap-2.5 shadow-sm transition-all hover:bg-stone-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
          {notice && (
            <p className="mt-2 text-[11px] text-stone-500 leading-relaxed bg-stone-50 border border-stone-200 rounded-xl p-2.5">
              {notice}
            </p>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-stone-400 font-medium uppercase tracking-wider">or</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-stone-100 p-1 mb-5 text-xs font-bold">
            {(
              [
                { id: "email", label: "Email", icon: Mail },
                { id: "phone", label: "Phone OTP", icon: Smartphone },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setAuthMethod(t.id);
                  setError(null);
                }}
                className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMethod === t.id ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                <t.icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {error && (
            <div role="alert" className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {authMethod === "email" ? (
            <form onSubmit={handleEmailLogin} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-stone-700 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-xs font-bold text-stone-700">
                    Password
                  </label>
                  <button type="button" onClick={() => setForgotModal(true)} className="text-xs font-semibold text-coral-600 hover:underline">
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 pr-10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <RememberRow rememberMe={rememberMe} setRememberMe={setRememberMe} />
              <SubmitButton loading={isLoading} label="Log In" />
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-stone-700 mb-1">
                  Phone number linked to your account
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 803 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
                />
              </div>

              {otpSent ? (
                <>
                  <div>
                    <label htmlFor="otp" className="block text-xs font-bold text-stone-700 mb-1">
                      6-digit code
                    </label>
                    <input
                      id="otp"
                      inputMode="numeric"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono text-center tracking-[0.5em] text-base font-bold focus:outline-none focus:border-coral-500"
                    />
                    {demoOtp && (
                      <p className="mt-1.5 text-[11px] text-stone-500">
                        Prototype mode — no SMS is sent. Your code is{" "}
                        <strong className="font-mono text-stone-900">{demoOtp}</strong>.{" "}
                        <button type="button" onClick={handleSendOtp} className="text-coral-600 font-semibold hover:underline">
                          Resend
                        </button>
                      </p>
                    )}
                  </div>
                  <RememberRow rememberMe={rememberMe} setRememberMe={setRememberMe} />
                  <SubmitButton loading={false} label="Verify & Log In" />
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors"
                >
                  Send code via WhatsApp / SMS
                </button>
              )}
            </form>
          )}

          {/* Demo accounts */}
          <div className="mt-6 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-[11px]">
            <div className="font-bold text-stone-700 mb-2">Test accounts (prototype)</div>
            <div className="grid grid-cols-3 gap-1.5">
              {DEMO_ACCOUNTS.map((d, i) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => fillDemo(i)}
                  className="py-1.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 font-bold text-stone-800"
                >
                  {d.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-stone-500">Fills in the email and password. Then press Log In.</p>
          </div>

          <div className="mt-6 text-center text-xs text-stone-500">
            New to Fidale Events?{" "}
            <Link href={next ? `/signup?next=${encodeURIComponent(next)}` : "/signup"} className="font-bold text-coral-600 hover:underline">
              Create a free account
            </Link>
          </div>
        </div>
      </div>

      {forgotModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="font-display font-bold text-lg text-stone-900">Reset your password</h3>
            {resetSent ? (
              <div className="py-4 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <p className="text-xs text-stone-600">
                  If an account exists for <strong>{email}</strong>, a reset link will be sent. (Email delivery is
                  connected once the backend + Resend/SES is set up.)
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotModal(false);
                    setResetSent(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  Back to log in
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetSent(true);
                }}
                className="mt-3 space-y-3 text-xs"
              >
                <p className="text-stone-500">Enter your account email and we&apos;ll send you a reset link.</p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300"
                />
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setForgotModal(false)} className="flex-1 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-bold">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 py-2.5 rounded-xl bg-coral-500 text-white font-bold">
                    Send link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function RememberRow({ rememberMe, setRememberMe }: { rememberMe: boolean; setRememberMe: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between pt-1">
      <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer">
        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded accent-coral-500" />
        <span>Keep me signed in</span>
      </label>
      <div className="flex items-center gap-1.5 text-xs text-stone-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Secure</span>
      </div>
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-md shadow-coral-500/20 transition-all flex items-center justify-center gap-2 mt-2"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <span>{label}</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </button>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginForm />
    </Suspense>
  );
}
