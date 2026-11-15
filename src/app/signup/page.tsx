"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Eye, EyeOff, PartyPopper, Briefcase, AlertCircle, Check } from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import { homePathForRole } from "@/lib/auth-store";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const { user, authReady, signup } = useFidaleEvents();

  const [role, setRole] = useState<"couple" | "vendor">(
    searchParams.get("role") === "vendor" ? "vendor" : "couple"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+234 ");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authReady && user && !isLoading) router.replace(homePathForRole(user.role));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReady]);

  const checks = [
    { ok: password.length >= 8, label: "8+ characters" },
    { ok: /[A-Z]/.test(password), label: "Uppercase letter" },
    { ok: /[0-9]/.test(password), label: "Number" },
    { ok: /[^A-Za-z0-9]/.test(password), label: "Symbol" },
  ];
  const strength = checks.filter((c) => c.ok).length;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agreed) return setError("Please accept the Terms and Privacy Policy to continue.");
    setIsLoading(true);
    const res = await signup({ name, email, phone, password, role });
    setIsLoading(false);
    if (!res.ok) return setError(res.error);
    router.push(next || (role === "couple" ? "/onboarding" : "/vendor-dashboard"));
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
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          {role === "couple" ? "Create your free event website" : "List your business on Fidale"}
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
          {role === "couple"
            ? "Weddings, baby showers, birthdays & more — free forever."
            : "Get leads from couples and hosts planning events near you."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole("couple")}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                role === "couple" ? "border-coral-500 bg-coral-50/30 text-stone-900 shadow-sm" : "border-stone-200 hover:border-stone-300 text-stone-600"
              }`}
            >
              <PartyPopper className={`w-5 h-5 mb-1.5 ${role === "couple" ? "text-coral-500" : "text-stone-400"}`} />
              <div className="font-bold text-xs">I&apos;m hosting an event</div>
              <div className="text-[10px] text-stone-500">Free website & RSVPs</div>
            </button>
            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                role === "vendor" ? "border-aso-600 bg-aso-50/40 text-stone-900 shadow-sm" : "border-stone-200 hover:border-stone-300 text-stone-600"
              }`}
            >
              <Briefcase className={`w-5 h-5 mb-1.5 ${role === "vendor" ? "text-aso-600" : "text-stone-400"}`} />
              <div className="font-bold text-xs">I&apos;m a vendor</div>
              <div className="text-[10px] text-stone-500">Get client leads</div>
            </button>
          </div>

          {error && (
            <div role="alert" className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {error}{" "}
                {error.includes("already exists") && (
                  <Link href="/login" className="font-bold underline">
                    Log in
                  </Link>
                )}
              </span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-3.5 text-xs sm:text-sm" noValidate>
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-stone-700 mb-1">
                {role === "couple" ? "Your name(s)" : "Business / brand name"} *
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete={role === "couple" ? "name" : "organization"}
                placeholder={role === "couple" ? "e.g. Adaeze & Tunde" : "e.g. Bimpe Onakoya Artistry"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-stone-700 mb-1">Email address *</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-stone-700 mb-1">
                WhatsApp number <span className="font-normal text-stone-400">(optional — enables phone login)</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 803 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold text-stone-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
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
              {password && (
                <>
                  <div className="mt-2 flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full ${
                          i < strength
                            ? strength <= 1
                              ? "bg-rose-500"
                              : strength === 2
                              ? "bg-amber-500"
                              : strength === 3
                              ? "bg-blue-500"
                              : "bg-emerald-500"
                            : "bg-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-0.5">
                    {checks.map((c) => (
                      <span key={c.label} className={`text-[10px] flex items-center gap-1 ${c.ok ? "text-emerald-700" : "text-stone-400"}`}>
                        <Check className="w-3 h-3" />
                        {c.label}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <label className="flex items-start gap-2 text-xs text-stone-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded accent-coral-500 mt-0.5 shrink-0"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-coral-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-coral-600 hover:underline">Privacy Policy (NDPA 2023)</a>.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-md shadow-coral-500/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create free account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-stone-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-coral-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SignupForm />
    </Suspense>
  );
}
