"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Gift,
  Sparkles,
  CheckCircle2,
  CreditCard,
  Building2,
  Smartphone,
  Globe2,
  ShieldCheck,
  MessageCircle,
  Shirt,
  X,
  Baby,
  Cake,
  Flame,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import {
  WeddingTemplate,
  formatNaira,
  GuestItem,
  GiftItem,
  GiftTransaction,
  EventProfilePreset,
  SAMPLE_EVENTS,
} from "@/lib/mock-data";

interface InteractiveEventViewProps {
  customTemplate?: WeddingTemplate;
  customEvent?: EventProfilePreset;
  onSelectTemplate?: (tpl: WeddingTemplate) => void;
  showStudioLink?: boolean;
}

export function InteractiveEventView({
  customTemplate,
  customEvent,
  onSelectTemplate,
  showStudioLink = true,
}: InteractiveEventViewProps) {
  const {
    siteConfig,
    selectedTemplate: contextTemplate,
    giftFunds,
    transactions,
    addGuest,
    addGiftContribution,
  } = useFidaleEvents();

  // Use override template/event if provided, otherwise context
  const activeTemplate = customTemplate || contextTemplate;
  const activeEvent = customEvent || {
    id: "active",
    category: siteConfig.eventType || "Wedding",
    title: siteConfig.coupleNames,
    coupleNames: siteConfig.coupleNames,
    slug: siteConfig.slug,
    hashtag: siteConfig.hashtag,
    weddingDate: siteConfig.weddingDate,
    city: siteConfig.city,
    selectedTemplateId: activeTemplate.id,
    heroTitle: siteConfig.heroTitle,
    ourStory: siteConfig.ourStory,
    tradVenue: siteConfig.tradVenue,
    tradTime: siteConfig.tradTime,
    whiteVenue: siteConfig.whiteVenue,
    whiteTime: siteConfig.whiteTime,
    asoEbiBrideColor: siteConfig.asoEbiBrideColor,
    asoEbiBrideHex: siteConfig.asoEbiBrideHex,
    asoEbiGroomColor: siteConfig.asoEbiGroomColor,
    asoEbiGroomHex: siteConfig.asoEbiGroomHex,
    asoEbiPrice: siteConfig.asoEbiPrice,
    rsvpDeadline: siteConfig.rsvpDeadline,
    feePlacement: siteConfig.feePlacement,
    showGiftAmountsPublicly: siteConfig.showGiftAmountsPublicly,
    isPremiumCouple: siteConfig.isPremiumCouple,
    customDomain: siteConfig.customDomain,
    customRegistryNote: "",
    rsvpQuestions: siteConfig.rsvpQuestions || SAMPLE_EVENTS[0].rsvpQuestions,
  };

  const isBabyShower = activeEvent.category === "Baby Shower";
  const isBirthday = activeEvent.category === "Birthday";
  const isWedding = activeEvent.category === "Wedding";

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("+234 ");
  const [rsvpSide, setRsvpSide] = useState<string>(
    activeEvent.rsvpQuestions?.sideOptions[0] || "Friend / Family"
  );
  const [rsvpMeal, setRsvpMeal] = useState(
    activeEvent.rsvpQuestions?.mealOptions[0] || "Smoky Party Jollof & Peppered Turkey"
  );
  const [rsvpSpecialAnswer, setRsvpSpecialAnswer] = useState("Yes");
  const [rsvpPlusOnes, setRsvpPlusOnes] = useState(0);
  const [rsvpNotes, setRsvpNotes] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Gift Checkout Modal State
  const [activeGiftId, setActiveGiftId] = useState<string | null>(null);
  const [giftAmount, setGiftAmount] = useState<number>(50000);
  const [giftGuestName, setGiftGuestName] = useState("");
  const [giftMessage, setGiftMessage] = useState(
    isBabyShower
      ? "So excited to welcome baby Zara! May she bring immense joy to your home."
      : isBirthday
      ? "Happy 60th Golden Jubilee Chief! Wishing you many more years of health and impact."
      : "Wishing you both a lifetime of love, peace, and steady blessings!"
  );
  const [paymentMethod, setPaymentMethod] =
    useState<GiftTransaction["paymentMethod"]>("Paystack Transfer");
  const [isPublicGift, setIsPublicGift] = useState(true);
  const [giftSuccessReceipt, setGiftSuccessReceipt] = useState<string | null>(null);

  const selectedGift = giftFunds.find((g: GiftItem) => g.id === activeGiftId) || giftFunds[0];
  const calculatedFee = Math.round(giftAmount * 0.015);
  const totalGuestPayable =
    activeEvent.feePlacement === "Guest" ? giftAmount + calculatedFee : giftAmount;

  const handleOpenGiftModal = (giftId: string, presetAmount?: number) => {
    setActiveGiftId(giftId);
    if (presetAmount) setGiftAmount(presetAmount);
    setGiftSuccessReceipt(null);
  };

  const handleCompleteGiftPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGiftId || !giftGuestName.trim()) return;
    addGiftContribution({
      guestName: giftGuestName.trim(),
      giftId: activeGiftId,
      amount: giftAmount,
      paymentMethod,
      message: giftMessage,
      isPublicAmount: isPublicGift,
    });
    setGiftSuccessReceipt(`PAYSTACK-REF-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    addGuest({
      fullName: rsvpName.trim(),
      phone: rsvpPhone,
      side: rsvpSide as any,
      rsvpStatus: "Confirmed",
      eventsAttending: ["Traditional", "White Wedding"],
      mealPreference: rsvpMeal,
      asoEbiStatus: isWedding ? "Paid (₦65k)" : "Interested",
      plusOnes: rsvpPlusOnes,
      dietaryNotes: `${rsvpSpecialAnswer ? `Response: ${rsvpSpecialAnswer}. ` : ""}${rsvpNotes}`.trim() || undefined,
    });
    setRsvpSubmitted(true);
  };

  return (
    <div className={`w-full ${activeTemplate.fontClass || "font-display"} text-stone-900 bg-[#FFFDF9] transition-all`}>
      {/* HERO SECTION */}
      <section className={`${activeTemplate.previewGradient} text-white py-14 sm:py-20 px-4 relative overflow-hidden text-center`}>
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 backdrop-blur-sm border border-white/20 text-xs font-bold uppercase tracking-wider">
            {isBabyShower && <Baby className="w-3.5 h-3.5 text-pink-300" />}
            {isBirthday && <Cake className="w-3.5 h-3.5 text-amber-300" />}
            {isWedding && <Heart className="w-3.5 h-3.5 text-coral-200 fill-coral-200" />}
            <span>{activeEvent.category}</span>
            <span>•</span>
            <span>{activeEvent.hashtag}</span>
            <span>•</span>
            <span>{activeEvent.weddingDate}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {activeEvent.coupleNames}
          </h1>

          <p className="text-sm sm:text-lg text-white/95 max-w-xl mx-auto font-medium">
            {activeEvent.heroTitle} • {activeEvent.city}
          </p>

          {/* Countdown Blocks */}
          <div className="pt-2 max-w-xs mx-auto grid grid-cols-4 gap-2">
            {[
              { val: "16", label: "Days" },
              { val: "08", label: "Hours" },
              { val: "42", label: "Min" },
              { val: "19", label: "Sec" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-2 text-center"
              >
                <div className="text-lg sm:text-xl font-bold">{item.val}</div>
                <div className="text-[9px] uppercase tracking-widest opacity-80 mt-0.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="#rsvp-section"
              className="px-5 py-2.5 rounded-xl bg-white text-stone-950 hover:bg-stone-100 font-bold text-xs shadow-lg transition-all"
            >
              RSVP in 60s
            </a>
            <a
              href="#registry-section"
              className="px-5 py-2.5 rounded-xl bg-black/35 hover:bg-black/50 text-white border border-white/30 font-bold text-xs backdrop-blur-sm transition-all flex items-center gap-1.5"
            >
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>{isBabyShower ? "Baby Registry" : isBirthday ? "Birthday Toast" : "Send Cash Gift"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* BODY CONTENT CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* STORY / ABOUT SECTION */}
        <section className={`${activeTemplate.cardStyle} p-6 sm:p-8 space-y-4`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${activeTemplate.accentBadge}`}>
              {isBabyShower ? "Waiting for Baby" : isBirthday ? "Celebrant Milestone" : "Our Story"}
            </span>
            <span className="text-xs opacity-75">{activeEvent.city}</span>
          </div>

          <h2 className="text-2xl font-bold">
            {isBabyShower
              ? "Welcoming Our Little Blessing"
              : isBirthday
              ? "60 Years of Grace & Impact"
              : "From Lagos to Forever"}
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed opacity-90">
            {activeEvent.ourStory}
          </p>
        </section>

        {/* EVENT SCHEDULE SECTION */}
        <section className="space-y-4">
          <div className="text-center">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${activeTemplate.accentBadge}`}>
              Event Programme
            </span>
            <h2 className="text-2xl font-bold mt-1">Schedule & Venues</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`${activeTemplate.cardStyle} p-5 space-y-2`}>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${activeTemplate.accentBadge}`}>
                <Clock className="w-3 h-3" />
                <span>{activeEvent.tradTime}</span>
              </div>
              <h3 className="font-bold text-base">
                {isBabyShower ? "1. Welcome & Mocktail Brunch" : isBirthday ? "1. Thanksgiving Service" : "1. Traditional Ceremony"}
              </h3>
              <p className="text-xs opacity-80 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-coral-500 shrink-0 mt-0.5" />
                <span>{activeEvent.tradVenue}</span>
              </p>
            </div>

            <div className={`${activeTemplate.cardStyle} p-5 space-y-2`}>
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${activeTemplate.accentBadge}`}>
                <Clock className="w-3 h-3" />
                <span>{activeEvent.whiteTime}</span>
              </div>
              <h3 className="font-bold text-base">
                {isBabyShower ? "2. Baby Games & Cake Cutting" : isBirthday ? "2. Grand Gala & Banquet" : "2. Reception & Owambe"}
              </h3>
              <p className="text-xs opacity-80 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-aso-600 shrink-0 mt-0.5" />
                <span>{activeEvent.whiteVenue}</span>
              </p>
            </div>
          </div>
        </section>

        {/* DRESS CODE / THEME PALETTE */}
        <section className={`${activeTemplate.cardStyle} p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6`}>
          <div className="space-y-2 max-w-md">
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${activeTemplate.accentBadge}`}>
              {isBabyShower ? "Baby Theme Code" : isBirthday ? "Diamond Jubilee Attire" : "Official Aso-Ebi"}
            </span>
            <h3 className="text-xl font-bold">
              {isBabyShower ? "Pastel Chic & Floral Theme" : isBirthday ? "Gold & Obsidian Damask" : "Aso-Ebi Fabric & Gele"}
            </h3>
            <p className="text-xs opacity-80 leading-relaxed">
              {isBabyShower
                ? "Join us in pastel shades of peach, blush, and buttercup gold for beautiful photos!"
                : isBirthday
                ? "Guests are encouraged to wear traditional regal attire in gold and black with fila or gele."
                : "Official Swiss Voile Lace with Gele or Fila available for doorstep delivery."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/5 p-4 rounded-2xl border border-stone-200/60">
            <div className="flex -space-x-2">
              <span
                className="w-9 h-9 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: activeEvent.asoEbiBrideHex }}
              />
              <span
                className="w-9 h-9 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: activeEvent.asoEbiGroomHex }}
              />
            </div>
            <div className="text-xs font-bold">
              <div>{activeEvent.asoEbiBrideColor}</div>
              <div className="text-[11px] opacity-75 font-normal">{activeEvent.asoEbiGroomColor}</div>
            </div>
          </div>
        </section>

        {/* CASH REGISTRY / GIFT SECTION */}
        <section id="registry-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${activeTemplate.accentBadge}`}>
                {isBabyShower ? "Baby Registry" : isBirthday ? "Birthday Tributes" : "Cash Gift Registry"}
              </span>
              <h2 className="text-2xl font-bold mt-1">Bless the Celebration</h2>
            </div>
            <div className="text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl font-semibold flex items-center gap-1.5 self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant Paystack Bank Settlement</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {giftFunds.slice(0, 3).map((fund: GiftItem) => (
              <div
                key={fund.id}
                className={`${activeTemplate.cardStyle} p-5 flex flex-col justify-between space-y-4`}
              >
                <div>
                  <div className="flex justify-between text-xs">
                    <span className={`font-bold px-2 py-0.5 rounded-full ${activeTemplate.accentBadge}`}>
                      {fund.category}
                    </span>
                    <span className="opacity-75">{fund.contributorsCount} gifts</span>
                  </div>
                  <h4 className="font-bold text-sm mt-2">{fund.title}</h4>
                  <p className="text-xs opacity-75 mt-1 line-clamp-2">{fund.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenGiftModal(fund.id, 50000)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold ${activeTemplate.accentButton} transition-all`}
                >
                  Send Gift via Paystack
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 60-SECOND RSVP SECTION */}
        <section id="rsvp-section" className={`${activeTemplate.cardStyle} p-6 sm:p-10 border-2`}>
          <div className="max-w-xl mx-auto space-y-4">
            <div className="text-center">
              <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${activeTemplate.accentBadge}`}>
                RSVP Cut-off: {activeEvent.rsvpDeadline}
              </span>
              <h2 className="text-2xl font-bold mt-1">Confirm Your Attendance</h2>
              <p className="text-xs opacity-80">
                Reserve your table placement, dietary preference, and entrance pass.
              </p>
            </div>

            {rsvpSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2.5">
                <CheckCircle2 className="w-9 h-9 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg text-stone-900">
                  RSVP Confirmed! Thank You, {rsvpName}! 🎉
                </h3>
                <p className="text-xs text-stone-600">
                  Your seat and meal choice (<strong>{rsvpMeal}</strong>) have been saved to the guest list.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setRsvpSubmitted(false);
                    setRsvpName("");
                  }}
                  className="mt-2 px-4 py-2 rounded-xl bg-white border border-stone-300 text-xs font-bold text-stone-700"
                >
                  Submit Another RSVP
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold opacity-80 mb-1">Full Name / Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. & Mrs. Olatunji Bello"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold opacity-80 mb-1">WhatsApp Phone *</label>
                    <input
                      type="text"
                      required
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold opacity-80 mb-1">
                      {activeEvent.rsvpQuestions?.sideLabel || "Guest Group"}
                    </label>
                    <select
                      value={rsvpSide}
                      onChange={(e) => setRsvpSide(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    >
                      {(activeEvent.rsvpQuestions?.sideOptions || [
                        "Bride's Squad",
                        "Groom's Guys",
                        "Parents VIP Table",
                        "Diaspora Family",
                      ]).map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold opacity-80 mb-1">Additional Plus-Ones</label>
                    <select
                      value={rsvpPlusOnes}
                      onChange={(e) => setRsvpPlusOnes(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    >
                      <option value={0}>0 (Just Me)</option>
                      <option value={1}>+1 Spouse / Partner</option>
                      <option value={2}>+2 Family</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold opacity-80 mb-1">
                      {isWedding ? "Aso-Ebi Pack?" : "Attending Both Sessions?"}
                    </label>
                    <select
                      value={rsvpSpecialAnswer}
                      onChange={(e) => setRsvpSpecialAnswer(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                    >
                      <option value="Yes">Yes — Attending Both</option>
                      <option value="First Session Only">First Session Only</option>
                      <option value="Banquet Only">Banquet Only</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold opacity-80 mb-1">Meal Choice & Catering</label>
                  <select
                    value={rsvpMeal}
                    onChange={(e) => setRsvpMeal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  >
                    {(activeEvent.rsvpQuestions?.mealOptions || [
                      "Smoky Party Jollof & Peppered Turkey",
                      "Pounded Yam & Egusi Soup + Croaker",
                      "Ofada Rice & Spicy Ayamase Stew",
                      "Grilled Jumbo Prawns & Basmati Fried Rice",
                    ]).map((meal: string) => (
                      <option key={meal} value={meal}>
                        {meal}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold opacity-80 mb-1">
                    {activeEvent.rsvpQuestions?.specialQuestion || "Dietary notes or blessing for the host"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, arriving Nov 14, or special blessing"
                    value={rsvpNotes}
                    onChange={(e) => setRsvpNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold text-xs text-white ${activeTemplate.accentButton} shadow-md transition-all`}
                >
                  Confirm My RSVP & Generate Access Pass
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* PAYSTACK CASH GIFT MODAL */}
      {activeGiftId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setActiveGiftId(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>

            {giftSuccessReceipt ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Payment Verified • {giftSuccessReceipt}
                </span>
                <h3 className="font-display font-bold text-xl text-stone-900">
                  Thank You, {giftGuestName}! 💝
                </h3>
                <p className="text-xs text-stone-600">
                  Your gift of <strong>{formatNaira(giftAmount)}</strong> toward{" "}
                  <strong>{selectedGift.title}</strong> has been received on the escrow ledger for T+1 bank settlement.
                </p>
                <button
                  onClick={() => setActiveGiftId(null)}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCompleteGiftPayment} className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-coral-600">
                    Secure Paystack & Flutterwave Checkout
                  </span>
                  <h3 className="font-display font-bold text-lg text-stone-900">
                    {selectedGift.title}
                  </h3>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Select Gift Amount (₦)
                  </label>
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {[25000, 50000, 100000, 250000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setGiftAmount(amt)}
                        className={`py-1.5 rounded-lg font-bold border text-xs transition-all ${
                          giftAmount === amt
                            ? "bg-coral-500 text-white border-coral-500"
                            : "bg-stone-50 text-stone-700 border-stone-200"
                        }`}
                      >
                        {formatNaira(amt)}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min={1000}
                    required
                    value={giftAmount}
                    onChange={(e) => setGiftAmount(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "Paystack Transfer", label: "Bank Transfer", icon: Building2 },
                      { id: "Paystack Card", label: "Naira Card", icon: CreditCard },
                      { id: "Paystack USSD", label: "USSD", icon: Smartphone },
                      {
                        id: "Flutterwave Diaspora (GBP/USD)",
                        label: "Diaspora Card",
                        icon: Globe2,
                      },
                    ].map((pm) => {
                      const Icon = pm.icon;
                      const active = paymentMethod === pm.id;
                      return (
                        <button
                          type="button"
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id as GiftTransaction["paymentMethod"])}
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 ${
                            active
                              ? "border-aso-600 bg-aso-50 text-aso-950 font-bold"
                              : "border-stone-200 text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-aso-600 shrink-0" />
                          <span className="text-[11px]">{pm.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uncle Chuka & Family"
                    value={giftGuestName}
                    onChange={(e) => setGiftGuestName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Message for the Host</label>
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Gift for Host:</span>
                    <strong className="text-stone-900">{formatNaira(giftAmount)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>1.5% Fee:</span>
                    <span>
                      {activeEvent.feePlacement === "Guest"
                        ? `+${formatNaira(calculatedFee)} (Paid by Guest)`
                        : `${formatNaira(calculatedFee)} (Absorbed by Host)`}
                    </span>
                  </div>
                  <div className="pt-1 border-t border-stone-200 flex justify-between font-bold text-stone-900">
                    <span>Total Charge:</span>
                    <span className="text-emerald-700">{formatNaira(totalGuestPayable)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Confirm & Pay {formatNaira(totalGuestPayable)}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

