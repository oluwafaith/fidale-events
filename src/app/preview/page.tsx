"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Smartphone,
  Tablet,
  Monitor,
  Sparkles,
  ArrowLeft,
  SlidersHorizontal,
  ExternalLink,
  ChevronDown,
  Check,
  PartyPopper,
  Baby,
  Cake,
  Heart,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { useFidaleEvents } from "@/context/FidaleEventsContext";
import {
  WEDDING_TEMPLATES,
  WeddingTemplate,
  SAMPLE_EVENTS,
  EventProfilePreset,
} from "@/lib/mock-data";
import { InteractiveEventView } from "@/components/InteractiveEventView";

function PreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { siteConfig, selectedTemplate: contextTemplate, updateSiteConfig, loadPresetEvent } =
    useFidaleEvents();

  // URL Query param initialization
  const initialTemplateId = searchParams.get("template") || contextTemplate.id;
  const initialPresetId = searchParams.get("preset");
  const initialDevice = (searchParams.get("device") as "mobile" | "tablet" | "desktop") || "mobile";

  const [activeDevice, setActiveDevice] = useState<"mobile" | "tablet" | "desktop">(initialDevice);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTemplateId);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    initialPresetId || (siteConfig.eventType === "Baby Shower"
      ? "sample-baby-shower"
      : siteConfig.eventType === "Birthday"
      ? "sample-birthday"
      : "sample-wedding")
  );
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state if template param changes or is clicked
  useEffect(() => {
    const tplParam = searchParams.get("template");
    if (tplParam && WEDDING_TEMPLATES.some((t) => t.id === tplParam)) {
      setSelectedTemplateId(tplParam);
      // Auto switch preset if template is category-specific
      const match = WEDDING_TEMPLATES.find((t) => t.id === tplParam);
      if (match) {
        if (match.eventTypes.includes("Baby Shower") || match.eventTypes.includes("Child Dedication")) {
          setSelectedPresetId("sample-baby-shower");
        } else if (match.eventTypes.includes("Birthday")) {
          setSelectedPresetId("sample-birthday");
        }
      }
    }
  }, [searchParams]);

  // Resolve current active template
  const currentTemplate =
    WEDDING_TEMPLATES.find((t) => t.id === selectedTemplateId) ||
    contextTemplate ||
    WEDDING_TEMPLATES[0];

  // Resolve current event preset
  const currentEvent =
    SAMPLE_EVENTS.find((e) => e.id === selectedPresetId) || SAMPLE_EVENTS[0];

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = SAMPLE_EVENTS.find((e) => e.id === presetId);
    if (preset) {
      loadPresetEvent(presetId);
      // Find a matching template for this event category if needed
      const matchingTpl = WEDDING_TEMPLATES.find((t) => t.eventTypes.includes(preset.category));
      if (matchingTpl) {
        setSelectedTemplateId(matchingTpl.id);
      }
    }
  };

  const handleTemplateChange = (tplId: string) => {
    setSelectedTemplateId(tplId);
    updateSiteConfig({ selectedTemplateId: tplId });
    const tpl = WEDDING_TEMPLATES.find((t) => t.id === tplId);
    if (tpl) {
      if (tpl.eventTypes.includes("Baby Shower") && selectedPresetId !== "sample-baby-shower") {
        setSelectedPresetId("sample-baby-shower");
        loadPresetEvent("sample-baby-shower");
      } else if (tpl.eventTypes.includes("Birthday") && selectedPresetId !== "sample-birthday") {
        setSelectedPresetId("sample-birthday");
        loadPresetEvent("sample-birthday");
      }
    }
  };

  const handleUseInStudio = () => {
    updateSiteConfig({
      selectedTemplateId: currentTemplate.id,
      eventType: currentEvent.category,
    });
    router.push("/dashboard");
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col font-sans">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 text-white px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700/60 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Templates</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base text-white truncate max-w-[180px] sm:max-w-none">
                Previewing: {currentTemplate.name}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral-500/20 text-coral-300 border border-coral-500/30">
                {currentEvent.category}
              </span>
            </div>
          </div>

          {/* Center: Device Switcher & Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* Event Preset Selector */}
            <div className="relative inline-block text-xs">
              <select
                value={selectedPresetId}
                onChange={(e) => handlePresetChange(e.target.value)}
                className="bg-stone-800 hover:bg-stone-750 text-white text-xs font-bold rounded-xl px-3 py-1.5 pr-7 border border-stone-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                <option value="sample-wedding">💍 Wedding: Adaeze & Tunde</option>
                <option value="sample-baby-shower">🍼 Baby Shower: Baby Zara</option>
                <option value="sample-birthday">🎂 60th Birthday: Chief Alabi</option>
              </select>
              <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Template Selector */}
            <div className="relative inline-block text-xs">
              <select
                value={selectedTemplateId}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="bg-stone-800 hover:bg-stone-750 text-white text-xs font-bold rounded-xl px-3 py-1.5 pr-7 border border-stone-700 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-coral-500 max-w-[160px] sm:max-w-[200px] truncate"
              >
                {WEDDING_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.style})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Device Switcher */}
            <div className="flex items-center bg-stone-800/80 p-0.5 rounded-xl border border-stone-700/80">
              <button
                type="button"
                onClick={() => setActiveDevice("mobile")}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDevice === "mobile"
                    ? "bg-coral-500 text-white shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
                title="Mobile View (390px)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDevice("tablet")}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDevice === "tablet"
                    ? "bg-coral-500 text-white shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDevice("desktop")}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDevice === "desktop"
                    ? "bg-coral-500 text-white shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
                title="Desktop View (Full Width)"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors text-xs font-semibold flex items-center gap-1"
              title="Copy shareable preview link"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Share Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleUseInStudio}
              className="px-4 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs transition-colors shadow-lg shadow-coral-500/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use in Studio</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Preview Canvas */}
      <main className="flex-1 flex items-start justify-center p-2 sm:p-6 overflow-x-hidden">
        {activeDevice === "mobile" && (
          <div className="w-full max-w-[400px] my-4 transition-all">
            {/* Phone Bezel */}
            <div className="relative mx-auto rounded-[46px] border-[10px] border-stone-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-black">
              {/* Speaker & Camera Notch */}
              <div className="h-5 bg-stone-900 w-full flex items-center justify-center">
                <div className="w-20 h-3 bg-stone-950 rounded-full flex items-center justify-end px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                </div>
              </div>

              {/* Scrollable Screen */}
              <div className="h-[760px] overflow-y-auto bg-[#FFFDF9] scrollbar-thin">
                <InteractiveEventView
                  customTemplate={currentTemplate}
                  customEvent={currentEvent}
                  showStudioLink={false}
                />
              </div>

              {/* Bottom Home Indicator */}
              <div className="h-4 bg-stone-950 flex items-center justify-center">
                <div className="w-28 h-1 bg-stone-700 rounded-full" />
              </div>
            </div>
            <p className="text-center text-xs text-stone-500 mt-3">
              📱 Realistic Mobile View (390px) — Test RSVP & Paystack Cash Gift live!
            </p>
          </div>
        )}

        {activeDevice === "tablet" && (
          <div className="w-full max-w-[780px] my-4 transition-all">
            {/* Tablet Bezel */}
            <div className="relative mx-auto rounded-[36px] border-[10px] border-stone-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden bg-black">
              <div className="h-4 bg-stone-900 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-stone-800" />
              </div>

              {/* Scrollable Screen */}
              <div className="h-[820px] overflow-y-auto bg-[#FFFDF9] scrollbar-thin">
                <InteractiveEventView
                  customTemplate={currentTemplate}
                  customEvent={currentEvent}
                  showStudioLink={false}
                />
              </div>

              <div className="h-3 bg-stone-950" />
            </div>
            <p className="text-center text-xs text-stone-500 mt-3">
              Tablet View (768px) — Interactive RSVP & Cash Registry
            </p>
          </div>
        )}

        {activeDevice === "desktop" && (
          <div className="w-full max-w-6xl my-2 bg-white rounded-2xl shadow-2xl border border-stone-800 overflow-hidden">
            {/* Browser top chrome */}
            <div className="bg-stone-850 px-4 py-2.5 bg-stone-800 border-b border-stone-700 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex-1 mx-4 bg-stone-900 rounded-lg px-3 py-1 text-[11px] text-stone-400 font-mono truncate">
                https://fidale.events/{currentEvent.slug}
              </div>
            </div>

            {/* Content */}
            <div className="min-h-[85vh] bg-[#FFFDF9]">
              <InteractiveEventView
                customTemplate={currentTemplate}
                customEvent={currentEvent}
                showStudioLink={false}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-900 flex items-center justify-center text-white">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-coral-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-400 font-bold uppercase tracking-wider">
              Loading Live Celebration Preview...
            </p>
          </div>
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}

