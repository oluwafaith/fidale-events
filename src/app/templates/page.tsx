"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle2,
  Smartphone,
  Tablet,
  Monitor,
  Heart,
  X,
  Calendar,
  MapPin,
  Gift,
  Check,
  Baby,
  Cake,
} from "lucide-react";
import {
  WEDDING_TEMPLATES,
  WeddingTemplate,
  formatNaira,
  EventCategory,
  SAMPLE_EVENTS,
} from "@/lib/mock-data";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import { InteractiveEventView } from "@/components/InteractiveEventView";

export default function TemplatesPage() {
  const router = useRouter();
  const { siteConfig, updateSiteConfig } = useFidaleEvents();

  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<WeddingTemplate | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered =
    selectedFilter === "All"
      ? WEDDING_TEMPLATES
      : selectedFilter === "Weddings"
      ? WEDDING_TEMPLATES.filter((t) => t.eventTypes.includes("Wedding"))
      : selectedFilter === "Baby Showers"
      ? WEDDING_TEMPLATES.filter(
          (t) => t.eventTypes.includes("Baby Shower") || t.eventTypes.includes("Child Dedication")
        )
      : selectedFilter === "Birthdays"
      ? WEDDING_TEMPLATES.filter((t) => t.eventTypes.includes("Birthday"))
      : selectedFilter === "Memorials"
      ? WEDDING_TEMPLATES.filter((t) => t.eventTypes.includes("Celebration of Life"))
      : WEDDING_TEMPLATES.filter((t) => t.style === selectedFilter);

  const handleApplyTemplate = (tpl: WeddingTemplate, redirectUrl?: string) => {
    // If template belongs to baby shower or birthday, update event type too
    const newEventType = tpl.eventTypes[0] || siteConfig.eventType;
    updateSiteConfig({
      selectedTemplateId: tpl.id,
      eventType: newEventType,
    });
    setToastMessage(`✓ Loaded "${tpl.name}" (${newEventType}) into your site!`);
    setTimeout(() => {
      setToastMessage(null);
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-24 text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-stone-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <section className="bg-white border-b border-stone-200/80 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-50 border border-coral-200 text-coral-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weddings • Baby Showers • Birthdays • Celebrations of Life</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-stone-950">
              Event Website Templates
            </h1>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Every design is crafted for authentic Nigerian celebrations: weddings, baby showers & child
              namings, milestone birthday Owambes, and memorial celebrations of life. Pick any template to test
              it live.
            </p>
          </div>

          {/* Event & Style Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {[
              { id: "All", label: "All Celebrations" },
              { id: "Weddings", label: "💍 Weddings" },
              { id: "Baby Showers", label: "🍼 Baby Showers & Dedications" },
              { id: "Birthdays", label: "🎂 Milestone Birthdays (50th/60th)" },
              { id: "Memorials", label: "🕊️ Celebrations of Life" },
              { id: "Afro-Elegant", label: "Afro-Elegant" },
              { id: "Vibrant Naija", label: "Vibrant Naija" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedFilter(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedFilter === item.id
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tpl) => {
            const isCurrentlyActive = siteConfig.selectedTemplateId === tpl.id;

            return (
              <div
                key={tpl.id}
                className={`group rounded-3xl bg-white border-2 overflow-hidden transition-all flex flex-col justify-between shadow-sm hover:shadow-xl ${
                  isCurrentlyActive
                    ? "border-coral-500 ring-4 ring-coral-500/10"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <div>
                  {/* Visual Header Banner */}
                  <div className={`h-52 ${tpl.previewGradient} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
                        {tpl.tag}
                      </span>
                      {isCurrentlyActive ? (
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white text-stone-950 flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          Currently Active
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                          {tpl.isPremium ? "Premium (₦15k)" : "Free"}
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-[10px] uppercase tracking-widest opacity-80">
                        {tpl.eventTypes.join(" • ")}
                      </div>
                      <div className="font-display text-2xl font-bold">
                        {tpl.name}
                      </div>
                      <div className="text-xs opacity-90 mt-0.5">
                        Interactive Mobile & Web Layout
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-lg text-stone-900">{tpl.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-stone-200 shadow-sm"
                          style={{ backgroundColor: tpl.primaryColor }}
                          title="Primary Color"
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-stone-200 shadow-sm"
                          style={{ backgroundColor: tpl.secondaryColor }}
                          title="Secondary Color"
                        />
                        <span
                          className="w-4 h-4 rounded-full border border-stone-200 shadow-sm"
                          style={{ backgroundColor: tpl.accentColor }}
                          title="Accent Color"
                        />
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                      {tpl.description}
                    </p>

                    <div className="mt-4 p-3 rounded-2xl bg-[#FFFDF9] border border-stone-200/80 text-[11px] font-medium text-stone-700 flex items-start gap-2">
                      <span className="text-coral-500 mt-0.5">✨</span>
                      <span>{tpl.culturalHighlight}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/preview?template=${tpl.id}`}
                      className="py-2.5 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-500" />
                      <span>Live Preview</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setActivePreviewTemplate(tpl)}
                      className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-coral-500" />
                      <span>Quick View</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyTemplate(tpl, "/dashboard")}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isCurrentlyActive
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                        : "bg-coral-500 hover:bg-coral-600 text-white shadow-md shadow-coral-500/20"
                    }`}
                  >
                    <span>
                      {isCurrentlyActive ? "Customize in Host Studio" : "Load & Edit This Template"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN INTERACTIVE DEVICE PREVIEW MODAL */}
      {activePreviewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between text-white pb-3 border-b border-white/15">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-lg sm:text-xl">
                Template Preview: {activePreviewTemplate.name}
              </span>
              <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-medium">
                {activePreviewTemplate.eventTypes.join(", ")}
              </span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  previewDevice === "mobile" ? "bg-white text-stone-950 shadow" : "text-white/70"
                }`}
                title="Mobile (360px)"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("tablet")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  previewDevice === "tablet" ? "bg-white text-stone-950 shadow" : "text-white/70"
                }`}
                title="Tablet (640px)"
              >
                <Tablet className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  previewDevice === "desktop" ? "bg-white text-stone-950 shadow" : "text-white/70"
                }`}
                title="Desktop"
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/preview?template=${activePreviewTemplate.id}`}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Fullscreen</span>
              </Link>
              <button
                type="button"
                onClick={() => handleApplyTemplate(activePreviewTemplate, "/dashboard")}
                className="px-4 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs transition-colors shadow"
              >
                Use Template
              </button>
              <button
                type="button"
                onClick={() => setActivePreviewTemplate(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Device Mockup Scroll Container */}
          <div className="flex-1 my-4 flex items-center justify-center overflow-y-auto">
            <div
              className={`h-full max-h-[82vh] bg-[#FFFDF9] rounded-3xl overflow-y-auto shadow-2xl transition-all border-4 border-stone-800 ${
                previewDevice === "mobile"
                  ? "w-full max-w-[390px]"
                  : previewDevice === "tablet"
                  ? "w-full max-w-[768px]"
                  : "w-full max-w-[1100px]"
              }`}
            >
              {(() => {
                const matchingPreset =
                  activePreviewTemplate.eventTypes.includes("Baby Shower") ||
                  activePreviewTemplate.eventTypes.includes("Child Dedication")
                    ? SAMPLE_EVENTS[1]
                    : activePreviewTemplate.eventTypes.includes("Birthday")
                    ? SAMPLE_EVENTS[2]
                    : SAMPLE_EVENTS[0];

                return (
                  <InteractiveEventView
                    customTemplate={activePreviewTemplate}
                    customEvent={matchingPreset}
                    showStudioLink={false}
                  />
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
