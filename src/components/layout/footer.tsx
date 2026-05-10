import Link from "next/link";
import { Mail, MapPin, Phone, Linkedin, Twitter, Github } from "lucide-react";
import { siteConfig } from "@/lib/seo";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const columns = [
  {
    heading: "Solutions",
    links: [
      { label: "Road Freight", href: "/services#road-freight" },
      { label: "Air Cargo", href: "/services#air-cargo" },
      { label: "Ocean Freight", href: "/services#ocean-freight" },
      { label: "Warehousing & 3PL", href: "/services#warehousing" },
      { label: "Last-Mile", href: "/services#last-mile" },
      { label: "Customs Brokerage", href: "/services#customs-brokerage" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Industries", href: "/industries" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/blog" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Track shipment", href: "/tracking" },
      { label: "Get a quote", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-6">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                {siteConfig.contact.address}
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="hover:text-foreground"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-2 pt-1">
              {[
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { Icon: Github, href: "https://github.com", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="mb-4 text-sm font-semibold">{col.heading}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold">Logistics intel, monthly</h3>
            <p className="text-sm text-muted-foreground">
              Trade lane updates, capacity reports, and rate trends. No spam.
            </p>
            <NewsletterForm source="footer" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Velocita Logistics. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            ISO 9001 · AEO · C-TPAT · IATA · FMC OTI
          </p>
        </div>
      </div>
    </footer>
  );
}
