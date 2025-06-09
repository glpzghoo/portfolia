import type { Metadata } from "next";
import "../globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nergui Adiyakhuu",
  description: "Portfolia for Nergui Adiyakhuu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense fallback={<div>Please wait...</div>}>{children}</Suspense>
    </div>
  );
}
