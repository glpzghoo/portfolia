import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
const poppins = Poppins({ weight: "500", subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark ${poppins.className} overflow-x-hidden`}
      >
        <div className="fixed z-0">
          <Image
            src={`/img/Background-Pattern.svg`}
            alt="background pattern"
            width={10000}
            height={10000}
          />
        </div>
        <div className="z-1 relative w-full">{children}</div>
      </body>
    </html>
  );
}
