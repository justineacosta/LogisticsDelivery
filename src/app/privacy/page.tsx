import { PageHeader } from "@/components/shared/page-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Velocita Logistics collects, uses, and protects your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: January 1, 2026"
      />

      <article className="container max-w-3xl space-y-6 py-12 leading-relaxed text-foreground/90">
        <Section title="1. Introduction">
          Velocita Logistics (“Velocita,” “we,” “our”) provides freight forwarding
          and supply chain services. This Privacy Policy describes the personal
          data we collect, how we use it, and the rights you have over it.
        </Section>

        <Section title="2. Data we collect">
          We collect information you provide directly (name, email, phone,
          company, shipment details), information from your use of the platform
          (logs, device info, IP address), and operational data necessary to
          execute your shipments (origin/destination, cargo, customs).
        </Section>

        <Section title="3. How we use data">
          We process personal data to provide and improve our services, comply
          with customs and trade regulations, send transactional and marketing
          communications you've opted into, and prevent fraud or abuse.
        </Section>

        <Section title="4. Sharing">
          We share data with carriers, customs authorities, and service
          providers necessary to perform shipments. We do not sell personal
          data. International transfers are governed by Standard Contractual
          Clauses where applicable.
        </Section>

        <Section title="5. Retention">
          We retain personal data for as long as necessary to provide services
          and to comply with legal, accounting, and regulatory requirements
          (typically 7 years for trade-related records).
        </Section>

        <Section title="6. Your rights">
          Subject to applicable law, you may request access, correction,
          deletion, restriction, or portability of your personal data. Contact{" "}
          <a
            href="mailto:privacy@velocita.com"
            className="text-brand-600 hover:underline dark:text-brand-300"
          >
            privacy@velocita.com
          </a>{" "}
          to exercise these rights.
        </Section>

        <Section title="7. Security">
          We use TLS in transit, AES-256 at rest, role-based access controls,
          and SOC 2 Type II controls. No system is perfectly secure, but we
          take it seriously.
        </Section>

        <Section title="8. Contact">
          Velocita Logistics, 1 Harbor Plaza, Long Beach, CA 90802. Data
          Protection Officer:{" "}
          <a
            href="mailto:dpo@velocita.com"
            className="text-brand-600 hover:underline dark:text-brand-300"
          >
            dpo@velocita.com
          </a>
          .
        </Section>
      </article>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-muted-foreground">{children}</p>
    </section>
  );
}
