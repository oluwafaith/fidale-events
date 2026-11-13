"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Users,
  MessageCircle,
  Lock,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Eye,
  Calendar,
  MapPin,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import { formatNaira } from "@/lib/mock-data";

export default function VendorDashboardPage() {
  const { vendorLeads } = useFidaleEvents();
  const [currentTier, setCurrentTier] = useState<"Free" | "Standard" | "Featured">("Free");
  const [upgradedBanner, setUpgradedBanner] = useState(false);

  const handleSelectTier = (tier: "Free" | "Standard" | "Featured") => {
    setCurrentTier(tier);
    if (tier !== "Free") {
      setUpgradedBanner(true);
      setTimeout(() => setUpgradedBanner(false), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-aso-700">
                Vendor Partner Portal
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                KYC Verified • CAC RC-1784920
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Bimpe Onakoya Bridal Artistry
            </h1>
            <p className="text-xs text-stone-500">
              Lekki Phase 1, Lagos • Category: Makeup Artists • Price Band: ₦450k – ₦1.2M
            </p>
          </div>

          {/* Interactive Subscription Tier Switcher (PRD §7) */}
          <div className="bg-stone-100 p-1.5 rounded-2xl flex flex-wrap items-center gap-1">
            <span className="text-[11px] font-bold text-stone-500 px-2">
              Simulate Plan:
            </span>
            {(
              [
                { id: "Free", label: "Free (3 Leads/mo)" },
                { id: "Standard", label: "Standard (₦30k/mo)" },
                { id: "Featured", label: "Featured (₦75k/mo)" },
              ] as const
            ).map((plan) => (
              <button
                key={plan.id}
                onClick={() => handleSelectTier(plan.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentTier === plan.id
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {upgradedBanner && (
          <div className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center justify-between text-xs font-bold shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                Paystack Subscription Active: Upgraded to Vendor {currentTier} Plan! All couple
                leads and WhatsApp numbers are now unlocked.
              </span>
            </div>
          </div>
        )}

        {/* Analytics KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Profile Views (Oct)</span>
              <Eye className="w-4 h-4 text-aso-600" />
            </div>
            <div className="text-2xl font-display font-bold text-stone-900 mt-1">1,428</div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              +34% vs last month
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Quote Leads Received</span>
              <Users className="w-4 h-4 text-coral-500" />
            </div>
            <div className="text-2xl font-display font-bold text-stone-900 mt-1">
              {vendorLeads.length} Leads
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              {currentTier === "Free"
                ? "Free Tier Limit: 3 / 3 used"
                : "Unlimited Leads Unlocked"}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Estimated Pipeline Value</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-display font-bold text-emerald-700 mt-1">
              {formatNaira(3500000)}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              Across 4 active Lagos & Abuja inquiries
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold">
              <span>Current Subscription</span>
              <CreditCard className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-display font-bold text-aso-700 mt-1">
              {currentTier} Plan
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              {currentTier === "Free"
                ? "₦0 / month"
                : currentTier === "Standard"
                ? "₦30,000 / month (Paystack)"
                : "₦75,000 / month (Featured)"}
            </div>
          </div>
        </div>

        {/* Lead Inbox & Paywall Demonstration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-stone-900">
                Couple Quote Inquiries ({vendorLeads.length})
              </h2>
              <Link
                href="/vendors"
                className="text-xs font-bold text-coral-600 hover:underline"
              >
                + Test Submitting a New Quote on Marketplace →
              </Link>
            </div>

            {vendorLeads.map((lead, idx) => {
              const isLocked = currentTier === "Free" && idx >= 3;

              return (
                <div
                  key={lead.id}
                  className={`rounded-2xl bg-white border p-5 transition-all relative overflow-hidden ${
                    isLocked
                      ? "border-amber-300 bg-amber-50/20"
                      : "border-stone-200 shadow-sm"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-base text-stone-900">
                        {lead.coupleNames}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-aso-50 text-aso-700 font-bold">
                        Budget: {lead.estimatedBudget}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-medium">
                      {lead.receivedAt}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-coral-500" />
                      Wedding: {lead.weddingDate}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-aso-600" />
                      {lead.city}
                    </span>
                    <span>{lead.guestCount} Guests</span>
                  </div>

                  {isLocked ? (
                    <div className="mt-4 p-4 rounded-xl bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold">
                            Free Tier Lead Limit Reached (3/3 leads/month)
                          </div>
                          <p className="text-[11px] text-stone-300 mt-0.5">
                            Upgrade to Standard (₦30,000/mo) to unlock {lead.coupleNames}&apos;s
                            message and WhatsApp number.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSelectTier("Standard")}
                        className="px-4 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold shrink-0"
                      >
                        Unlock with Standard (₦30k)
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="mt-3 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                        “{lead.message}”
                      </p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs font-bold text-stone-700">
                          Couple WhatsApp: <span className="text-emerald-700">{lead.phone}</span>
                        </span>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Reply on WhatsApp</span>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Subscription Comparison & KYC Status (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-b from-stone-900 to-aso-950 text-white rounded-2xl p-6 shadow-lg space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                Grow Your Wedding Bookings
              </span>
              <h3 className="font-display text-xl font-bold">
                Vendor Subscription Tiers
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Stop chasing unverified Instagram DMs. Get high-intent couples with confirmed wedding
                dates and transparent budgets.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/15">
                  <div className="flex justify-between font-bold">
                    <span>Standard Verified</span>
                    <span className="text-amber-300">₦30,000 / mo</span>
                  </div>
                  <p className="text-[11px] text-stone-300 mt-1">
                    Unlimited quote leads, full analytics, CAC Verified badge & WhatsApp alerts.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-coral-500/20 border border-coral-400/40">
                  <div className="flex justify-between font-bold">
                    <span>Featured Category Leader</span>
                    <span className="text-coral-300">₦75,000 / mo</span>
                  </div>
                  <p className="text-[11px] text-stone-200 mt-1">
                    Top placement in Lagos/Abuja search results + Couple Studio vendor shortlist.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSelectTier("Featured")}
                className="w-full py-3 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs shadow-md transition-colors"
              >
                Upgrade to Featured via Paystack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

