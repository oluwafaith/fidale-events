"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Heart,
  Store,
  Briefcase,
  ShieldCheck,
  Menu,
  X,
  ExternalLink,
  Search,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/templates", label: "Templates" },
  { href: "/vendors", label: "Vendors" },
  { href: "/dashboard", label: "Couple Studio", badge: "Live" },
  { href: "/vendor-dashboard", label: "Vendor Portal" },
  { href: "/admin", label: "Admin HQ" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useFidaleEvents();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [findModalOpen, setFindModalOpen] = useState(false);
  const [searchCoupleQuery, setSearchCoupleQuery] = useState("");

  const isWeddingSite = pathname?.startsWith("/w/");
  const isPreviewPage = pathname?.startsWith("/preview");

  if (isPreviewPage) {
    return null;
  }

  const handleSearchCouple = (e: React.FormEvent) => {
    e.preventDefault();
    setFindModalOpen(false);
    router.push("/w/adaeze-and-tunde");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all ${
          isWeddingSite
            ? "bg-aso-900/95 text-white border-b border-white/10 backdrop-blur-md"
            : "bg-white/95 text-stone-900 border-b border-stone-200/80 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Logo & Joy-style Find Wedding trigger */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-coral-500 via-aso-600 to-amber-400 flex items-center justify-center text-white font-display font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                  F
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-display font-bold text-lg tracking-tight ${
                      isWeddingSite ? "text-white" : "text-stone-900"
                    }`}
                  >
                    Fidale<span className="text-coral-500">Events</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-coral-500/10 text-coral-600 border border-coral-500/20">
                    NG
                  </span>
                </div>
              </Link>

              {/* Joy-style "Find a Couple" search pill */}
              {!isWeddingSite && (
                <button
                  onClick={() => setFindModalOpen(true)}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100/80 hover:bg-stone-200/70 text-stone-500 hover:text-stone-800 text-xs font-medium transition-colors border border-stone-200/60"
                >
                  <Search className="w-3.5 h-3.5 text-stone-400" />
                  <span>Find a couple&apos;s wedding...</span>
                </button>
              )}
            </div>

            {/* Middle: Clean Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : item.href.startsWith("/#")
                    ? false
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-stone-900 text-white shadow-sm"
                        : isWeddingSite
                        ? "text-stone-200 hover:bg-white/10 hover:text-white"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Auth State (Login / Sign Up or User Dropdown) */}
            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-stone-200 hover:border-stone-300 bg-white transition-all text-xs font-semibold text-stone-800 shadow-sm"
                  >
                    <div className="w-7 h-7 rounded-full bg-coral-500 text-white flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span className="max-w-[120px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-stone-200 p-2 z-50 text-xs space-y-1">
                      <div className="px-3 py-2 border-b border-stone-100 mb-1">
                        <div className="font-bold text-stone-900 truncate">{user.name}</div>
                        <div className="text-[11px] text-stone-400 truncate">{user.email}</div>
                        <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral-50 text-coral-700 capitalize">
                          {user.role} Account
                        </span>
                      </div>

                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-coral-500" />
                        <span>Couple Planning Studio</span>
                      </Link>

                      <Link
                        href="/w/adaeze-and-tunde"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium"
                      >
                        <Heart className="w-4 h-4 text-coral-500 fill-coral-500" />
                        <span>Live Wedding Website</span>
                      </Link>

                      <Link
                        href="/vendor-dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 hover:text-stone-900 font-medium"
                      >
                        <Briefcase className="w-4 h-4 text-aso-600" />
                        <span>Vendor Portal</span>
                      </Link>

                      <div className="border-t border-stone-100 pt-1 mt-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-medium text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-coral-500 hover:bg-coral-600 shadow-sm shadow-coral-500/20 transition-all"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl ${
                isWeddingSite ? "text-white hover:bg-white/10" : "text-stone-700 hover:bg-stone-100"
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white text-stone-900 border-b border-stone-200 px-4 pt-3 pb-5 space-y-2 shadow-xl">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setFindModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-stone-100 text-stone-600 text-xs font-medium"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find a couple&apos;s wedding...</span>
            </button>

            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100"
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              {user ? (
                <div className="space-y-2">
                  <div className="text-xs text-stone-500 px-2">
                    Signed in as <strong>{user.name}</strong> ({user.role})
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-800"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center py-2.5 rounded-xl bg-coral-500 text-xs font-bold text-white"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Joy-Style "Find a Wedding" Modal */}
      {findModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setFindModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-coral-600">
                Guest Portal
              </span>
              <h3 className="font-display font-bold text-2xl text-stone-900">
                Find a Couple&apos;s Wedding
              </h3>
              <p className="text-xs text-stone-500">
                Enter couple names or wedding URL to RSVP, view their schedule, and send gifts.
              </p>

              <form onSubmit={handleSearchCouple} className="space-y-3 pt-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adaeze and Tunde"
                    value={searchCoupleQuery}
                    onChange={(e) => setSearchCoupleQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-coral-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-stone-900">Adaeze & Tunde&apos;s Wedding</div>
                    <div className="text-[11px] text-stone-500">14 Nov 2026 • Victoria Island, Lagos</div>
                  </div>
                  <Link
                    href="/w/adaeze-and-tunde"
                    onClick={() => setFindModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg bg-coral-500 text-white font-bold text-xs"
                  >
                    View Site →
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs"
                >
                  Search Wedding
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
