import { ReactNode } from "react";

export function Text({ children }: { children: ReactNode }) {
  return (
    <div className="lg:hidden fixed transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  );
}
