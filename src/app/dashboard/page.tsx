"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Palette,
  Users,
  Wallet,
  Share2,
  ExternalLink,
  Smartphone,
  Monitor,
  Plus,
  Download,
  Upload,
  CheckCircle2,
  Copy,
  Check,
  QrCode,
  Sparkles,
  Building2,
  ArrowUpRight,
  Eye,
  EyeOff,
  MessageCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import {
  WEDDING_TEMPLATES,
  formatNaira,
  GuestItem,
  SAMPLE_EVENTS,
  EventCategory,
} from "@/lib/mock-data";

type StudioTab = "builder" | "guests" | "registry" | "whatsapp";

export default function CoupleDashboardPage() {
  const {
    siteConfig,
    updateSiteConfig,
    loadPresetEvent,
    selectedTemplate,
    guests,
    addGuest,
    updateGuestStatus,
    giftFunds,
    transactions,
  } = useFidaleEvents();

  const [activeTab, setActiveTab] = useState<StudioTab>("builder");
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop">("mobile");
  const [guestFilter, setGuestFilter] = useState<string>("All");
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState<string | null>(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [csvExported, setCsvExported] = useState(false);
  const [templateToast, setTemplateToast] = useState<string | null>(null);

  // Add Guest Form State
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("+234 ");
  const [newGuestSide, setNewGuestSide] = useState<GuestItem["side"]>("Bride's Side");
  const [newGuestMeal, setNewGuestMeal] = useState("Smoky Party Jollof & Peppered Turkey");
  const [newGuestAsoEbi, setNewGuestAsoEbi] = useState<GuestItem["asoEbiStatus"]>("Paid (₦65k)");

  // Computed Guest Metrics
  const confirmedGuests = guests.filter((g) => g.rsvpStatus === "Confirmed");
  const totalHeadcount = confirmedGuests.reduce((acc, g) => acc + 1 + g.plusOnes, 0);
  const asoEbiPaidCount = guests.filter((g) => g.asoEbiStatus.startsWith("Paid")).length;
  const totalGiftsRaised = giftFunds.reduce((acc, item) => acc + item.raisedAmount, 0);

  const filteredGuests =
    guestFilter === "All" ? guests : guests.filter((g) => g.side === guestFilter);

  const handleAddGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    addGuest({
      fullName: newGuestName.trim(),
      phone: newGuestPhone,
      side: newGuestSide,
      rsvpStatus: "Confirmed",
      eventsAttending: ["Traditional", "White Wedding"],
      mealPreference: newGuestMeal,
      asoEbiStatus: newGuestAsoEbi,
      plusOnes: 0,
    });
    setNewGuestName("");
    setShowAddGuestModal(false);
  };

  const handleExportCSV = () => {
    setCsvExported(true);
    setTimeout(() => setCsvExported(false), 3000);
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsg(key);
    setTimeout(() => setCopiedMsg(null), 2500);
  };

  const whatsappTemplates = [
    {
      id: "squad",
      group: "Bride's Squad & Groom's Guys",
      message: `Hey fam! 🎉 Adaeze & Tunde are getting married on Saturday, 14 Nov 2026 in Lagos! Please RSVP in 60 seconds, pick your Jollof/Swallow meal preference, and book your ₦65k Coral & Gold Aso-Ebi pack here 👉 https://fidaleevents.com/w/${siteConfig.slug} (${siteConfig.hashtag})`,
    },
    {
      id: "vip-parents",
      group: "Parents' VIP Friends & Elders",
      message: `Good day Sir/Ma, The families of Chief Nwosu & Engr. Bakare cordially invite you to the Traditional & Solemnization of Matrimony of our children, Adaeze & Tunde, on 14th November 2026 at The Civic Centre & Landmark Event Centre, Victoria Island. Kindly confirm your attendance for VIP High Table reservation here: https://fidaleevents.com/w/${siteConfig.slug}`,
    },
    {
      id: "diaspora",
      group: "UK / US / Canada Diaspora Guests",
      message: `Counting down to Lagos in November! ✈️🇳🇬 Check out our wedding website for hotel discounts in Victoria Island, airport pickup details, schedule, and GBP/USD cash gift registry: https://fidaleevents.com/w/${siteConfig.slug}`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20">
      {/* Studio Top Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-coral-600">
                  Couple Planning Studio
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ● Published & Live
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                {siteConfig.coupleNames} • {siteConfig.hashtag}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                Public URL:{" "}
                <Link
                  href="/w/adaeze-and-tunde"
                  className="font-bold text-aso-700 underline hover:text-coral-600"
                >
                  fidaleevents.com/w/{siteConfig.slug}
                </Link>{" "}
                • {siteConfig.eventType || "Event"} Date: {siteConfig.weddingDate}
              </p>

              {/* Celebration Type Switcher */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[11px] font-bold text-stone-400">Switch Event Type:</span>
                {SAMPLE_EVENTS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      loadPresetEvent(preset.id);
                      setTemplateToast(`Loaded sample: ${preset.title}`);
                      setTimeout(() => setTemplateToast(null), 3000);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      siteConfig.slug === preset.slug
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                    }`}
                  >
                    {preset.category === "Wedding" && "💍 Wedding"}
                    {preset.category === "Baby Shower" && "🍼 Baby Shower"}
                    {preset.category === "Birthday" && "🎂 60th Birthday"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/w/adaeze-and-tunde"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm transition-colors"
              >
                <span>Open Live Guest Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/vendors"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-coral-50 hover:bg-coral-100 text-coral-700 border border-coral-200 text-xs font-bold transition-colors"
              >
                <span>Book Verified Vendors</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Studio Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: "builder", label: "1. Website Builder & Templates", icon: Palette },
              {
                id: "guests",
                label: `2. Guest List & RSVPs (${guests.length})`,
                icon: Users,
              },
              {
                id: "registry",
                label: `3. Cash Gifts & Aso-Ebi (${formatNaira(totalGiftsRaised)})`,
                icon: Wallet,
              },
              {
                id: "whatsapp",
                label: "4. WhatsApp Invites & Print QR",
                icon: Share2,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as StudioTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-coral-500 text-white shadow-sm shadow-coral-500/25"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200/70 hover:text-stone-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN STUDIO WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: WEBSITE BUILDER */}
        {activeTab === "builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Editor Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Template Picker Card */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h2 className="font-display font-bold text-lg text-stone-900">
                      Choose Your Wedding Template
                    </h2>
                    <p className="text-xs text-stone-500">
                      Switch designs anytime — your story, event schedule, and RSVPs update automatically.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/templates"
                      className="text-xs font-bold text-coral-600 hover:underline"
                    >
                      Browse full gallery →
                    </Link>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-aso-50 text-aso-700">
                      Active: {selectedTemplate.name}
                    </span>
                  </div>
                </div>

                {templateToast && (
                  <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{templateToast}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {WEDDING_TEMPLATES.map((tpl) => {
                    const active = siteConfig.selectedTemplateId === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        onClick={() => {
                          updateSiteConfig({ selectedTemplateId: tpl.id });
                          setTemplateToast(`Template loaded: ${tpl.name}! Live preview updated.`);
                          setTimeout(() => setTemplateToast(null), 3000);
                        }}
                        className={`text-left rounded-xl p-3 border-2 transition-all ${
                          active
                            ? "border-coral-500 bg-coral-50/30 shadow-sm"
                            : "border-stone-200 hover:border-stone-300 bg-white"
                        }`}
                      >
                        <div className={`h-14 rounded-lg ${tpl.previewGradient} mb-2.5 p-2 flex items-end justify-between text-white`}>
                          <span className="text-[10px] font-bold">{tpl.style}</span>
                          {active && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <div className="font-bold text-xs text-stone-900 truncate">
                          {tpl.name}
                        </div>
                        <div className="text-[10px] text-stone-500 mt-0.5">
                          {tpl.isPremium ? "Premium (₦15k)" : "Free Template"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hero & Story Block Editor */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                <h2 className="font-display font-bold text-lg text-stone-900">
                  Couple Details & Our Story
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Couple Names
                    </label>
                    <input
                      type="text"
                      value={siteConfig.coupleNames}
                      onChange={(e) => updateSiteConfig({ coupleNames: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-coral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Wedding Hashtag
                    </label>
                    <input
                      type="text"
                      value={siteConfig.hashtag}
                      onChange={(e) => updateSiteConfig({ hashtag: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-coral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Welcome Headline
                  </label>
                  <input
                    type="text"
                    value={siteConfig.heroTitle}
                    onChange={(e) => updateSiteConfig({ heroTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-coral-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Our Love Story
                  </label>
                  <textarea
                    rows={3}
                    value={siteConfig.ourStory}
                    onChange={(e) => updateSiteConfig({ ourStory: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-coral-500"
                  />
                </div>
              </div>

              {/* Dual Event Schedule & Aso-Ebi Colours */}
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                <h2 className="font-display font-bold text-lg text-stone-900">
                  Ceremony Venues & Aso-Ebi Colours
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Traditional Engagement Venue
                    </label>
                    <input
                      type="text"
                      value={siteConfig.tradVenue}
                      onChange={(e) => updateSiteConfig({ tradVenue: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-coral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      White Wedding & Reception Venue
                    </label>
                    <input
                      type="text"
                      value={siteConfig.whiteVenue}
                      onChange={(e) => updateSiteConfig({ whiteVenue: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-coral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Bride&apos;s Family Colour
                    </label>
                    <input
                      type="text"
                      value={siteConfig.asoEbiBrideColor}
                      onChange={(e) => updateSiteConfig({ asoEbiBrideColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Groom&apos;s Family Colour
                    </label>
                    <input
                      type="text"
                      value={siteConfig.asoEbiGroomColor}
                      onChange={(e) => updateSiteConfig({ asoEbiGroomColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Aso-Ebi Pack Price (₦)
                    </label>
                    <input
                      type="number"
                      value={siteConfig.asoEbiPrice}
                      onChange={(e) =>
                        updateSiteConfig({ asoEbiPrice: Number(e.target.value) || 65000 })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Live Interactive Preview Frame (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-700">
                      Real-Time Site Preview
                    </span>
                    <Link
                      href="/preview"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-coral-600 hover:text-coral-700 bg-coral-50 hover:bg-coral-100 px-2 py-0.5 rounded-lg border border-coral-200"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Fullscreen</span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                    <button
                      onClick={() => setPreviewMode("mobile")}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        previewMode === "mobile"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-500"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile</span>
                    </button>
                    <button
                      onClick={() => setPreviewMode("desktop")}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        previewMode === "desktop"
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-500"
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Wide</span>
                    </button>
                  </div>
                </div>

                {/* Preview Container */}
                <div
                  className={`mx-auto transition-all rounded-2xl overflow-hidden border-2 border-stone-800 shadow-lg ${
                    previewMode === "mobile" ? "max-w-[330px]" : "w-full"
                  }`}
                >
                  <div className={`${selectedTemplate.previewGradient} p-6 text-white text-center transition-all duration-300`}>
                    <div className="text-[10px] uppercase tracking-widest opacity-90">
                      {siteConfig.eventType || "Event"} • {siteConfig.hashtag}
                    </div>
                    <h3 className={`text-2xl font-bold mt-1 ${selectedTemplate.fontClass}`}>
                      {siteConfig.coupleNames}
                    </h3>
                    <p className="text-xs opacity-90 mt-1">{siteConfig.heroTitle}</p>
                  </div>

                  <div className="p-4 bg-[#FFFDF9] space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-stone-200">
                      <div className="font-bold text-stone-900">
                        {siteConfig.eventType === "Baby Shower"
                          ? "Waiting for Baby Zara"
                          : siteConfig.eventType === "Birthday"
                          ? "Milestone Celebration"
                          : "Our Story"}
                      </div>
                      <p className="text-stone-600 text-[11px] mt-1 line-clamp-3">
                        {siteConfig.ourStory}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-2">
                      <div className="font-bold text-stone-900">
                        {siteConfig.eventType === "Baby Shower"
                          ? "Brunch & Games Schedule"
                          : siteConfig.eventType === "Birthday"
                          ? "Thanksgiving & Banquet"
                          : "Event Schedule"}
                      </div>
                      <div className="flex items-start gap-2 text-[11px]">
                        <Calendar className="w-3.5 h-3.5 text-coral-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Session 1:</span> {siteConfig.tradVenue}
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-aso-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Session 2:</span>{" "}
                          {siteConfig.whiteVenue}
                        </div>
                      </div>
                    </div>

                    <div className={`p-3 rounded-xl border flex items-center justify-between ${selectedTemplate.accentBadge}`}>
                      <div>
                        <div className="font-bold text-[11px]">
                          {siteConfig.eventType === "Baby Shower"
                            ? "Dress Code: Pastel Chic"
                            : siteConfig.eventType === "Birthday"
                            ? "Dress Code: Gold Royalty"
                            : `Aso-Ebi: ${formatNaira(siteConfig.asoEbiPrice)}`}
                        </div>
                        <div className="text-[10px] opacity-80">
                          {siteConfig.asoEbiBrideColor} • {siteConfig.asoEbiGroomColor}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href="/preview"
                          className="px-2.5 py-1.5 rounded-lg bg-stone-900 text-white font-bold text-[10px] hover:bg-stone-800"
                        >
                          Device Preview →
                        </Link>
                        <Link
                          href="/w/adaeze-and-tunde"
                          className={`px-2.5 py-1.5 rounded-lg text-white font-bold text-[10px] ${selectedTemplate.accentButton}`}
                        >
                          Live Site →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GUEST LIST & RSVP MANAGER */}
        {activeTab === "guests" && (
          <div className="space-y-6">
            {/* Guest KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-semibold">Total Guest Groups</div>
                <div className="text-2xl font-display font-bold text-stone-900 mt-1">
                  {guests.length} Groups
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                  RSVP Cut-off: {siteConfig.rsvpDeadline}
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-semibold">
                  Confirmed Headcount (inc. +1s)
                </div>
                <div className="text-2xl font-display font-bold text-emerald-700 mt-1">
                  {totalHeadcount} Guests
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  {confirmedGuests.length} primary invites confirmed
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-semibold">Aso-Ebi Packs Paid</div>
                <div className="text-2xl font-display font-bold text-aso-700 mt-1">
                  {asoEbiPaidCount} Packs
                </div>
                <div className="text-[11px] text-stone-500 mt-1">
                  @ {formatNaira(siteConfig.asoEbiPrice)} per guest pack
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                <div className="text-xs text-stone-500 font-semibold">Diaspora RSVPs</div>
                <div className="text-2xl font-display font-bold text-coral-600 mt-1">
                  {guests.filter((g) => g.side === "Diaspora").length} Families
                </div>
                <div className="text-[11px] text-stone-500 mt-1">UK, US & Canada arrivals</div>
              </div>
            </div>

            {/* Filter & Action Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {["All", "Bride's Side", "Groom's Side", "Parents VIP", "Diaspora"].map(
                  (group) => (
                    <button
                      key={group}
                      onClick={() => setGuestFilter(group)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        guestFilter === group
                          ? "bg-stone-900 text-white"
                          : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {group}
                    </button>
                  )
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowAddGuestModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Guest</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{csvExported ? "CSV Exported!" : "Export Caterer CSV"}</span>
                </button>
              </div>
            </div>

            {/* Guest List Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      <th className="py-3.5 px-4">Guest Name & Phone</th>
                      <th className="py-3.5 px-4">Side / Group</th>
                      <th className="py-3.5 px-4">RSVP Status</th>
                      <th className="py-3.5 px-4">Meal Choice</th>
                      <th className="py-3.5 px-4">Aso-Ebi Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-xs">
                    {filteredGuests.map((guest) => (
                      <tr key={guest.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-stone-900">
                            {guest.fullName}{" "}
                            {guest.plusOnes > 0 && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                                +{guest.plusOnes} guest
                              </span>
                            )}
                          </div>
                          <div className="text-stone-500 text-[11px]">{guest.phone}</div>
                          {guest.dietaryNotes && (
                            <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                              Note: {guest.dietaryNotes}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-aso-50 text-aso-700 border border-aso-200">
                            {guest.side}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              guest.rsvpStatus === "Confirmed"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : guest.rsvpStatus === "Pending"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {guest.rsvpStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-stone-700 font-medium">
                          {guest.mealPreference}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold ${
                              guest.asoEbiStatus.startsWith("Paid")
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            {guest.asoEbiStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          {guest.rsvpStatus !== "Confirmed" ? (
                            <button
                              onClick={() => updateGuestStatus(guest.id, "Confirmed")}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                            >
                              Mark Confirmed
                            </button>
                          ) : (
                            <span className="text-[11px] text-stone-400">{guest.updatedAt}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add Guest Modal */}
            {showAddGuestModal && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
                  <h3 className="font-display font-bold text-lg text-stone-900">
                    Add Guest to Wedding List
                  </h3>
                  <form onSubmit={handleAddGuestSubmit} className="mt-4 space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief & Mrs. Olatunji Bello"
                        value={newGuestName}
                        onChange={(e) => setNewGuestName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        WhatsApp Phone Number
                      </label>
                      <input
                        type="text"
                        value={newGuestPhone}
                        onChange={(e) => setNewGuestPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Guest Side</label>
                        <select
                          value={newGuestSide}
                          onChange={(e) => setNewGuestSide(e.target.value as GuestItem["side"])}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                        >
                          <option value="Bride's Side">Bride&apos;s Side</option>
                          <option value="Groom's Side">Groom&apos;s Side</option>
                          <option value="Parents VIP">Parents VIP</option>
                          <option value="Diaspora">Diaspora</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-stone-700 mb-1">Aso-Ebi Pack</label>
                        <select
                          value={newGuestAsoEbi}
                          onChange={(e) =>
                            setNewGuestAsoEbi(e.target.value as GuestItem["asoEbiStatus"])
                          }
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                        >
                          <option value="Paid (₦65k)">Paid (₦65k)</option>
                          <option value="Interested">Interested</option>
                          <option value="No Aso-Ebi">No Aso-Ebi</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        Meal Preference
                      </label>
                      <input
                        type="text"
                        value={newGuestMeal}
                        onChange={(e) => setNewGuestMeal(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300"
                      />
                    </div>
                    <div className="pt-3 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddGuestModal(false)}
                        className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-coral-500 text-white font-bold"
                      >
                        Save Guest
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CASH GIFT & ASO-EBI REGISTRY LEDGER */}
        {activeTab === "registry" && (
          <div className="space-y-6">
            {/* Top Settlement & Fee Configuration Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Bank Payout Card (7 cols) */}
              <div className="lg:col-span-7 bg-gradient-to-br from-stone-900 via-aso-900 to-stone-950 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                      Paystack & Flutterwave Escrow Wallet
                    </span>
                    <div className="text-3xl sm:text-4xl font-display font-bold mt-1">
                      {formatNaira(totalGiftsRaised)}
                    </div>
                    <p className="text-xs text-stone-300 mt-1">
                      Total raised across Cash Funds, Aso-Ebi Packs & Retail Registry
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/15 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                      <Building2 className="w-4 h-4" />
                      <span>T+1 Payout Bank Linked</span>
                    </div>
                    <div className="mt-1 font-semibold">GTBank • 0149823410</div>
                    <div className="text-[11px] text-stone-300">
                      Adaeze Nwosu & Tunde Bakare Joint
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-stone-300">
                    Available for instant T+1 settlement:{" "}
                    <strong className="text-white">{formatNaira(1665000)}</strong>
                  </div>
                  <button
                    onClick={() => {
                      setWithdrawSuccess(true);
                      setTimeout(() => setWithdrawSuccess(false), 4000);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs transition-colors"
                  >
                    {withdrawSuccess
                      ? "✓ T+1 Transfer Initiated to GTBank!"
                      : "Withdraw to GTBank (T+1)"}
                  </button>
                </div>
              </div>

              {/* Fee Placement & Privacy Controls (5 cols - PRD §7 & §13) */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-stone-900">
                    Gift Checkout & Fee Settings
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-coral-50 text-coral-600">
                    1.5% Platform Fee
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="text-xs font-bold text-stone-800">
                    Who pays the 1.5% gift processing fee?
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateSiteConfig({ feePlacement: "Guest" })}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        siteConfig.feePlacement === "Guest"
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-white text-stone-600 border-stone-200"
                      }`}
                    >
                      Guest at Checkout
                    </button>
                    <button
                      onClick={() => updateSiteConfig({ feePlacement: "Couple" })}
                      className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
                        siteConfig.feePlacement === "Couple"
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-white text-stone-600 border-stone-200"
                      }`}
                    >
                      Absorb from Payout
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {siteConfig.feePlacement === "Guest"
                      ? "A ₦50,000 gift charges the guest ₦50,750 with full upfront disclosure."
                      : "A ₦50,000 gift charges the guest ₦50,000 flat; ₦49,250 settles to your bank."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-xs font-bold text-stone-800">
                      Public Gift Amounts on Wedding Page
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Choose whether guests can see total progress bars
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      updateSiteConfig({
                        showGiftAmountsPublicly: !siteConfig.showGiftAmountsPublicly,
                      })
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                      siteConfig.showGiftAmountsPublicly
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-stone-100 text-stone-700 border-stone-300"
                    }`}
                  >
                    {siteConfig.showGiftAmountsPublicly ? (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Hidden
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Active Registry Funds Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {giftFunds.slice(0, 3).map((fund) => {
                const pct = Math.min(100, Math.round((fund.raisedAmount / fund.targetAmount) * 100));
                return (
                  <div
                    key={fund.id}
                    className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-coral-600">{fund.category}</span>
                      <span className="text-stone-500">{fund.contributorsCount} gifts</span>
                    </div>
                    <h4 className="font-display font-bold text-base text-stone-900 mt-1">
                      {fund.title}
                    </h4>
                    <div className="mt-3 flex items-baseline justify-between text-xs">
                      <span className="font-bold text-stone-900">
                        {formatNaira(fund.raisedAmount)}
                      </span>
                      <span className="text-stone-500">
                        of {formatNaira(fund.targetAmount)} ({pct}%)
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-coral-500 to-aso-600 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Gift Transactions Ledger */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-stone-900">
                  Gift & Aso-Ebi Transaction Ledger
                </h3>
                <Link
                  href="/w/adaeze-and-tunde#registry"
                  className="text-xs font-bold text-coral-600 hover:underline"
                >
                  + Test Sending a Gift on Live Site →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      <th className="py-3 px-4">Ref & Guest</th>
                      <th className="py-3 px-4">Fund / Item</th>
                      <th className="py-3 px-4">Gift Amount</th>
                      <th className="py-3 px-4">1.5% Fee</th>
                      <th className="py-3 px-4">Payment Channel</th>
                      <th className="py-3 px-4">Settlement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-xs">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-stone-50/80">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-stone-900">{tx.guestName}</div>
                          <div className="text-[11px] text-stone-500">
                            {tx.id} • {tx.createdAt}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-stone-800">{tx.giftTitle}</div>
                          <div className="text-[11px] text-stone-500 italic line-clamp-1">
                            “{tx.message}”
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700">
                          {formatNaira(tx.amount)}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600">
                          {formatNaira(tx.platformFee)} ({tx.feePaidBy})
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium text-[11px]">
                            {tx.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              tx.settlementStatus.startsWith("Settled")
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {tx.settlementStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: WHATSAPP INVITES & PRINT QR CODE */}
        {activeTab === "whatsapp" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h2 className="font-display font-bold text-lg text-stone-900">
                  Pre-Formatted WhatsApp Broadcast Templates
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Tailored for Nigerian etiquette: respectful wording for Parents&apos; VIP elders,
                  high-energy invite for friends, and travel logistics for diaspora guests.
                </p>

                <div className="mt-5 space-y-4">
                  {whatsappTemplates.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#FFFDF9] border border-stone-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-aso-800 bg-aso-50 px-2.5 py-1 rounded-full">
                          {item.group}
                        </span>
                        <button
                          onClick={() => handleCopyText(item.id, item.message)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors"
                        >
                          {copiedMsg === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Copied for WhatsApp!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Broadcast Message
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded-lg border border-stone-200/80">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right QR Access Card Preview (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-coral-600">
                  For Printed Invitation Cards
                </span>
                <h3 className="font-display font-bold text-xl text-stone-900 mt-1">
                  Wedding Access & RSVP QR Card
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Drop this QR code onto your physical invitation card or reception table tents so
                  guests can scan to RSVP or spray digital cash gifts.
                </p>

                {/* Styled Printable Card */}
                <div className="mt-6 mx-auto max-w-[260px] rounded-2xl p-6 bg-gradient-to-b from-stone-950 to-aso-950 text-white shadow-xl border-2 border-amber-400/40">
                  <div className="text-[10px] uppercase tracking-widest text-amber-300">
                    Scan to RSVP & Send Gift
                  </div>
                  <div className="font-display font-bold text-lg mt-1">
                    {siteConfig.coupleNames}
                  </div>
                  <div className="my-4 mx-auto w-36 h-36 rounded-xl bg-white p-3 flex flex-col items-center justify-center text-stone-900 shadow-inner">
                    <QrCode className="w-24 h-24 text-stone-900" />
                    <span className="text-[9px] font-bold tracking-tight text-stone-500 mt-1">
                      fidaleevents.com/w/adaeze
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-300 font-medium">
                    14 November 2026 • Lagos
                  </div>
                </div>

                <button
                  onClick={() => handleCopyText("qr", `https://fidaleevents.com/w/${siteConfig.slug}`)}
                  className="mt-5 w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
                >
                  {copiedMsg === "qr"
                    ? "✓ High-Res QR Link Copied!"
                    : "Download Print-Ready PNG / SVG"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

