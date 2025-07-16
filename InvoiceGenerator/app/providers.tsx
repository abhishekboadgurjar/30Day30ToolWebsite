"use client";

import { InvoiceProvider } from "@/hooks/useInvoice";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InvoiceProvider>
      {children}
    </InvoiceProvider>
  );
}