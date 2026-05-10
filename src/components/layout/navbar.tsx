"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";
import { ModeToggle } from "@/components/layout/mode-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150 shadow-sm"
          : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-1"
        >
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active && "text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="hidden xl:inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            {siteConfig.contact.phone}
          </a>
          <ModeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/tracking">Track</Link>
          </Button>
          <Button asChild variant="glow" size="sm">
            <Link href="/pricing">Get a quote</Link>
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <ModeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm pt-12">
              <div className="mb-8">
                <Logo />
              </div>
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-medium hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 grid gap-2">
                <Button asChild variant="outline">
                  <Link href="/tracking">Track shipment</Link>
                </Button>
                <Button asChild variant="glow">
                  <Link href="/pricing">Get a quote</Link>
                </Button>
                <Button asChild variant="ghost">
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    <Phone className="h-4 w-4" />
                    {siteConfig.contact.phone}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
