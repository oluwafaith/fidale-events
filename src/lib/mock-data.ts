export type EventCategory =
  | "Wedding"
  | "Baby Shower"
  | "Birthday"
  | "Child Dedication"
  | "Celebration of Life"
  | "Bridal Shower";

export type TemplateLayoutVariant =
  | "lagos-owambe"
  | "royal-crest"
  | "editorial-minimal"
  | "emerald-marquee"
  | "heritage-arch"
  | "celebration-classic";

export interface WeddingTemplate {
  id: string;
  name: string;
  tag: string;
  style: "Afro-Elegant" | "Vibrant Naija" | "Contemporary" | "Baby & Floral" | "Milestone Royale";
  layoutVariant: TemplateLayoutVariant;
  eventTypes: EventCategory[];
  isPremium: boolean;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgClass: string;
  previewGradient: string;
  description: string;
  culturalHighlight: string;
  fontClass: string;
  cardStyle: string;
  accentButton: string;
  accentBadge: string;
}

export type EventTemplate = WeddingTemplate;

export interface GuestItem {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  side: "Bride's Side" | "Groom's Side" | "Parents VIP" | "Diaspora";
  rsvpStatus: "Confirmed" | "Pending" | "Declined";
  eventsAttending: ("Traditional" | "White Wedding" | "Afterparty")[];
  mealPreference: string;
  asoEbiStatus: "Paid (₦65k)" | "Interested" | "No Aso-Ebi";
  plusOnes: number;
  dietaryNotes?: string;
  updatedAt: string;
}

export interface GiftItem {
  id: string;
  title: string;
  category: "Cash Fund" | "Retail Partner" | "Aso-Ebi";
  targetAmount: number;
  raisedAmount: number;
  contributorsCount: number;
  partnerStore?: string;
  commissionRate?: string;
  description: string;
  iconName: string;
}

export interface GiftTransaction {
  id: string;
  guestName: string;
  giftTitle: string;
  amount: number;
  platformFee: number;
  feePaidBy: "Guest" | "Couple";
  paymentMethod: "Paystack Card" | "Paystack Transfer" | "Paystack USSD" | "Flutterwave Diaspora (GBP/USD)";
  message: string;
  createdAt: string;
  settlementStatus: "Settled (T+1)" | "Pending Settlement (T+1)" | "Escrow Held";
  isPublicAmount: boolean;
}

export interface VendorProfile {
  id: string;
  name: string;
  slug: string;
  category:
    | "Venues"
    | "Photographers"
    | "Caterers"
    | "Decorators"
    | "MCs & DJs"
    | "Makeup Artists"
    | "Aso-Ebi Tailors"
    | "Wedding Planners"
    | "Live Bands";
  city: "Lagos" | "Abuja" | "Port Harcourt";
  neighborhood: string;
  tier: "Featured" | "Standard" | "Free";
  isVerified: boolean;
  cacNumber: string;
  rating: number;
  reviewCount: number;
  minBudget: number;
  maxBudget: number;
  priceBandLabel: string;
  diasporaFriendly: boolean;
  responseTime: string;
  tagline: string;
  portfolioHighlights: string[];
  packages: { name: string; price: number; details: string }[];
  availableDates: string[];
}

export interface VendorLead {
  id: string;
  coupleNames: string;
  weddingDate: string;
  city: string;
  guestCount: number;
  estimatedBudget: string;
  message: string;
  phone: string;
  status: "New" | "Replied via WhatsApp" | "Quote Sent" | "Booked";
  receivedAt: string;
  isLockedOnFreeTier?: boolean;
}

export const WEDDING_TEMPLATES: WeddingTemplate[] = [
  {
    id: "eko-coral-gold",
    name: "Eko Coral & Gold",
    tag: "Most Popular in Lagos",
    style: "Vibrant Naija",
    layoutVariant: "lagos-owambe",
    eventTypes: ["Wedding", "Bridal Shower"],
    isPremium: false,
    primaryColor: "#FF4B26",
    secondaryColor: "#581C87",
    accentColor: "#D4AF37",
    bgClass: "from-coral-500 via-aso-700 to-amber-500",
    previewGradient: "bg-gradient-to-br from-[#FF4B26] via-[#7E22CE] to-[#D4AF37]",
    description: "Bold coral beads motif paired with regal purple aso-oke textures and warm gold typography.",
    culturalHighlight: "Includes Dual-Ceremony Schedule (Trad + White) & Aso-Ebi Swatch Card",
    fontClass: "font-display",
    cardStyle: "bg-white border-2 border-stone-200/90 shadow-sm rounded-3xl",
    accentButton: "bg-coral-500 hover:bg-coral-600 text-white shadow-coral-500/20",
    accentBadge: "bg-coral-50 text-coral-700 border-coral-200",
  },
  {
    id: "royal-aso-oke",
    name: "Royal Aso-Oke Purple",
    tag: "Afro-Elegant Flagship",
    style: "Afro-Elegant",
    layoutVariant: "royal-crest",
    eventTypes: ["Wedding", "Birthday"],
    isPremium: false,
    primaryColor: "#581C87",
    secondaryColor: "#D4AF37",
    accentColor: "#FF4B26",
    bgClass: "from-aso-800 via-purple-900 to-amber-600",
    previewGradient: "bg-gradient-to-br from-[#3B0764] via-[#6B21A8] to-[#D4AF37]",
    description: "Inspired by woven Yoruba sanyan & alaari fabrics with a royal monogram crest and champagne gold accents.",
    culturalHighlight: "Monogram Crest Hero, Family Lineage Banner & VIP High Table Tagging",
    fontClass: "font-display",
    cardStyle: "bg-[#FCF9FF] border-2 border-aso-200 shadow-sm rounded-3xl",
    accentButton: "bg-aso-700 hover:bg-aso-800 text-white shadow-aso-700/20",
    accentBadge: "bg-aso-50 text-aso-800 border-aso-200",
  },
  {
    id: "ikoyi-minimal-ivory",
    name: "Ikoyi Minimalist Ivory",
    tag: "Modern Editorial",
    style: "Contemporary",
    layoutVariant: "editorial-minimal",
    eventTypes: ["Wedding", "Bridal Shower"],
    isPremium: false,
    primaryColor: "#1C1917",
    secondaryColor: "#78716C",
    accentColor: "#D97706",
    bgClass: "from-stone-900 via-stone-800 to-stone-700",
    previewGradient: "bg-gradient-to-br from-[#292524] via-[#44403C] to-[#A8A29E]",
    description: "Airy magazine-style editorial layout with crisp serif typography, clean white space, and split-screen hero.",
    culturalHighlight: "Split Editorial Hero, Minimal Timeline & Effortless Guest FAQ",
    fontClass: "font-display",
    cardStyle: "bg-white border border-stone-200 shadow-none rounded-2xl",
    accentButton: "bg-stone-900 hover:bg-stone-800 text-white",
    accentBadge: "bg-stone-100 text-stone-800 border-stone-200",
  },
  {
    id: "pastel-peach-blossom",
    name: "Safari Peach Blossom & Gold",
    tag: "Baby Shower & Dedication",
    style: "Baby & Floral",
    layoutVariant: "celebration-classic",
    eventTypes: ["Baby Shower", "Child Dedication"],
    isPremium: false,
    primaryColor: "#FB923C",
    secondaryColor: "#F472B6",
    accentColor: "#FBBF24",
    bgClass: "from-orange-400 via-rose-300 to-amber-300",
    previewGradient: "bg-gradient-to-br from-[#FB923C] via-[#F472B6] to-[#FDE68A]",
    description: "Gentle peach, soft blush roses & warm sunshine accents for welcoming new life.",
    culturalHighlight: "Diaper & Nursery Fund, Due Date & Gender Guessing, Godparents' Tribute",
    fontClass: "font-display",
    cardStyle: "bg-[#FFFBF7] border-2 border-orange-200/80 shadow-sm rounded-3xl",
    accentButton: "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20",
    accentBadge: "bg-orange-50 text-orange-800 border-orange-200",
  },
  {
    id: "royal-prince-indigo",
    name: "Royal Child Naming & Indigo",
    tag: "Naming & Dedication",
    style: "Afro-Elegant",
    layoutVariant: "celebration-classic",
    eventTypes: ["Child Dedication", "Baby Shower"],
    isPremium: false,
    primaryColor: "#1E3A8A",
    secondaryColor: "#3B82F6",
    accentColor: "#D4AF37",
    bgClass: "from-blue-900 via-indigo-900 to-amber-400",
    previewGradient: "bg-gradient-to-br from-[#1E3A8A] via-[#3B82F6] to-[#FDE047]",
    description: "Deep Nigerian royal indigo Adire and gold accents for 8th-day naming ceremonies and church dedications.",
    culturalHighlight: "7 Sacred Traditional Naming Blessings (Honey, Water, Salt, Palm Oil, Sugar) & Nursery Fund",
    fontClass: "font-display",
    cardStyle: "bg-[#F8FAFC] border-2 border-blue-200 shadow-sm rounded-3xl",
    accentButton: "bg-blue-800 hover:bg-blue-900 text-white shadow-blue-800/20",
    accentBadge: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    id: "golden-jubilee-royale",
    name: "Golden Jubilee Royale",
    tag: "50th/60th/70th Birthday",
    style: "Milestone Royale",
    layoutVariant: "celebration-classic",
    eventTypes: ["Birthday", "Celebration of Life"],
    isPremium: true,
    primaryColor: "#D97706",
    secondaryColor: "#1C1917",
    accentColor: "#F59E0B",
    bgClass: "from-amber-600 via-stone-900 to-yellow-500",
    previewGradient: "bg-gradient-to-br from-[#B45309] via-[#1C1917] to-[#FBBF24]",
    description: "Opulent champagne gold leaf and obsidian for landmark 50th, 60th, and 70th Owambe birthday banquets.",
    culturalHighlight: "Digital Dancefloor Spraying Pot, Memory Wall & Champagne Toast Tributes",
    fontClass: "font-display",
    cardStyle: "bg-stone-950 text-white border-2 border-amber-400/50 shadow-xl rounded-3xl",
    accentButton: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-stone-950 font-bold",
    accentBadge: "bg-amber-400/20 text-amber-300 border-amber-400/40",
  },
  {
    id: "retro-lagos-sunset",
    name: "Retro Lagos Afrobeats Sunset",
    tag: "30th/40th Birthday & Fiesta",
    style: "Vibrant Naija",
    layoutVariant: "celebration-classic",
    eventTypes: ["Birthday", "Bridal Shower"],
    isPremium: false,
    primaryColor: "#E11D48",
    secondaryColor: "#7E22CE",
    accentColor: "#F59E0B",
    bgClass: "from-rose-600 via-purple-700 to-amber-400",
    previewGradient: "bg-gradient-to-br from-[#E11D48] via-[#7E22CE] to-[#FACC15]",
    description: "High-energy beach house & rooftop cocktail party aesthetic with Spotify playlist sync and party games.",
    culturalHighlight: "DJ Song Requests, Afterparty Dress Code & Cocktails Menu",
    fontClass: "font-sans",
    cardStyle: "bg-white border-2 border-rose-200 shadow-sm rounded-3xl",
    accentButton: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
    accentBadge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    id: "eternal-grace-memorial",
    name: "Eternal Grace & Pearl Memorial",
    tag: "Celebration of Life",
    style: "Contemporary",
    layoutVariant: "celebration-classic",
    eventTypes: ["Celebration of Life"],
    isPremium: false,
    primaryColor: "#4B5563",
    secondaryColor: "#1F2937",
    accentColor: "#D4AF37",
    bgClass: "from-stone-700 via-stone-800 to-amber-200",
    previewGradient: "bg-gradient-to-br from-[#374151] via-[#1F2937] to-[#E5E7EB]",
    description: "Dignified, peaceful pearl white and soft charcoal layout celebrating a life of faith, service, and legacy.",
    culturalHighlight: "Order of Christian / Islamic Funeral Service, Biography, Condolence Book & Family Support Fund",
    fontClass: "font-display",
    cardStyle: "bg-[#FAFAFA] border-2 border-stone-200 shadow-sm rounded-3xl",
    accentButton: "bg-stone-800 hover:bg-stone-900 text-white",
    accentBadge: "bg-stone-100 text-stone-800 border-stone-300",
  },
  {
    id: "abuja-garden-emerald",
    name: "Abuja Emerald Luxe",
    tag: "Grand Ballroom Marquee",
    style: "Afro-Elegant",
    layoutVariant: "emerald-marquee",
    eventTypes: ["Wedding", "Birthday"],
    isPremium: true,
    primaryColor: "#064E3B",
    secondaryColor: "#D4AF37",
    accentColor: "#10B981",
    bgClass: "from-emerald-900 via-teal-800 to-amber-500",
    previewGradient: "bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#D4AF37]",
    description: "Lush rainforest emerald with gold leaf borders, designed for grand Abuja marquee receptions.",
    culturalHighlight: "Multi-day Programme blocks, VIP Seating & High Table Reservation",
    fontClass: "font-display",
    cardStyle: "bg-white border-2 border-emerald-200 shadow-sm rounded-3xl",
    accentButton: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20",
    accentBadge: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    id: "benin-bronze-heritage",
    name: "Benin Bronze & Ivory",
    tag: "Cultural Dowry & Heritage",
    style: "Afro-Elegant",
    layoutVariant: "heritage-arch",
    eventTypes: ["Wedding", "Birthday"],
    isPremium: false,
    primaryColor: "#9A3412",
    secondaryColor: "#78350F",
    accentColor: "#D97706",
    bgClass: "from-amber-800 via-orange-900 to-yellow-600",
    previewGradient: "bg-gradient-to-br from-[#7C2D12] via-[#B45309] to-[#FDE68A]",
    description: "Editorial celebration of Edo/Delta coral royalty and warm terracotta arch architecture.",
    culturalHighlight: "Traditional Dowry & Igba Nkwu / Okuku showcase layout",
    fontClass: "font-display",
    cardStyle: "bg-[#FFFBF5] border-2 border-amber-300/80 shadow-sm rounded-3xl",
    accentButton: "bg-amber-700 hover:bg-amber-800 text-white shadow-amber-700/20",
    accentBadge: "bg-amber-50 text-amber-900 border-amber-200",
  },
];

export const INITIAL_GUESTS: GuestItem[] = [
  {
    id: "g-1",
    fullName: "Chief & Lolo Chinedu Nwosu",
    phone: "+234 803 412 8890",
    email: "chinedu.nwosu@gmail.com",
    side: "Parents VIP",
    rsvpStatus: "Confirmed",
    eventsAttending: ["Traditional", "White Wedding"],
    mealPreference: "Pounded Yam & Egusi + Croaker",
    asoEbiStatus: "Paid (₦65k)",
    plusOnes: 1,
    dietaryNotes: "High Table Zone A — Low salt",
    updatedAt: "2 hours ago",
  },
  {
    id: "g-2",
    fullName: "Damilola & Tolu Adeyemi (UK)",
    phone: "+44 7700 900412",
    email: "dami.adeyemi@outlook.com",
    side: "Diaspora",
    rsvpStatus: "Confirmed",
    eventsAttending: ["Traditional", "White Wedding", "Afterparty"],
    mealPreference: "Smoky Party Jollof & Peppered Turkey",
    asoEbiStatus: "Paid (₦65k)",
    plusOnes: 1,
    dietaryNotes: "Arriving Lagos Nov 11 via Virgin Atlantic",
    updatedAt: "5 hours ago",
  },
  {
    id: "g-3",
    fullName: "Zainab Bello-Mustapha",
    phone: "+234 809 221 3409",
    email: "zainab.bello@yahoo.com",
    side: "Bride's Side",
    rsvpStatus: "Confirmed",
    eventsAttending: ["White Wedding", "Afterparty"],
    mealPreference: "Ofada Rice & Ayamase Designer Stew",
    asoEbiStatus: "Paid (₦65k)",
    plusOnes: 0,
    updatedAt: "Yesterday",
  },
  {
    id: "g-4",
    fullName: "Olumide Bakare",
    phone: "+234 812 556 7811",
    side: "Groom's Side",
    rsvpStatus: "Confirmed",
    eventsAttending: ["Traditional", "White Wedding", "Afterparty"],
    mealPreference: "Smoky Party Jollof & Asun",
    asoEbiStatus: "Interested",
    plusOnes: 1,
    updatedAt: "Yesterday",
  },
  {
    id: "g-5",
    fullName: "Ngozi Okafor-Eze",
    phone: "+234 706 998 1120",
    side: "Bride's Side",
    rsvpStatus: "Pending",
    eventsAttending: ["Traditional", "White Wedding"],
    mealPreference: "Undecided",
    asoEbiStatus: "Interested",
    plusOnes: 0,
    updatedAt: "3 days ago",
  },
  {
    id: "g-6",
    fullName: "Alhaji Suleiman Danjuma",
    phone: "+234 802 331 0094",
    side: "Parents VIP",
    rsvpStatus: "Confirmed",
    eventsAttending: ["White Wedding"],
    mealPreference: "Grilled Prawns & Basmati Fried Rice",
    asoEbiStatus: "No Aso-Ebi",
    plusOnes: 2,
    dietaryNotes: "Halal certified table",
    updatedAt: "4 days ago",
  },
  {
    id: "g-7",
    fullName: "Kemi & Seyi Onabanjo (Houston)",
    phone: "+1 832 555 0198",
    side: "Diaspora",
    rsvpStatus: "Declined",
    eventsAttending: [],
    mealPreference: "N/A",
    asoEbiStatus: "No Aso-Ebi",
    plusOnes: 0,
    dietaryNotes: "Sent ₦250,000 cash gift via Flutterwave",
    updatedAt: "5 days ago",
  },
];

export const INITIAL_GIFT_FUNDS: GiftItem[] = [
  {
    id: "gift-1",
    title: "Zanzibar & Kigali Honeymoon Fund",
    category: "Cash Fund",
    targetAmount: 3500000,
    raisedAmount: 2480000,
    contributorsCount: 28,
    description: "Help us kick off married life with 7 days on the beaches of Nungwi and a stopover in Kigali.",
    iconName: "Plane",
  },
  {
    id: "gift-2",
    title: "10kVA Solar & Inverter Home Setup",
    category: "Cash Fund",
    targetAmount: 4200000,
    raisedAmount: 3150000,
    contributorsCount: 19,
    description: "Give us uninterrupted 24/7 power in our new Lekki Phase 1 apartment — zero NEPA wahala!",
    iconName: "Zap",
  },
  {
    id: "gift-3",
    title: "Digital Owambe Spraying Pot (No Mint Notes Needed!)",
    category: "Cash Fund",
    targetAmount: 2000000,
    raisedAmount: 1645000,
    contributorsCount: 41,
    description: "Skip the EFCC naira-spraying stress and bank queues! Spray the couple digitally right from the dancefloor.",
    iconName: "Sparkles",
  },
  {
    id: "gift-4",
    title: "official Aso-Ebi Lace + Gele/Fila Pack",
    category: "Aso-Ebi",
    targetAmount: 6500000,
    raisedAmount: 4550000,
    contributorsCount: 70,
    description: "₦65,000 per pack — Swiss Voile Coral Lace (4 yards) + Champagne Gold Aso-Oke Gele or Fila. Pickup in VI or DHL delivery.",
    iconName: "Shirt",
  },
  {
    id: "gift-5",
    title: "Alara Lagos Handcrafted Terracotta Dinner Set",
    category: "Retail Partner",
    targetAmount: 480000,
    raisedAmount: 480000,
    contributorsCount: 4,
    partnerStore: "Alara Lagos",
    commissionRate: "10% partner commission",
    description: "12-piece artisanal Nigerian ceramic dining collection fulfilled directly by Alara Victoria Island.",
    iconName: "Utensils",
  },
];

export const INITIAL_TRANSACTIONS: GiftTransaction[] = [
  {
    id: "TRX-99481",
    guestName: "Uncle Emeka & Aunty Ifeoma",
    giftTitle: "10kVA Solar & Inverter Home Setup",
    amount: 500000,
    platformFee: 7500,
    feePaidBy: "Guest",
    paymentMethod: "Paystack Transfer",
    message: "May your home always shine bright! Enjoy steady light, my children.",
    createdAt: "Today, 09:42 AM",
    settlementStatus: "Pending Settlement (T+1)",
    isPublicAmount: false,
  },
  {
    id: "TRX-99476",
    guestName: "Damilola & Tolu Adeyemi (UK)",
    giftTitle: "Zanzibar & Kigali Honeymoon Fund",
    amount: 350000,
    platformFee: 5250,
    feePaidBy: "Guest",
    paymentMethod: "Flutterwave Diaspora (GBP/USD)",
    message: "Cheers from London! Can't wait to shut down Landmark on Nov 14th!",
    createdAt: "Yesterday, 06:15 PM",
    settlementStatus: "Settled (T+1)",
    isPublicAmount: true,
  },
  {
    id: "TRX-99452",
    guestName: "Zainab Bello-Mustapha",
    giftTitle: "Official Aso-Ebi Lace + Gele/Fila Pack",
    amount: 65000,
    platformFee: 975,
    feePaidBy: "Guest",
    paymentMethod: "Paystack USSD",
    message: "Bride's squad ready! Please reserve my gele with Bimpe.",
    createdAt: "2 days ago",
    settlementStatus: "Settled (T+1)",
    isPublicAmount: true,
  },
  {
    id: "TRX-99419",
    guestName: "Lagos Business School MBA Class '22",
    giftTitle: "Digital Owambe Spraying Pot (No Mint Notes Needed!)",
    amount: 750000,
    platformFee: 11250,
    feePaidBy: "Guest",
    paymentMethod: "Paystack Card",
    message: "From your syndicate group! Expect us on the dancefloor with full energy!",
    createdAt: "3 days ago",
    settlementStatus: "Settled (T+1)",
    isPublicAmount: true,
  },
];

export const VENDORS: VendorProfile[] = [
  {
    id: "v-1",
    name: "Bimpe Onakoya Bridal Artistry",
    slug: "bimpe-bridal-artistry",
    category: "Makeup Artists",
    city: "Lagos",
    neighborhood: "Lekki Phase 1",
    tier: "Featured",
    isVerified: true,
    cacNumber: "RC-1784920",
    rating: 4.9,
    reviewCount: 84,
    minBudget: 450000,
    maxBudget: 1200000,
    priceBandLabel: "₦450k – ₦1.2M",
    diasporaFriendly: true,
    responseTime: "< 1 hour on WhatsApp",
    tagline: "Sweat-proof, high-definition Nigerian bridal glam & avant-garde gele styling.",
    portfolioHighlights: [
      "Over 350+ Lagos & Abuja brides glammed",
      "Includes touch-up artist through reception & afterparty",
      "Complimentary skin prep consultation via Zoom for diaspora brides",
    ],
    packages: [
      { name: "Traditional OR White Wedding Glam", price: 450000, details: "Full bridal glam + 2 gele ties + lashes & skin prep" },
      { name: "Full Weekend Royal Experience", price: 950000, details: "Trad + White Wedding + Afterparty switch + Bride's Mum glam" },
    ],
    availableDates: ["2026-11-14", "2026-11-28", "2026-12-12", "2026-12-19"],
  },
  {
    id: "v-2",
    name: "Jide Odukoya Studios (JOP)",
    slug: "jide-odukoya-studios",
    category: "Photographers",
    city: "Lagos",
    neighborhood: "Victoria Island",
    tier: "Featured",
    isVerified: true,
    cacNumber: "RC-1402911",
    rating: 5.0,
    reviewCount: 112,
    minBudget: 1500000,
    maxBudget: 4500000,
    priceBandLabel: "₦1.5M – ₦4.5M",
    diasporaFriendly: true,
    responseTime: "Replies within 2 hours",
    tagline: "Iconic documentary & editorial wedding storytelling across Nigeria and the UK.",
    portfolioHighlights: [
      "Same-day reception teaser reels for Instagram & WhatsApp",
      "Drone coverage + 3 lead photographers + luxury Italian leather album",
      "Cloud gallery delivered within 14 working days",
    ],
    packages: [
      { name: "Classic Storyteller (1 Day)", price: 1500000, details: "2 Photographers, 1 Cinematographer, 600 edited photos" },
      { name: "Presidential Trad + White Bundle", price: 3200000, details: "Full team, Pre-wedding shoot, Drone, Same-Day Edit, 2 Photobooks" },
    ],
    availableDates: ["2026-11-14", "2026-12-05", "2026-12-26"],
  },
  {
    id: "v-3",
    name: " Chef Fregz & Smokehouse Catering",
    slug: "smokehouse-catering-lagos",
    category: "Caterers",
    city: "Lagos",
    neighborhood: "Ikoyi",
    tier: "Featured",
    isVerified: true,
    cacNumber: "RC-1928374",
    rating: 4.8,
    reviewCount: 67,
    minBudget: 2500000,
    maxBudget: 9000000,
    priceBandLabel: "₦8,500 – ₦22,000 / plate",
    diasporaFriendly: true,
    responseTime: "Replies within 3 hours",
    tagline: "Firewood smoky party jollof, abula stations & gourmet plated fusion for 200–1,000 guests.",
    portfolioHighlights: [
      "Zero 'food finished' guarantee with electronic guest-tag portion tracking",
      "Live Amala & Gbegiri + Peppered Snail interactive stations",
      "Dedicated VIP Parents table servers in bespoke uniforms",
    ],
    packages: [
      { name: "Owambe Classic (300 Guests)", price: 3000000, details: "Jollof, Fried Rice, Ofada, Amala Station, 3 Proteins + Small Chops" },
      { name: "Luxury Banquet (500 Guests)", price: 6500000, details: "Full Nigerian + Continental menu, Seafood platter, Cocktail hour" },
    ],
    availableDates: ["2026-11-14", "2026-11-21", "2026-12-19"],
  },
  {
    id: "v-4",
    name: "Abuja Monolith Marquee & Gardens",
    slug: "abuja-monolith-marquee",
    category: "Venues",
    city: "Abuja",
    neighborhood: "Maitama / Central Area",
    tier: "Featured",
    isVerified: true,
    cacNumber: "RC-1188420",
    rating: 4.9,
    reviewCount: 53,
    minBudget: 3500000,
    maxBudget: 8000000,
    priceBandLabel: "₦3.5M – ₦8.0M",
    diasporaFriendly: true,
    responseTime: "Replies within 1 hour",
    tagline: "1,200-capacity crystal-chandeliers marquee with lush Maitama rock views & dual 500kVA generators.",
    portfolioHighlights: [
      "Chilled industrial AC guaranteed + 2 backup soundproof generators",
      "Private air-conditioned Bridal & Groom luxury suites",
      "Secure parking for 400 cars with armed mobile police escort option",
    ],
    packages: [
      { name: "Weekday / Traditional Ceremony", price: 3500000, details: "Full hall rental, 12 hours AC, Banquet chairs & tables for 500" },
      { name: "Saturday Grand Reception", price: 6000000, details: "Full marquee + Garden cocktail lawn + Stage lighting rig" },
    ],
    availableDates: ["2026-11-14", "2026-11-28", "2026-12-12"],
  },
  {
    id: "v-5",
    name: "House of Deola Aso-Oke & Bespoke Tailors",
    slug: "house-of-deola-aso-oke",
    category: "Aso-Ebi Tailors",
    city: "Lagos",
    neighborhood: "Surulere / Lekki",
    tier: "Standard",
    isVerified: true,
    cacNumber: "RC-2049182",
    rating: 4.9,
    reviewCount: 91,
    minBudget: 350000,
    maxBudget: 3000000,
    priceBandLabel: "₦65k/pack (Bulk Aso-Ebi)",
    diasporaFriendly: true,
    responseTime: "< 30 mins on WhatsApp",
    tagline: "Handwoven Iseyin Aso-Oke for couples + bulk guest Aso-Ebi packaging & doorstep delivery.",
    portfolioHighlights: [
      "Custom woven metallic Aso-Oke with couple's initials woven into hem",
      "Individual guest packaging with custom thank-you tags",
      "Direct DHL dispatch to UK, US & Canada guests",
    ],
    packages: [
      { name: "Couple Custom Aso-Oke Set", price: 650000, details: "Bride Komole iro, buba, gele + Groom Agbada, sokoto & fila" },
      { name: "100-Pack Guest Aso-Ebi Bundle", price: 5500000, details: "Swiss Lace + Gele/Fila packaged and sorted by guest list" },
    ],
    availableDates: ["2026-11-14", "2026-11-21", "2026-12-05"],
  },
  {
    id: "v-6",
    name: "MC Forever & DJ Obi Vibe Syndicate",
    slug: "mc-forever-ph-lagos",
    category: "MCs & DJs",
    city: "Port Harcourt",
    neighborhood: "GRA Phase 2 (Travels Nationwide)",
    tier: "Standard",
    isVerified: true,
    cacNumber: "RC-1665093",
    rating: 4.8,
    reviewCount: 44,
    minBudget: 800000,
    maxBudget: 2500000,
    priceBandLabel: "₦800k – ₦2.5M",
    diasporaFriendly: true,
    responseTime: "Replies within 2 hours",
    tagline: "Clean, hilarious, bilingual ceremony hosting + seamless transition into an unforgettable afterparty.",
    portfolioHighlights: [
      "Respects elders during reception, turns up the heat at the afterparty",
      "Fluent in English, Pidgin, Igbo & Yoruba traditional protocols",
      "Includes concert-grade sound engineer & wireless mics",
    ],
    packages: [
      { name: "Reception Host OR Afterparty DJ", price: 850000, details: "6 hours performance + pre-event programme consultation" },
      { name: "Full MC + DJ + Hypeman Combo", price: 1950000, details: "Complete entertainment crew from 1 PM till 2 AM" },
    ],
    availableDates: ["2026-11-14", "2026-12-12", "2026-12-19"],
  },
  {
    id: "v-7",
    name: "Sara O Events & Floral Architecture",
    slug: "sara-o-floral-decorators",
    category: "Decorators",
    city: "Abuja",
    neighborhood: "Wuse II",
    tier: "Standard",
    isVerified: true,
    cacNumber: "RC-1548291",
    rating: 4.9,
    reviewCount: 39,
    minBudget: 2000000,
    maxBudget: 12000000,
    priceBandLabel: "₦2.0M – ₦12M",
    diasporaFriendly: true,
    responseTime: "Replies within 4 hours",
    tagline: "Suspended floral clouds, custom acrylic dancefloors & immersive traditional stage sets.",
    portfolioHighlights: [
      "3D CAD walkthrough shared with couple 3 weeks before wedding",
      "Fresh imported roses + lush Nigerian tropical foliage",
      "Custom monogrammed LED walkway and sweetheart stage",
    ],
    packages: [
      { name: "Signature Traditional Stage & Hall", price: 2200000, details: "Cultural backdrop, couple throne chairs, 35 guest tables" },
      { name: "Luxury White Wedding Transformation", price: 5500000, details: "Ceiling floral installation, mirror aisle, mood lighting" },
    ],
    availableDates: ["2026-11-21", "2026-12-05", "2026-12-19"],
  },
  {
    id: "v-8",
    name: "Shuga Pulse Live Band",
    slug: "shuga-pulse-live-band",
    category: "Live Bands",
    city: "Lagos",
    neighborhood: "Ikeja GRA",
    tier: "Free",
    isVerified: false,
    cacNumber: "Pending KYC Call",
    rating: 4.7,
    reviewCount: 19,
    minBudget: 1200000,
    maxBudget: 3500000,
    priceBandLabel: "₦1.2M – ₦3.5M",
    diasporaFriendly: false,
    responseTime: "Replies within 6 hours",
    tagline: "12-piece highlife, juju, gospel & afrobeats live band guaranteed to keep parents dancing.",
    portfolioHighlights: [
      "Customises entrance songs with family names & praise",
      "Full talking drum & brass section included",
    ],
    packages: [
      { name: "6-Piece Acoustic Highlife Set", price: 1200000, details: "Ideal for traditional engagement ceremonies" },
      { name: "12-Piece Full Owambe Band", price: 2500000, details: "Full concert PA system + 5 hours live performance" },
    ],
    availableDates: ["2026-11-14", "2026-11-28"],
  },
];

export const VENDOR_LEADS_MOCK: VendorLead[] = [
  {
    id: "L-101",
    coupleNames: "Adaeze & Tunde",
    weddingDate: "14 Nov 2026",
    city: "Lagos (Victoria Island)",
    guestCount: 350,
    estimatedBudget: "₦950,000",
    message: "Hi Bimpe! We love your coral & champagne bridal look. Are you available for both our Trad and White wedding on Nov 14?",
    phone: "+234 803 555 0192",
    status: "New",
    receivedAt: "25 mins ago",
  },
  {
    id: "L-102",
    coupleNames: "Chidinma & Obinna (London, UK)",
    weddingDate: "19 Dec 2026",
    city: "Lagos (Eko Hotel)",
    guestCount: 500,
    estimatedBudget: "₦1,200,000",
    message: "Flying in from London for our December wedding! Need full bridal squad glam for bride + 6 bridesmaids.",
    phone: "+44 7911 123456",
    status: "Replied via WhatsApp",
    receivedAt: "4 hours ago",
  },
  {
    id: "L-103",
    coupleNames: "Halima & Farouk",
    weddingDate: "28 Nov 2026",
    city: "Abuja (Maitama)",
    guestCount: 400,
    estimatedBudget: "₦850,000",
    message: "Looking for Kamu and Dinner glam in Abuja (we cover flights & Hilton stay).",
    phone: "+234 809 443 2210",
    status: "Quote Sent",
    receivedAt: "2 days ago",
  },
  {
    id: "L-104",
    coupleNames: "Funke & Ayo",
    weddingDate: "05 Dec 2026",
    city: "Lagos (Lekki)",
    guestCount: 250,
    estimatedBudget: "₦500,000",
    message: "Interested in the Traditional Engagement package for December 5th.",
    phone: "+234 818 009 4412",
    status: "New",
    receivedAt: "3 days ago",
    isLockedOnFreeTier: true,
  },
];

export interface EventProfilePreset {
  id: string;
  category: EventCategory;
  title: string;
  coupleNames: string; // or Host Names
  slug: string;
  hashtag: string;
  weddingDate: string; // or Event Date
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
  customRegistryNote: string;
  rsvpQuestions: {
    sideLabel: string;
    sideOptions: string[];
    specialQuestion: string;
    mealOptions: string[];
  };
}

export const SAMPLE_EVENTS: EventProfilePreset[] = [
  {
    id: "sample-wedding",
    category: "Wedding",
    title: "Adaeze & Tunde's Lagos Wedding",
    coupleNames: "Adaeze & Tunde",
    slug: "adaeze-and-tunde",
    hashtag: "#TheATUnion26",
    weddingDate: "2026-11-14",
    city: "Victoria Island, Lagos",
    selectedTemplateId: "eko-coral-gold",
    heroTitle: "Two Hearts, One Big Lagos Owambe",
    ourStory:
      "We met at a friend's birthday dinner in Victoria Island back in 2023 when Tunde insisted that Nigerian Jollof tastes better with plantain dodo AND coleslaw. Three years and countless Lagos drives later, we're tying the knot!",
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
    customRegistryNote: "Help us furnish our new Lekki apartment and fund our Zanzibar honeymoon!",
    rsvpQuestions: {
      sideLabel: "Guest Side",
      sideOptions: ["Bride's Family / Squad", "Groom's Family / Guys", "Parents VIP Table", "Diaspora Flight"],
      specialQuestion: "Joining the official ₦65,000 Aso-Ebi pack?",
      mealOptions: [
        "Smoky Party Jollof & Peppered Turkey",
        "Pounded Yam & Egusi Soup + Croaker",
        "Ofada Rice & Spicy Ayamase Stew",
        "Grilled Jumbo Prawns & Basmati Fried Rice",
      ],
    },
  },
  {
    id: "sample-baby-shower",
    category: "Baby Shower",
    title: "Baby Zara's Safari Blossom Shower",
    coupleNames: "Kemi & Dayo (Expecting Baby Zara)",
    slug: "baby-zara-shower",
    hashtag: "#BabyZaraIsComing",
    weddingDate: "2026-11-21",
    city: "Ikoyi, Lagos",
    selectedTemplateId: "pastel-peach-blossom",
    heroTitle: "A Sweet New Adventure Begins",
    ourStory:
      "Our hearts are overflowing with gratitude as we get ready to welcome our baby girl Zara. Join us for a high-tea brunch, fun baby shower games, and sweet celebration as we countdown to her arrival!",
    tradVenue: "The Wheatbaker Hotel Garden Terrace, 4 Onitolo Rd, Ikoyi, Lagos",
    tradTime: "1:00 PM WAT (Baby Shower Brunch & Mocktail Bar)",
    whiteVenue: "Private Rooftop Lounge, Bourdillon Rd, Ikoyi",
    whiteTime: "4:00 PM Games, Baby Due-Date Predictions & Cake Cutting",
    asoEbiBrideColor: "Pastel Peach & Soft Blush",
    asoEbiBrideHex: "#FB923C",
    asoEbiGroomColor: "Warm Sunshine Buttercup",
    asoEbiGroomHex: "#FBBF24",
    asoEbiPrice: 0,
    rsvpDeadline: "2026-11-12",
    feePlacement: "Guest",
    showGiftAmountsPublicly: true,
    isPremiumCouple: false,
    customDomain: "babyzara.ng",
    customRegistryNote: "Diaper fund, luxury nursery crib, and baby stroller registry via Paystack.",
    rsvpQuestions: {
      sideLabel: "Friend / Family Of",
      sideOptions: ["Mum's Friends / Squad", "Dad's Friends / Family", "Work Colleagues", "Doting Grandparents"],
      specialQuestion: "Guess baby's arrival date or birth weight (kg)?",
      mealOptions: [
        "Gourmet Brunch Platter & Waffles",
        "Mini Jollof Skewers & Peppered Snails",
        "Seafood Caesar Salad & Grilled Croaker",
        "Vegan Fruit & Pastry Tower",
      ],
    },
  },
  {
    id: "sample-birthday",
    category: "Birthday",
    title: "Chief Dr. Gbenga Alabi at 60 (Diamond Jubilee)",
    coupleNames: "Chief Dr. Gbenga Alabi, KJW",
    slug: "chief-alabi-at-60",
    hashtag: "#ChiefAlabiAt60",
    weddingDate: "2026-12-05",
    city: "Ikeja GRA, Lagos",
    selectedTemplateId: "golden-jubilee-royale",
    heroTitle: "60 Years of Impact, Grace & Glory",
    ourStory:
      "A diamond milestone worth celebrating with all the pomp, thanksgiving, and joy. Join Chief Dr. Alabi, his family, and distinguished associates for an evening of praise, gourmet dining, and dancefloor celebration.",
    tradVenue: "Archbishop Vining Memorial Church Cathedral, GRA Ikeja",
    tradTime: "11:00 AM Thanksgiving & Holy Communion Service",
    whiteVenue: "The Jewel Aeida Grand Marquee, Hakeem Balogun St, CBD Alausa, Ikeja",
    whiteTime: "2:00 PM Red Carpet Reception & 70s/80s Highlife Gala",
    asoEbiBrideColor: "Champagne Gold Damask",
    asoEbiBrideHex: "#D97706",
    asoEbiGroomColor: "Royal Obsidian Black & Gold",
    asoEbiGroomHex: "#1C1917",
    asoEbiPrice: 80000,
    rsvpDeadline: "2026-11-25",
    feePlacement: "Couple",
    showGiftAmountsPublicly: false,
    isPremiumCouple: true,
    customDomain: "chiefalabi60.com",
    customRegistryNote: "Chief requests support for his Alma Mater Secondary School Science Laboratory Endowment.",
    rsvpQuestions: {
      sideLabel: "Affiliation / Table Zone",
      sideOptions: ["Distinguished Old Boys / University Colleagues", "Church & Society Members", "Business Associates", "Children & Grandchildren Friends"],
      specialQuestion: "Do you have a 1-minute video tribute to share with the documentary team?",
      mealOptions: [
        "Slow-Cooked Asun Goat & Native Fried Rice",
        "Fresh Catfish Pepper Soup & Pounded Yam",
        "Grilled Salmon with Garlic Butter & Parsley Potatoes",
        "Classic Nigerian Jollof & Smoked Turkey",
      ],
    },
  },
];

export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}


