"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Calendar,
  MapPin,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import { WEDDING_TEMPLATES, EventCategory } from "@/lib/mock-data";

export default function OnboardingPage() {
  const router = useRouter();
  const { siteConfig, updateSiteConfig } = useFidaleEvents();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [eventType, setEventType] = useState<EventCategory>(siteConfig.eventType || "Wedding");
  const [partner1, setPartner1] = useState("Adaeze");
  const [partner2, setPartner2] = useState("Tunde");
  const [eventDate, setEventDate] = useState(siteConfig.weddingDate);
  const [city, setCity] = useState("Victoria Island, Lagos");
  const [phone, setPhone] = useState("+234 803 555 0192");
  const [otpCode, setOtpCode] = useState("482910");
  const [selectedTpl, setSelectedTpl] = useState(siteConfig.selectedTemplateId);

  const generatedSlug = `${partner1.toLowerCase().trim()}-and-${partner2.toLowerCase().trim()}`
    .replace(/[^a-z0-9-]/g, "");

  const handleFinishOnboarding = () => {
    updateSiteConfig({
      eventType,
      coupleNames: `${partner1}${partner2 ? ` & ${partner2}` : ""}`,
      slug: generatedSlug || "my-celebration",
      weddingDate: eventDate,
      city,
      selectedTemplateId: selectedTpl,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-adire-pattern py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-10">
        {/* Progress Stepper */}
        <div className="flex items-center justify-between text-xs font-bold text-stone-400 mb-6">
          <span className={step >= 1 ? "text-coral-600" : ""}>1. Wedding Details</span>
          <span>→</span>
          <span className={step >= 2 ? "text-coral-600" : ""}>2. Phone / WhatsApp OTP</span>
          <span>→</span>
          <span className={step >= 3 ? "text-coral-600" : ""}>3. Pick Template</span>
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-coral-600">
                100% Free Forever • Under 2 Minutes
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Let&apos;s set up your celebration website
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                We&apos;ll pre-configure your countdown, schedule, and custom RSVP link.
              </p>
            </div>

            {/* Event Category Selector */}
            <div>
              <label className="block font-bold text-stone-700 text-xs mb-1.5">What are you celebrating?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "Wedding", label: "💍 Wedding" },
                  { id: "Baby Shower", label: "🍼 Baby Shower" },
                  { id: "Birthday", label: "🎂 Birthday" },
                  { id: "Celebration of Life", label: "🕊️ Memorial" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setEventType(item.id as EventCategory)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                      eventType === item.id
                        ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {eventType === "Wedding" ? "Bride / Partner 1" : eventType === "Baby Shower" ? "Mother / Parent 1" : "Celebrant / Host Name"}
                </label>
                <input
                  type="text"
                  value={partner1}
                  onChange={(e) => setPartner1(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  {eventType === "Wedding" ? "Groom / Partner 2" : eventType === "Baby Shower" ? "Partner / Co-host (Optional)" : "Surname / Co-host (Optional)"}
                </label>
                <input
                  type="text"
                  value={partner2}
                  onChange={(e) => setPartner2(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-aso-50 border border-aso-200 text-xs flex items-center justify-between">
              <span className="text-aso-700 font-medium">Your Free Shareable Link:</span>
              <span className="font-bold text-aso-950">fidaleevents.com/w/{generatedSlug}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Celebration Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Wedding City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm"
                >
                  <option value="Victoria Island, Lagos">Lagos (VI / Lekki / Ikeja)</option>
                  <option value="Maitama, Abuja">Abuja (Maitama / Wuse / Central)</option>
                  <option value="GRA Phase 2, Port Harcourt">Port Harcourt (GRA)</option>
                  <option value="Enugu / Anambra">East / Traditional Home</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <span>Continue to OTP Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-aso-600">
                Powered by Termii SMS & WhatsApp OTP
              </span>
              <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
                Verify your Nigerian or Diaspora Phone
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Used for instant RSVP alerts and Paystack T+1 payout notifications.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Phone Number (NG +234, UK +44, US +1)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  6-Digit OTP Code (Pre-filled for Demo)
                </label>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 font-mono text-base tracking-widest font-bold"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl bg-aso-600 hover:bg-aso-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                Verify OTP & Pick Template →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Final Step • Ready to Publish
              </span>
              <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
                Select Your Starting Template
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
              {[...WEDDING_TEMPLATES]
                .sort((a, b) => (a.eventTypes.includes(eventType) ? -1 : 1))
                .map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTpl(tpl.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      selectedTpl === tpl.id
                        ? "border-coral-500 bg-coral-50/30"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <div className={`h-12 rounded-lg ${tpl.previewGradient} mb-2 flex items-end p-1.5`}>
                      <span className="text-[9px] font-bold text-white bg-black/30 px-1.5 py-0.5 rounded">
                        {tpl.tag}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-stone-900 truncate">{tpl.name}</div>
                    <div className="text-[10px] text-stone-500">{tpl.eventTypes[0]}</div>
                  </button>
                ))}
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-coral-500 to-aso-600 text-white font-bold text-sm shadow-lg transition-all"
            >
              Launch My Wedding Studio 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

