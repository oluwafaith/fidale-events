"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ShieldCheck,
  Star,
  Globe2,
  Clock,
  CheckCircle2,
  X,
  Sparkles,
  Filter,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { VENDORS, VendorProfile, formatNaira } from "@/lib/mock-data";
import { useFidaleEvents } from "@/context/FidaleEventsContext";

const CATEGORIES = [
  "All",
  "Venues",
  "Photographers",
  "Caterers",
  "Decorators",
  "MCs & DJs",
  "Makeup Artists",
  "Aso-Ebi Tailors",
  "Live Bands",
];

export default function VendorMarketplacePage() {
  const { addVendorLead } = useFidaleEvents();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [diasporaOnly, setDiasporaOnly] = useState(false);

  // Quote Request Modal State
  const [quoteVendor, setQuoteVendor] = useState<VendorProfile | null>(null);
  const [quoteEventType, setQuoteEventType] = useState<string>("Wedding");
  const [coupleNames, setCoupleNames] = useState("Adaeze & Tunde");
  const [weddingDate, setWeddingDate] = useState("2026-11-14");
  const [guestCount, setGuestCount] = useState(350);
  const [budgetInput, setBudgetInput] = useState("₦950,000");
  const [phoneInput, setPhoneInput] = useState("+234 803 555 0192");
  const [messageInput, setMessageInput] = useState(
    "Hello! We found your verified profile on Fidale Events. Are you available for our celebration date in Lagos?"
  );
  const [quoteSent, setQuoteSent] = useState(false);

  const filteredVendors = VENDORS.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "All" || v.city === selectedCity;
    const matchesCategory = selectedCategory === "All" || v.category === selectedCategory;
    const matchesVerified = !verifiedOnly || v.isVerified;
    const matchesDiaspora = !diasporaOnly || v.diasporaFriendly;
    return (
      matchesSearch &&
      matchesCity &&
      matchesCategory &&
      matchesVerified &&
      matchesDiaspora
    );
  });

  const handleSendQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteVendor) return;
    addVendorLead({
      coupleNames: `${coupleNames} (${quoteEventType})`,
      weddingDate,
      city: quoteVendor.city,
      guestCount,
      estimatedBudget: budgetInput,
      message: `[Event: ${quoteEventType} - For ${quoteVendor.name}] ${messageInput}`,
      phone: phoneInput,
    });
    setQuoteSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-stone-950 via-aso-950 to-stone-900 text-white py-12 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KYC & CAC-Verified Nigerian Wedding Marketplace</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-bold">
                Find Trusted Wedding Vendors
              </h1>
              <p className="text-sm sm:text-base text-stone-300 mt-2 max-w-2xl">
                Compare transparent Naira price bands, check Saturday date availability, and request
                instant WhatsApp quotes from verified professionals in Lagos, Abuja, and Port Harcourt.
              </p>
            </div>

            <Link
              href="/vendor-dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white self-start md:self-auto"
            >
              <span>Are you a vendor? Open Vendor Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Search & City Bar */}
          <div className="mt-8 bg-white p-2.5 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-12 gap-2 text-stone-900">
            <div className="md:col-span-5 flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-xl">
              <Search className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                placeholder="Search makeup, Jollof caterer, Ikoyi, Maitama..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm focus:outline-none"
              />
            </div>

            <div className="md:col-span-3 flex items-center gap-1 bg-stone-50 p-1 rounded-xl">
              {["All", "Lagos", "Abuja", "Port Harcourt"].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                    selectedCity === city
                      ? "bg-coral-500 text-white shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {city === "Port Harcourt" ? "PH" : city}
                </button>
              ))}
            </div>

            <div className="md:col-span-4 flex items-center justify-end gap-2 px-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded accent-emerald-600"
                />
                <span>CAC Verified Only</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs font-bold text-stone-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={diasporaOnly}
                  onChange={(e) => setDiasporaOnly(e.target.checked)}
                  className="rounded accent-aso-600"
                />
                <span>Diaspora Ready</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Vendor Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className={`rounded-2xl bg-white border-2 p-6 transition-all flex flex-col justify-between ${
                vendor.tier === "Featured"
                  ? "border-coral-300 shadow-md"
                  : "border-stone-200 shadow-sm"
              }`}
            >
              <div>
                {/* Top Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {vendor.tier === "Featured" && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-coral-500 to-amber-500 text-white">
                        ★ Featured Partner
                      </span>
                    )}
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-aso-50 text-aso-700 border border-aso-200">
                      {vendor.category}
                    </span>
                    {vendor.isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified ({vendor.cacNumber})
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
                        Free Tier • KYC Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{vendor.rating}</span>
                    <span className="text-stone-400 font-normal">
                      ({vendor.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Vendor Title & Location */}
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-display text-xl font-bold text-stone-900">
                      {vendor.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 mt-0.5">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-coral-500" />
                        {vendor.neighborhood}, {vendor.city}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-aso-600" />
                        {vendor.responseTime}
                      </span>
                      {vendor.diasporaFriendly && (
                        <span className="inline-flex items-center gap-1 text-aso-700 font-semibold">
                          <Globe2 className="w-3.5 h-3.5" />
                          Diaspora Zoom Consults
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:text-right bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200">
                    <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">
                      Indicative Pricing
                    </div>
                    <div className="text-sm font-display font-bold text-stone-900">
                      {vendor.priceBandLabel}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-stone-600">{vendor.tagline}</p>

                {/* Packages Preview */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {vendor.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="p-3 rounded-xl bg-[#FFFDF9] border border-stone-200 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-stone-900">
                        <span>{pkg.name}</span>
                        <span className="text-coral-600">{formatNaira(pkg.price)}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">{pkg.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-5 pt-4 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Open Saturdays: {vendor.availableDates.slice(0, 3).join(", ")}</span>
                </div>

                <button
                  onClick={() => {
                    setQuoteVendor(vendor);
                    setQuoteSent(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-coral-600 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  Request Instant Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REQUEST QUOTE MODAL */}
      {quoteVendor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setQuoteVendor(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>

            {quoteSent ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-display text-2xl font-bold text-stone-900">
                  Quote Request Sent!
                </h3>
                <p className="text-xs text-stone-600">
                  Your inquiry has been routed to <strong>{quoteVendor.name}</strong> via WhatsApp
                  & Vendor Inbox. Typical response time: <strong>{quoteVendor.responseTime}</strong>.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/vendor-dashboard"
                    className="w-full py-2.5 rounded-xl bg-aso-600 text-white text-xs font-bold"
                  >
                    View This Lead in Vendor Portal →
                  </Link>
                  <button
                    onClick={() => setQuoteVendor(null)}
                    className="w-full py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold"
                  >
                    Back to Marketplace
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendQuoteRequest} className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-coral-600">
                    Direct Vendor Inquiry
                  </span>
                  <h3 className="font-display text-xl font-bold text-stone-900">
                    {quoteVendor.name}
                  </h3>
                  <p className="text-stone-500 text-[11px]">
                    Indicative Band: {quoteVendor.priceBandLabel} • {quoteVendor.city}
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Event Celebration Type</label>
                  <select
                    value={quoteEventType}
                    onChange={(e) => setQuoteEventType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    <option value="Wedding">💍 Wedding (Trad & White)</option>
                    <option value="Baby Shower">🍼 Baby Shower & Dedication</option>
                    <option value="Birthday">🎂 Milestone Birthday Owambe (40th/50th/60th)</option>
                    <option value="Celebration of Life">🕊️ Celebration of Life / Memorial</option>
                    <option value="Corporate Gala">🏢 Corporate Dinner & Gala</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Host / Couple Names</label>
                    <input
                      type="text"
                      required
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Event Date</label>
                    <input
                      type="date"
                      required
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Estimated Guests
                    </label>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Target Budget (₦)
                    </label>
                    <input
                      type="text"
                      value={budgetInput}
                      onChange={(e) => setBudgetInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Your WhatsApp Number (for Fast Quote)
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Ceremony Details & Questions
                  </label>
                  <textarea
                    rows={3}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Send Quote Request via WhatsApp & Portal
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

