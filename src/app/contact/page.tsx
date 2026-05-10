import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to a real human at Velocita — sales, support, partnerships, and press.",
  path: "/contact",
});

const channels = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with ops",
    href: `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`,
  },
  {
    icon: MapPin,
    label: "HQ",
    value: siteConfig.contact.address,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Talk to a <span className="gradient-text">real human</span>
          </>
        }
        description="Sales, support, partnerships, or press. Pick a channel — we typically respond within an hour during business hours."
      />

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand-500/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/50 dark:text-brand-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-1 font-medium">{value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold">Send us a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We respond within 1 business day, usually within an hour.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
