import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/content/site-data";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to the most common questions about quotes, dangerous goods, integrations, insurance, and tracking.",
  path: "/faq",
});

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
    url: absoluteUrl("/faq"),
  };
}

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Frequently asked <span className="gradient-text">questions</span>
          </>
        }
        description="If your question isn't here, write to us — a real human (usually) responds within an hour."
      />

      <section className="container py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-3 sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="px-4 last:border-0"
              >
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-muted-foreground">
            Still curious? We answer faster than most logistics support teams.
          </p>
          <Button asChild className="mt-4">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
    </>
  );
}
