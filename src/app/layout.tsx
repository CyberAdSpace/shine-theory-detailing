import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shine Theory Detailing — Mobile Vehicle Detailing Marketplace",
  description:
    "Connect with mobile detailers, find detailing spaces, and get your vehicle looking brand new. Post jobs, bid on work, or host a detailing space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-950">{children}</body>
    </html>
  );
}
