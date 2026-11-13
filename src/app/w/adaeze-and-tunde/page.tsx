"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, SlidersHorizontal, Eye } from "lucide-react";
import { InteractiveEventView } from "@/components/InteractiveEventView";

export default function LiveWeddingSitePage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      {/* Top Host Banner */}
      <div className="bg-stone-900 text-white text-xs px-4 py-2 border-b border-stone-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Fidale Events</span>
          </Link>
          <span className="text-stone-600">•</span>
          <span className="font-semibold text-coral-400">Live Website Preview</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/preview"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors text-[11px] font-bold"
          >
            <Eye className="w-3 h-3 text-stone-400" />
            <span>Device Previewer (Mobile/Tablet)</span>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-coral-500 hover:bg-coral-600 text-white transition-colors text-[11px] font-bold shadow-sm"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Open Studio</span>
          </Link>
        </div>
      </div>

      {/* Main Interactive Event Renderer */}
      <InteractiveEventView showStudioLink={true} />
    </div>
  );
}
