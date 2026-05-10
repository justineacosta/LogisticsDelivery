"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const HIDDEN_PREFIXES = ["/admin", "/login"];

export function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const hide = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  if (hide) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
