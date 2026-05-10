import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";

export const siteConfig = {
  name: "Velocita Logistics",
  shortName: "Velocita",
  description:
    "Velocita is a global logistics partner moving freight by road, air, ocean, and rail — with real-time tracking, bonded warehousing, and last-mile delivery in 90+ countries.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  ogImage: "/og.png",
  twitter: "@velocita",
  contact: {
    email: "hello@velocita.com",
    phone: "+1 (234) 567-8910",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+12345678910",
    address: "1 Harbor Plaza, Long Beach, CA 90802",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Fleet", href: "/fleet" },
    { label: "Tracking", href: "/tracking" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
} as const;

export type SeoArgs = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: SeoArgs = {}): Metadata {
  const fullTitle = title
    ? `${title} · ${siteConfig.shortName}`
    : `${siteConfig.name} — Smarter freight for a faster world`;
  const desc = description ?? siteConfig.description;
  const url = absoluteUrl(path);
  const ogImage = image ?? siteConfig.ogImage;

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description: desc,
    applicationName: siteConfig.name,
    keywords: [
      "logistics",
      "freight forwarding",
      "supply chain",
      "shipment tracking",
      "ocean freight",
      "air cargo",
      "trucking",
      "warehousing",
      "last-mile delivery",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description: desc,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      creator: siteConfig.twitter,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    sameAs: [
      "https://www.linkedin.com/company/velocita",
      "https://twitter.com/velocita",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        contactType: "customer service",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Spanish", "Mandarin"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "1 Harbor Plaza",
      addressLocality: "Long Beach",
      addressRegion: "CA",
      postalCode: "90802",
      addressCountry: "US",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
