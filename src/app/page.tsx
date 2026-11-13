"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Wallet,
  ShieldCheck,
  QrCode,
  Globe2,
  Star,
  MapPin,
  Heart,
  Smartphone,
  ChevronRight,
  Play,
  Gift,
  Check,
} from "lucide-react";
import { WEDDING_TEMPLATES, VENDORS, formatNaira } from "@/lib/mock-data";
import { useFidaleEvents } from "@/context/FidaleEventsContext";

export default function HomePage() {
  const router = useRouter();
  const { siteConfig, updateSiteConfig } = useFidaleEvents();
  const [templateFilter, setTemplateFilter] = useState<string>("All");

  const filteredTemplates =
    templateFilter === "All"
      ? WEDDING_TEMPLATES
      : templateFilter === "Weddings"
      ? WEDDING_TEMPLATES.filter((t) => t.eventTypes.includes("Wedding"))
      : templateFilter === "Baby Showers"
      ? WEDDING_TEMPLATES.filter(
          (t) => t.eventTypes.includes("Baby Shower") || t.eventTypes.includes("Child Dedication")
        )
      : templateFilter === "Birthdays"
      ? WEDDING_TEMPLATES.filter((t) => t.eventTypes.includes("Birthday"))
      : templateFilter === "Memorials"
      ? WEDDING_TEMPLATES.filter((t) => t.eventTypes.includes("Celebration of Life"))
      : WEDDING_TEMPLATES.filter((t) => t.style === templateFilter);

  const handleSelectTemplate = (templateId: string, goToLive = false) => {
    updateSiteConfig({ selectedTemplateId: templateId });
    if (goToLive) {
      router.push(`/preview?template=${templateId}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-stone-900">
      {/* JOY-STYLE HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-stone-200/70">
        {/* Soft Ambient Radial Lights */}
        <div className="pointer-events-none absolute -top-40 -left-40 w-[32rem] h-[32rem] rounded-full bg-coral-400/10 blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-0 w-[30rem] h-[30rem] rounded-full bg-aso-500/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Clean, Punchy Typography */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Weddings • Baby Showers • Birthdays • Celebrations of Life</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-stone-950 leading-[1.08]">
                Say hello to the event website{" "}
                <span className="italic font-normal font-serif text-coral-600">
                  you&apos;ve been waiting for.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Stunning free websites, seamless WhatsApp RSVPs, direct Paystack cash gift registries,
                and CAC-verified vendors for weddings, baby showers, milestone birthdays, and celebrations of life.
              </p>

              {/* Action Buttons: Joy's Clean Dual CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm shadow-lg shadow-coral-500/25 transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>Get Started — It&apos;s Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/w/adaeze-and-tunde"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-sm shadow-sm transition-all text-center flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-coral-500" />
                  <span>Explore Live Sample Event</span>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>No Ads or Spam</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Instant Paystack Bank Settlement</span>
                </div>
              </div>
            </div>

            {/* Right Column: Joy-Style Hero Showcase Phone with Floating Chips */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px]">
                {/* Floating Notification Badges */}
                <div className="absolute -left-8 top-12 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    ₦
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">+₦350,000 Gift</div>
                    <div className="text-[10px] text-stone-500">Tolu & Dami (UK) • Paid via Card</div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-16 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">248 RSVPs Confirmed</div>
                    <div className="text-[10px] text-stone-500">70 Aso-Ebi Packs Reserved</div>
                  </div>
                </div>

                {/* Mobile Mockup Device */}
                <div className="rounded-[2.5rem] bg-stone-950 p-3 shadow-2xl border-4 border-stone-800">
                  <div className="rounded-[2rem] overflow-hidden bg-white">
                    {/* Header Image Cover */}
                    <div className="bg-gradient-to-br from-coral-500 via-aso-700 to-amber-500 p-6 text-white text-center">
                      <div className="text-[10px] uppercase tracking-widest font-semibold opacity-90">
                        #TheATUnion26
                      </div>
                      <h2 className="font-display text-2xl font-bold mt-0.5">Adaeze & Tunde</h2>
                      <p className="text-xs text-white/85 mt-0.5">14 Nov 2026 • Victoria Island, Lagos</p>

                      <div className="mt-4 grid grid-cols-4 gap-1 bg-black/25 backdrop-blur-sm rounded-xl p-2 text-center text-white">
                        <div>
                          <div className="text-sm font-bold">16</div>
                          <div className="text-[8px] uppercase opacity-75">Days</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">08</div>
                          <div className="text-[8px] uppercase opacity-75">Hrs</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">42</div>
                          <div className="text-[8px] uppercase opacity-75">Min</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">19</div>
                          <div className="text-[8px] uppercase opacity-75">Sec</div>
                        </div>
                      </div>
                    </div>

                    {/* Clean Mockup Content */}
                    <div className="p-4 space-y-2.5 bg-[#FFFDF9] text-xs">
                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <div className="font-bold text-stone-900">Dual Ceremony Schedule</div>
                        <div className="text-stone-500 text-[11px] mt-0.5">
                          10:00 AM Trad @ Civic Centre • 2:00 PM White @ Landmark
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-aso-50 border border-aso-200/80 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-aso-900 text-[11px]">Official Aso-Ebi</div>
                          <div className="text-[10px] text-aso-700">Coral & Royal Plum Lace</div>
                        </div>
                        <div className="flex -space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#FF4B26] border-2 border-white shadow-sm" />
                          <span className="w-5 h-5 rounded-full bg-[#581C87] border-2 border-white shadow-sm" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <Link
                          href="/w/adaeze-and-tunde#rsvp"
                          className="py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs text-center hover:bg-coral-600 transition-colors"
                        >
                          RSVP
                        </Link>
                        <Link
                          href="/w/adaeze-and-tunde#registry"
                          className="py-2.5 rounded-xl bg-coral-50 text-coral-700 border border-coral-200 font-bold text-xs text-center"
                        >
                          Send Gift
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOY-STYLE 4 PILLARS (Clean, scannable, visual cards) */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Everything your wedding needs.{" "}
              <span className="font-serif italic font-normal text-coral-600">Nothing you don&apos;t.</span>
            </h2>
            <p className="mt-3 text-stone-500 text-sm sm:text-base">
              Built specifically for how Nigerian weddings actually run.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-coral-100 text-coral-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900">Websites That Wow</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Choose from luxury Afro-elegant templates. Showcase your story, dual ceremonies, and
                  Aso-Ebi swatches effortlessly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/70">
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-1 text-xs font-bold text-coral-600 hover:underline"
                >
                  <span>Explore templates</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center mb-4">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900">WhatsApp-First RSVPs</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Guests respond in 60 seconds. Track exact Jollof vs. Swallow meal counts and Aso-Ebi
                  orders in real time.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/70">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:underline"
                >
                  <span>See RSVP manager</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-aso-100 text-aso-700 flex items-center justify-center mb-4">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900">Zero-Awkwardness Gifts</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Guests send cash gifts directly via Paystack transfer, card, or USSD. T+1 settlement
                  straight to your Nigerian bank.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/70">
                <Link
                  href="/w/adaeze-and-tunde#registry"
                  className="inline-flex items-center gap-1 text-xs font-bold text-aso-700 hover:underline"
                >
                  <span>Try gift checkout</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-stone-200 hover:border-stone-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-stone-900">Verified Vendors</h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Transparent Naira prices and CAC-checked photographers, caterers, and decorators in
                  Lagos, Abuja, and Port Harcourt.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-200/70">
                <Link
                  href="/vendors"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
                >
                  <span>Browse vendors</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATE GALLERY (Clean, elegant visual showcase) */}
      <section id="templates" className="py-16 sm:py-24 bg-[#FFFDF9] border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-coral-600">
                  Designer Templates
                </span>
                <span className="text-stone-300">•</span>
                <Link
                  href="/templates"
                  className="text-xs font-bold text-stone-700 hover:text-coral-600 underline"
                >
                  Open Full Gallery & Device Previewer →
                </Link>
              </div>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-stone-900">
                Designed to be unforgettable.
              </h2>
              <p className="mt-1.5 text-stone-500 text-sm max-w-lg">
                Pick a style, add your story, and share your link in under 20 minutes.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "All", label: "All Celebrations" },
                { id: "Weddings", label: "💍 Weddings" },
                { id: "Baby Showers", label: "🍼 Baby Showers" },
                { id: "Birthdays", label: "🎂 Birthdays" },
                { id: "Memorials", label: "🕊️ Memorials" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTemplateFilter(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    templateFilter === item.id
                      ? "bg-stone-900 text-white shadow-sm"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="group rounded-3xl bg-white border border-stone-200 hover:border-stone-300 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`h-48 ${tpl.previewGradient} p-6 flex flex-col justify-between text-white relative`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-sm">
                        {tpl.tag}
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        {tpl.isPremium ? "Premium" : "Free"}
                      </span>
                    </div>

                    <div>
                      <div className="font-display text-2xl font-bold">Adaeze & Tunde</div>
                      <div className="text-xs opacity-90 mt-0.5">14 Nov 2026 • Lagos</div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-bold text-base text-stone-900">{tpl.name}</h3>
                    <p className="mt-1.5 text-xs text-stone-500 line-clamp-2">{tpl.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => handleSelectTemplate(tpl.id, false)}
                    className="flex-1 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
                  >
                    Customize
                  </button>
                  <button
                    onClick={() => handleSelectTemplate(tpl.id, true)}
                    className="py-2 px-3.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REAL COUPLE REVIEWS (Joy-Style Social Proof) */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900">
              Loved by Nigerian couples everywhere.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-stone-200 space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                “Fidale saved our sanity! Chasing 300 guests on WhatsApp for meal choices was a
                nightmare before this. We had 90% RSVP response in 48 hours.”
              </p>
              <div className="pt-2 text-xs">
                <strong className="block text-stone-900">Adaeze & Tunde</strong>
                <span className="text-stone-400">Married in Victoria Island, Lagos</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-stone-200 space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                “Planning our wedding from London felt impossible until we found Fidale. Diaspora
                family could pay cash gifts in GBP and our caterer got an exact head count.”
              </p>
              <div className="pt-2 text-xs">
                <strong className="block text-stone-900">Damilola & Tolu</strong>
                <span className="text-stone-400">London to Abuja Wedding</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-stone-200 space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                “The Aso-Ebi coordination is genius. Guests bought the official fabric directly
                through the site and we didn&apos;t have to track transfers manually in Excel.”
              </p>
              <div className="pt-2 text-xs">
                <strong className="block text-stone-900">Dr. Somto & Zainab</strong>
                <span className="text-stone-400">Married in Port Harcourt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM ACTION BANNER (Joy-Style Clean Call to Action) */}
      <section className="py-20 bg-gradient-to-br from-stone-950 via-aso-950 to-stone-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Your forever starts here.
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-lg mx-auto">
            Build your free wedding website today and invite your guests with pride.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm shadow-xl transition-all"
            >
              Create Your Free Website
            </Link>
            <Link
              href="/vendors"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Browse Wedding Vendors
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
              <span>Fidale Events</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-sans">
                NDPC Act 2023 Compliant
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Secured by Paystack & Flutterwave. Built for Lagos, Abuja, Port Harcourt & the Diaspora.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <Link href="/login" className="hover:text-white transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="hover:text-white transition-colors">
              Sign Up
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Couple Studio
            </Link>
            <Link href="/w/adaeze-and-tunde" className="hover:text-white transition-colors">
              Sample Live Site
            </Link>
            <Link href="/vendors" className="hover:text-white transition-colors">
              Vendor Directory
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Admin HQ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
