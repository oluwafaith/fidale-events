"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Users,
  Wallet,
  Store,
  RefreshCw,
  FileCheck,
  Clock,
} from "lucide-react";
import { formatNaira } from "@/lib/mock-data";
import { useFidaleEvents } from "@/context/FidaleEventsContext";

interface KycApplicant {
  id: string;
  vendorName: string;
  category: string;
  city: string;
  cacNumber: string;
  directorIdType: string;
  portfolioCallStatus: "Completed" | "Scheduled";
  status: "Pending Approval" | "Approved" | "Flagged";
}

const INITIAL_KYC_QUEUE: KycApplicant[] = [
  {
    id: "KYC-401",
    vendorName: "Shuga Pulse Live Band",
    category: "Live Bands",
    city: "Lagos (Ikeja GRA)",
    cacNumber: "RC-2109483",
    directorIdType: "NIN + International Passport",
    portfolioCallStatus: "Completed",
    status: "Pending Approval",
  },
  {
    id: "KYC-402",
    vendorName: "Kano Royal Henna & Bridal Spa",
    category: "Makeup Artists",
    city: "Abuja (Wuse II)",
    cacNumber: "BN-3391024",
    directorIdType: "Driver's License",
    portfolioCallStatus: "Completed",
    status: "Pending Approval",
  },
  {
    id: "KYC-403",
    vendorName: "Garden City Marquee Rentals",
    category: "Venues",
    city: "Port Harcourt (GRA)",
    cacNumber: "RC-1883920",
    directorIdType: "NIN Slip",
    portfolioCallStatus: "Scheduled",
    status: "Pending Approval",
  },
];

export default function AdminBackOfficePage() {
  const { transactions } = useFidaleEvents();
  const [kycList, setKycList] = useState<KycApplicant[]>(INITIAL_KYC_QUEUE);
  const [primaryGateway, setPrimaryGateway] = useState<"Paystack" | "Flutterwave">("Paystack");

  const handleUpdateKycStatus = (id: string, status: KycApplicant["status"]) => {
    setKycList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pb-20">
      {/* Header */}
      <div className="bg-stone-950 text-white py-6 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-coral-400">
                Fidale Events Admin Back Office
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                NDPC Data Controller Registered
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1">
              Platform Operations, Vendor KYC &amp; Settlements
            </h1>
          </div>

          {/* Gateway Failover Control */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-3 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Activity className="w-4 h-4" />
              <span>99.8% Uptime</span>
            </div>
            <span className="text-stone-600">|</span>
            <span className="text-stone-300">Primary Gateway:</span>
            <button
              onClick={() =>
                setPrimaryGateway(primaryGateway === "Paystack" ? "Flutterwave" : "Paystack")
              }
              className="px-3 py-1 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{primaryGateway} (Switch Failover)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Platform Growth KPI Scorecard */}
        <div>
          <h2 className="font-display font-bold text-lg text-stone-900 mb-3">
            Platform Growth &amp; 12-Month Targets
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Couple Sign-ups", current: "1,840", target: "5,000 (M12)", pct: 37 },
              { label: "Sites Published", current: "1,178 (64%)", target: "60% Activation", pct: 100 },
              { label: "Avg RSVPs / Site", current: "168", target: "150 RSVPs", pct: 100 },
              { label: "Vendor Paid Conv.", current: "16.4%", target: "15% Free→Paid", pct: 100 },
              { label: "Gift Registry GMV", current: "₦18.4M", target: "₦50M Cum.", pct: 37 },
              { label: "Couple NPS Score", current: "+54", target: "≥ 40 NPS", pct: 100 },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm"
              >
                <div className="text-[11px] font-bold text-stone-500">{kpi.label}</div>
                <div className="text-xl font-display font-bold text-stone-900 mt-1">
                  {kpi.current}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  Target: {kpi.target}
                </div>
                <div className="mt-2 h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${kpi.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor KYC Verification & Trust & Safety */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Vendor CAC Verification Queue (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-stone-900">
                  Vendor ”Verified Badge“ KYC Queue
                </h3>
                <p className="text-xs text-stone-500">
                  Requires CAC RC/BN lookup + Government ID + Portfolio video verification call
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-aso-50 text-aso-700">
                72h SLA
              </span>
            </div>

            <div className="divide-y divide-stone-200">
              {kycList.map((item) => (
                <div
                  key={item.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{item.vendorName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-semibold text-[11px]">
                        {item.category}
                      </span>
                    </div>
                    <div className="text-stone-500">
                      {item.city} • CAC: <strong className="text-stone-800">{item.cacNumber}</strong>{" "}
                      • ID: {item.directorIdType}
                    </div>
                    <div className="text-[11px] font-semibold text-aso-700">
                      Portfolio Video Call: {item.portfolioCallStatus}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === "Approved" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified Badge Issued
                      </span>
                    ) : item.status === "Flagged" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-bold border border-rose-200">
                        <AlertTriangle className="w-4 h-4" />
                        Flagged for Review
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => handleUpdateKycStatus(item.id, "Approved")}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateKycStatus(item.id, "Flagged")}
                          className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-stone-600 font-bold transition-colors"
                        >
                          Flag
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escrow & Dispute Resolution Log (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-stone-900">
                Escrow Settlement & Trust Log
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                0 Active Disputes
              </span>
            </div>

            <div className="space-y-3 text-xs">
              {transactions.slice(0, 3).map((tx) => (
                <div
                  key={tx.id}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-stone-900">
                      {tx.id} • {tx.guestName}
                    </div>
                    <div className="text-[11px] text-stone-500">{tx.paymentMethod}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-700">{formatNaira(tx.amount)}</div>
                    <div className="text-[10px] text-stone-500">{tx.settlementStatus}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>NDPC Privacy & Data Export Requests</span>
              </div>
              <p className="text-[11px] text-amber-800">
                All couple & guest PII encrypted at rest (AES-256). 0 pending data deletion requests
                (30-day statutory SLA).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

