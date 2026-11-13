import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { FidaleEventsProvider } from "@/context/FidaleEventsContext";
import { Navbar } from "@/components/Navbar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fidale Events — Free Nigerian Wedding Website Builder, RSVP & Verified Vendor Marketplace",
  description:
    "Plan your dream Nigerian wedding without WhatsApp chaos. Build a free Afro-elegant wedding website, track RSVPs & Aso-Ebi orders, collect cash gifts via Paystack/Flutterwave, and book CAC-verified vendors in Lagos, Abuja & Port Harcourt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-[#FFFDF9] text-stone-900">
        <FidaleEventsProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </FidaleEventsProvider>
      </body>
    </html>
  );
}

