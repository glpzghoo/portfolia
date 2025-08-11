import { Orbitron, Inter } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });
const inter = Inter({ subsets: ["latin", "cyrillic"] });

function Label({ children }: { children: React.ReactNode }) {
  return <span className={inter.className}>{children}</span>;
}

function NumberWrap({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={orbitron.className}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {children}
    </span>
  );
}

export { Label, NumberWrap };
