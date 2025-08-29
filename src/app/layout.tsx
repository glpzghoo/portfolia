import type { Metadata } from "next";
import { Fredoka, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nergui Adiyakhuu",
  description: "Portfolia for Nergui Adiyakhuu",
};
const montserrate = Fredoka({
  subsets: ["latin"],
  weight: "400",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark ${montserrate.className} overflow-x-hidden`}
      >
        {/* Page content */}
        <div className="relative z-10 w-full">
          <Suspense fallback={<div>Please wait...</div>}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
