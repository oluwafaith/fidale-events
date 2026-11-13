"use client";

import React, { createContext, useContext, useState } from "react";
import {
  GuestItem,
  GiftItem,
  GiftTransaction,
  INITIAL_GUESTS,
  INITIAL_GIFT_FUNDS,
  INITIAL_TRANSACTIONS,
  VendorLead,
  VENDOR_LEADS_MOCK,
  WEDDING_TEMPLATES,
  WeddingTemplate,
  EventCategory,
  SAMPLE_EVENTS,
  EventProfilePreset,
} from "@/lib/mock-data";

export interface CoupleSiteConfig {
  eventType: EventCategory;
  coupleNames: string;
  slug: string;
  hashtag: string;
  weddingDate: string;
  city: string;
  selectedTemplateId: string;
  heroTitle: string;
  ourStory: string;
  tradVenue: string;
  tradTime: string;
  whiteVenue: string;
  whiteTime: string;
  asoEbiBrideColor: string;
  asoEbiBrideHex: string;
  asoEbiGroomColor: string;
  asoEbiGroomHex: string;
  asoEbiPrice: number;
  rsvpDeadline: string;
  feePlacement: "Guest" | "Couple";
  showGiftAmountsPublicly: boolean;
  isPremiumCouple: boolean;
  customDomain: string;
  rsvpQuestions?: EventProfilePreset["rsvpQuestions"];
}

export type EventSiteConfig = CoupleSiteConfig;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "couple" | "vendor" | "admin";
  avatarUrl?: string;
  weddingSlug?: string;
}

interface FidaleEventsContextType {
  user: AuthUser | null;
  login: (emailOrPhone: string, role?: "couple" | "vendor", name?: string) => void;
  signup: (data: { name: string; email: string; phone?: string; role: "couple" | "vendor" }) => void;
  logout: () => void;
  siteConfig: CoupleSiteConfig;
  updateSiteConfig: (partial: Partial<CoupleSiteConfig>) => void;
  loadPresetEvent: (presetId: string) => void;
  selectedTemplate: WeddingTemplate;
  guests: GuestItem[];
  addGuest: (guest: Omit<GuestItem, "id" | "updatedAt">) => void;
  updateGuestStatus: (id: string, status: GuestItem["rsvpStatus"]) => void;
  giftFunds: GiftItem[];
  transactions: GiftTransaction[];
  addGiftContribution: (tx: {
    guestName: string;
    giftId: string;
    amount: number;
    paymentMethod: GiftTransaction["paymentMethod"];
    message: string;
    isPublicAmount: boolean;
  }) => void;
  vendorLeads: VendorLead[];
  addVendorLead: (lead: Omit<VendorLead, "id" | "receivedAt" | "status">) => void;
}

const DEFAULT_SITE_CONFIG: CoupleSiteConfig = {
  eventType: "Wedding",
  coupleNames: "Adaeze & Tunde",
  slug: "adaeze-and-tunde",
  hashtag: "#TheATUnion26",
  weddingDate: "2026-11-14",
  city: "Victoria Island, Lagos",
  selectedTemplateId: "eko-coral-gold",
  heroTitle: "Two Hearts, One Big Lagos Owambe",
  ourStory:
    "We met at a friend's birthday dinner in Victoria Island back in 2023 when Tunde insisted that Nigerian Jollof tastes better with plantain dodo AND coleslaw. Three years, countless mainland-to-island drives, and one unforgettable proposal in Zanzibar later, we are excited to celebrate our traditional and white wedding with our favourite people!",
  tradVenue: "The Civic Centre, Ozumba Mbadiwe Ave, Victoria Island, Lagos",
  tradTime: "10:00 AM WAT (Igba Nkwu & Yoruba Engagement)",
  whiteVenue: "Landmark Event Centre, Water Corporation Dr, Oniru, Lagos",
  whiteTime: "2:00 PM Church Blessing • 4:30 PM Grand Owambe Reception",
  asoEbiBrideColor: "Coral Sunset & Champagne Gold",
  asoEbiBrideHex: "#FF4B26",
  asoEbiGroomColor: "Royal Plum Purple & Gold",
  asoEbiGroomHex: "#581C87",
  asoEbiPrice: 65000,
  rsvpDeadline: "2026-11-05",
  feePlacement: "Guest",
  showGiftAmountsPublicly: true,
  isPremiumCouple: false,
  customDomain: "adaezeandtunde.ng",
  rsvpQuestions: SAMPLE_EVENTS[0].rsvpQuestions,
};

const FidaleEventsContext = createContext<FidaleEventsContextType | undefined>(undefined);

export function FidaleEventsProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>({
    id: "u-101",
    name: "Adaeze & Tunde",
    email: "adaeze.nwosu@gmail.com",
    phone: "+234 803 555 0192",
    role: "couple",
    weddingSlug: "adaeze-and-tunde",
  });
  const [siteConfig, setSiteConfig] = useState<CoupleSiteConfig>(DEFAULT_SITE_CONFIG);
  const [guests, setGuests] = useState<GuestItem[]>(INITIAL_GUESTS);
  const [giftFunds, setGiftFunds] = useState<GiftItem[]>(INITIAL_GIFT_FUNDS);
  const [transactions, setTransactions] = useState<GiftTransaction[]>(INITIAL_TRANSACTIONS);
  const [vendorLeads, setVendorLeads] = useState<VendorLead[]>(VENDOR_LEADS_MOCK);

  const login = (emailOrPhone: string, role: "couple" | "vendor" = "couple", name?: string) => {
    setUser({
      id: `u-${Date.now()}`,
      name: name || (role === "couple" ? "Adaeze & Tunde" : "Bimpe Onakoya Artistry"),
      email: emailOrPhone.includes("@") ? emailOrPhone : `${emailOrPhone}@phone.fidale`,
      phone: emailOrPhone.startsWith("+") ? emailOrPhone : "+234 803 000 0000",
      role,
      weddingSlug: role === "couple" ? siteConfig.slug : undefined,
    });
  };

  const signup = (data: { name: string; email: string; phone?: string; role: "couple" | "vendor" }) => {
    setUser({
      id: `u-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "+234 803 000 0000",
      role: data.role,
      weddingSlug: data.role === "couple" ? "my-wedding" : undefined,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateSiteConfig = (partial: Partial<CoupleSiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...partial }));
  };

  const loadPresetEvent = (presetId: string) => {
    const preset = SAMPLE_EVENTS.find((e) => e.id === presetId || e.slug === presetId);
    if (preset) {
      setSiteConfig({
        eventType: preset.category,
        coupleNames: preset.coupleNames,
        slug: preset.slug,
        hashtag: preset.hashtag,
        weddingDate: preset.weddingDate,
        city: preset.city,
        selectedTemplateId: preset.selectedTemplateId,
        heroTitle: preset.heroTitle,
        ourStory: preset.ourStory,
        tradVenue: preset.tradVenue,
        tradTime: preset.tradTime,
        whiteVenue: preset.whiteVenue,
        whiteTime: preset.whiteTime,
        asoEbiBrideColor: preset.asoEbiBrideColor,
        asoEbiBrideHex: preset.asoEbiBrideHex,
        asoEbiGroomColor: preset.asoEbiGroomColor,
        asoEbiGroomHex: preset.asoEbiGroomHex,
        asoEbiPrice: preset.asoEbiPrice,
        rsvpDeadline: preset.rsvpDeadline,
        feePlacement: preset.feePlacement,
        showGiftAmountsPublicly: preset.showGiftAmountsPublicly,
        isPremiumCouple: preset.isPremiumCouple,
        customDomain: preset.customDomain,
        rsvpQuestions: preset.rsvpQuestions,
      });
    }
  };

  const selectedTemplate =
    WEDDING_TEMPLATES.find((t) => t.id === siteConfig.selectedTemplateId) || WEDDING_TEMPLATES[0];

  const addGuest = (guest: Omit<GuestItem, "id" | "updatedAt">) => {
    const newGuest: GuestItem = {
      ...guest,
      id: `g-${Date.now()}`,
      updatedAt: "Just now",
    };
    setGuests((prev) => [newGuest, ...prev]);
  };

  const updateGuestStatus = (id: string, status: GuestItem["rsvpStatus"]) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, rsvpStatus: status, updatedAt: "Just now" } : g))
    );
  };

  const addGiftContribution = ({
    guestName,
    giftId,
    amount,
    paymentMethod,
    message,
    isPublicAmount,
  }: {
    guestName: string;
    giftId: string;
    amount: number;
    paymentMethod: GiftTransaction["paymentMethod"];
    message: string;
    isPublicAmount: boolean;
  }) => {
    const targetGift = giftFunds.find((g) => g.id === giftId) || giftFunds[0];
    const platformFee = Math.round(amount * 0.015);

    const newTx: GiftTransaction = {
      id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
      guestName,
      giftTitle: targetGift.title,
      amount,
      platformFee,
      feePaidBy: siteConfig.feePlacement,
      paymentMethod,
      message,
      createdAt: "Just now",
      settlementStatus: "Pending Settlement (T+1)",
      isPublicAmount,
    };

    setTransactions((prev) => [newTx, ...prev]);
    setGiftFunds((prev) =>
      prev.map((g) =>
        g.id === targetGift.id
          ? {
              ...g,
              raisedAmount: g.raisedAmount + amount,
              contributorsCount: g.contributorsCount + 1,
            }
          : g
      )
    );
  };

  const addVendorLead = (lead: Omit<VendorLead, "id" | "receivedAt" | "status">) => {
    const newLead: VendorLead = {
      ...lead,
      id: `L-${Math.floor(105 + Math.random() * 900)}`,
      receivedAt: "Just now",
      status: "New",
    };
    setVendorLeads((prev) => [newLead, ...prev]);
  };

  return (
    <FidaleEventsContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        siteConfig,
        updateSiteConfig,
        loadPresetEvent,
        selectedTemplate,
        guests,
        addGuest,
        updateGuestStatus,
        giftFunds,
        transactions,
        addGiftContribution,
        vendorLeads,
        addVendorLead,
      }}
    >
      {children}
    </FidaleEventsContext.Provider>
  );
}

export function useFidaleEvents() {
  const ctx = useContext(FidaleEventsContext);
  if (!ctx) {
    throw new Error("useFidaleEvents must be used within a FidaleEventsProvider");
  }
  return ctx;
}

// Backward-compatible aliases
export const JoyNaijaProvider = FidaleEventsProvider;
export const useJoyNaija = useFidaleEvents;



