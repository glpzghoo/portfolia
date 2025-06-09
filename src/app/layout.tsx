import type { Metadata } from "next";
import { Geist, Geist_Mono, LXGW_WenKai_TC } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Suspense } from "react";
import { Providers } from "./providers";

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
const montserrate = LXGW_WenKai_TC({
  subsets: ["latin"],
  weight: "400",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${montserrate.className} overflow-x-hidden`}
      >
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
