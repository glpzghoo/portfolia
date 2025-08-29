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
        {/* Video background */}
        <video
          src="https://res.cloudinary.com/de1g2bwml/video/upload/v1756466224/hncxryi4lgzxijy2alp6.mp4"
          className="fixed inset-0 w-full h-full object-cover z-0"
          muted
          autoPlay
          loop
          playsInline
        />

        {/* Page content */}
        <div className="relative z-10 w-full">
          <Suspense fallback={<div>Please wait...</div>}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
