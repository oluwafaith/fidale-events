"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useFidaleEvents();

  const [role, setRole] = useState<"couple" | "vendor">("couple");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+234 ");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      signup({
        name: name.trim() || (role === "couple" ? "Adaeze & Tunde" : "My Vendor Studio"),
        email: email.trim(),
        phone: phone.trim(),
        role,
      });

      if (role === "couple") {
        router.push("/onboarding");
      } else {
        router.push("/vendor-dashboard");
      }
    }, 600);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      signup({
        name: role === "couple" ? "Adaeze & Tunde" : "Bimpe Onakoya Artistry",
        email: "google.user@gmail.com",
        phone: "+234 803 555 0192",
        role,
      });
      if (role === "couple") {
        router.push("/onboarding");
      } else {
        router.push("/vendor-dashboard");
      }
    }, 500);
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
          Start your forever journey
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
          Create your free wedding website or join our verified vendor marketplace
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-200/40">
          {/* Account Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole("couple")}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                role === "couple"
                  ? "border-coral-500 bg-coral-50/30 text-stone-900 shadow-sm"
                  : "border-stone-200 hover:border-stone-300 text-stone-600"
              }`}
            >
              <Heart
                className={`w-5 h-5 mb-1.5 ${
                  role === "couple" ? "text-coral-500 fill-coral-500" : "text-stone-400"
                }`}
              />
              <div className="font-bold text-xs">We&apos;re getting married</div>
              <div className="text-[10px] text-stone-500">Free website & RSVPs</div>
            </button>

            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                role === "vendor"
                  ? "border-aso-600 bg-aso-50/40 text-stone-900 shadow-sm"
                  : "border-stone-200 hover:border-stone-300 text-stone-600"
              }`}
            >
              <Briefcase
                className={`w-5 h-5 mb-1.5 ${
                  role === "vendor" ? "text-aso-600" : "text-stone-400"
                }`}
              />
              <div className="font-bold text-xs">I&apos;m a wedding vendor</div>
              <div className="text-[10px] text-stone-500">Get couple leads</div>
            </button>
          </div>

          {/* Social Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignup}
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
            <span>Sign up with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-stone-400 font-medium uppercase tracking-wider">
                or sign up with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-3.5 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {role === "couple" ? "Couple names (e.g. Adaeze & Tunde)" : "Business / Brand name"} *
              </label>
              <input
                type="text"
                required
                placeholder={role === "couple" ? "Adaeze & Tunde" : "Bimpe Onakoya Artistry"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Email address *</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                WhatsApp Phone number (for instant RSVP alerts)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 803 123 4567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 8 characters"
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

              {password && (
                <div className="mt-1.5 flex items-center gap-1.5">
                  <div className="flex-1 h-1 rounded-full bg-stone-200 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        strength <= 1
                          ? "w-1/4 bg-rose-500"
                          : strength === 2
                          ? "w-2/4 bg-amber-500"
                          : strength === 3
                          ? "w-3/4 bg-blue-500"
                          : "w-full bg-emerald-500"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-stone-400 font-semibold">
                    {strength <= 1 ? "Weak" : strength <= 3 ? "Good" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 text-xs text-stone-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="rounded accent-coral-500 mt-0.5 shrink-0"
                />
                <span>
                  I agree to Fidale Events&apos;{" "}
                  <a href="#" className="text-coral-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-coral-600 hover:underline">
                    NDPC Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreed}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-coral-500 to-aso-600 hover:from-coral-600 hover:to-aso-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-md shadow-coral-500/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-stone-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-coral-600 hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

