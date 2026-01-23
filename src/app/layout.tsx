import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import OnboardingGuard from "@/components/shared/OnboardingGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansTelugu = Noto_Sans_Telugu({
  variable: "--font-noto-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aqua Nestam - ఆక్వా నేస్తం",
  description: "Digital Aqua Platform for Farmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansTelugu.variable} antialiased`}
      >
        <OnboardingGuard>
          {children}
        </OnboardingGuard>
      </body>
    </html>
  );
}
