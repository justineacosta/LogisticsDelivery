import { PageHeader } from "@/components/shared/page-header";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms governing your use of Velocita Logistics services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Last updated: January 1, 2026"
      />

      <article className="container max-w-3xl space-y-6 py-12 leading-relaxed text-foreground/90">
        <Section title="1. Acceptance">
          By using Velocita's services or website, you agree to these Terms.
          Quotes, bookings, and shipments are also governed by our Standard
          Trading Conditions and the rules of the relevant carriage convention
          (CMR, Hague-Visby, Montreal, Warsaw, where applicable).
        </Section>
        <Section title="2. Services">
          Velocita arranges transportation, warehousing, and customs services.
          We act as a freight forwarder unless explicitly stated otherwise in a
          signed agreement.
        </Section>
        <Section title="3. Liability">
          Liability is limited to the amounts set forth in the applicable
          international convention and our Standard Trading Conditions. Special
          cargo, declared values, and all-risk insurance are available at
          quotation.
        </Section>
        <Section title="4. Payment">
          Invoices are due net 30 days from the invoice date unless otherwise
          agreed in writing. Late payments may incur interest at the rate
          permitted by applicable law.
        </Section>
        <Section title="5. Compliance">
          Customer warrants that all shipments comply with applicable export
          controls, sanctions, and customs laws, including those of the United
          States, the European Union, and the United Kingdom.
        </Section>
        <Section title="6. Force majeure">
          Neither party is liable for delays caused by events beyond reasonable
          control, including natural disasters, port strikes, war, pandemics,
          and government action.
        </Section>
        <Section title="7. Governing law">
          These Terms are governed by the laws of the State of California
          (United States) without regard to conflict-of-law principles. Disputes
          are subject to binding arbitration under the AAA Commercial Rules.
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
