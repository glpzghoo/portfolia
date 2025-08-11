import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Image from "next/image";
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
const montserrate = Pacifico({
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
        <div className="fixed z-0">
          <Image
            src={`/img/Background-Pattern.svg`}
            alt="background pattern"
            width={10000}
            height={10000}
          />
        </div>
        <div className="z-1 relative w-full">
          <Suspense fallback={<div>Please wait...</div>}>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
