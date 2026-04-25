import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    q: "How do I find my size?",
    a: "Visit our Size Guide page for full measurement instructions and size charts for both Women's and Men's garments. If you remain unsure, our atelier team is happy to advise.",
  },
  {
    q: "What materials are used?",
    a: "Maison Élite sources exclusively from heritage mills in Italy, Scotland, and France. Our garments feature cashmere, fine merino wool, silk, and hand-tanned leathers — each ethically and sustainably procured.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard international shipping takes 5–8 business days. Express service (2–3 days) is available for most destinations. Bespoke and made-to-order pieces require 4–6 weeks from confirmation.",
  },
  {
    q: "Can I return a sale item?",
    a: "Sale items are eligible for exchange or store credit only, not refund. All items must be returned in original condition with tags attached within 14 days of delivery.",
  },
  {
    q: "How should I care for my garment?",
    a: "Each piece arrives with a care card detailing specific instructions. As a general rule, cashmere and fine wool should be dry-cleaned or gently hand-washed; silk requires dry cleaning only.",
  },
  {
    q: "Do you offer bespoke or alterations?",
    a: "Yes. Our Paris atelier offers bespoke commissions and alterations for existing Maison Élite garments. Please contact us at hello@maisonelite.com to arrange a consultation.",
  },
  {
    q: "Is my payment information secure?",
    a: "All transactions are processed via Stripe's PCI-DSS compliant infrastructure. Maison Élite never stores your card details — payments are encrypted end-to-end.",
  },
  {
    q: "Do you ship to my country?",
    a: "We ship to over 80 countries worldwide. Shipping rates and estimated delivery times are calculated at checkout. Some restricted regions may incur additional import duties.",
  },
];

interface PolicySectionDef {
  id: string;
  title: string;
  content: React.ReactNode;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        data-ocid="policies.toggle"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-sm text-foreground group-hover:text-primary transition-colors duration-200">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 mt-0.5 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-border" />
      <div className="w-8 h-0.5 bg-primary/60" />
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

const SECTIONS: PolicySectionDef[] = [
  {
    id: "shipping",
    title: "Shipping Policy",
    content: (
      <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
        <p>
          Maison Élite dispatches orders from our Paris atelier Monday through
          Friday. Orders placed before 12:00 CET are typically processed the
          same business day.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Delivery Times
        </h4>
        <ul className="space-y-2 pl-4">
          {[
            ["France & Monaco", "2–3 business days"],
            ["European Union", "3–5 business days"],
            ["United Kingdom", "3–5 business days"],
            ["United States & Canada", "5–8 business days"],
            ["Rest of World", "7–12 business days"],
            ["Express (Global)", "1–3 business days"],
          ].map(([region, time]) => (
            <li
              key={region}
              className="flex justify-between gap-8 border-b border-border/50 pb-2"
            >
              <span className="text-foreground">{region}</span>
              <span>{time}</span>
            </li>
          ))}
        </ul>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Shipping Costs
        </h4>
        <p>
          Complimentary standard shipping is offered on all orders exceeding
          €500. For orders below this threshold, a flat rate of €15 applies
          within the EU and €25 internationally. Express shipping is calculated
          at checkout based on weight and destination.
        </p>
        <p>
          Import duties and taxes are the responsibility of the recipient and
          are not included in the purchase price. Maison Élite is not liable for
          delays caused by customs clearance.
        </p>
      </div>
    ),
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    content: (
      <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
        <p>
          We stand behind the quality of every piece. Should you wish to return
          or exchange an item, we offer a 14-day return window from the date of
          delivery.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Conditions
        </h4>
        <ul className="space-y-1.5 pl-4 list-none">
          {[
            "Items must be unworn, unwashed, and in their original condition.",
            "All original tags, dust bags, and packaging must be included.",
            "Sale items are eligible for exchange or store credit only.",
            "Bespoke and made-to-order garments are non-returnable.",
            "Swimwear and intimate pieces cannot be returned for hygiene reasons.",
          ].map((c) => (
            <li key={c} className="flex gap-3">
              <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary/60" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Process
        </h4>
        <p>
          To initiate a return, email{" "}
          <a
            href="mailto:returns@maisonelite.com"
            className="text-foreground border-b border-border hover:border-primary transition-colors duration-200"
          >
            returns@maisonelite.com
          </a>{" "}
          with your order number and reason for return. Our team will provide a
          prepaid return label within 48 hours. Refunds are processed within 5–7
          business days of receipt and inspection.
        </p>
      </div>
    ),
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    content: (
      <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
        <p>
          Maison Élite is committed to protecting your personal data and
          privacy. This policy explains how we collect, use, and safeguard
          information when you interact with our platform.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Data We Collect
        </h4>
        <p>
          We collect information you provide directly — name, email address,
          shipping address, and payment details (processed securely via Stripe,
          never stored by us). We also collect browsing data, device
          identifiers, and session analytics to improve our service.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          How We Use Your Data
        </h4>
        <p>
          Your data is used solely to fulfil orders, provide customer service,
          and — with your consent — send editorial updates and curated
          communications. We do not sell or share your personal data with third
          parties for marketing purposes.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Cookies
        </h4>
        <p>
          We use essential cookies for authentication and cart persistence.
          Optional analytics cookies are used only with your consent. You may
          withdraw cookie consent at any time via your browser settings.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Your Rights
        </h4>
        <p>
          Under GDPR and applicable data protection laws, you have the right to
          access, correct, or delete your personal data. Submit requests to{" "}
          <a
            href="mailto:privacy@maisonelite.com"
            className="text-foreground border-b border-border hover:border-primary transition-colors duration-200"
          >
            privacy@maisonelite.com
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    id: "terms",
    title: "Terms of Service",
    content: (
      <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
        <p>
          By accessing and purchasing from the Maison Élite platform, you agree
          to be bound by these Terms of Service. Please read them carefully
          before completing any transaction.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Purchase Terms
        </h4>
        <p>
          All prices are displayed in Euros and include applicable VAT where
          required by law. Maison Élite reserves the right to cancel orders at
          our discretion, including in cases of pricing error, suspected fraud,
          or unavailability of stock. A full refund will be issued in such
          cases.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Intellectual Property
        </h4>
        <p>
          All content on this platform — including photographs, editorial copy,
          brand identity, and design — is the exclusive intellectual property of
          Maison Élite SAS. Reproduction, redistribution, or commercial use of
          any content without prior written consent is strictly prohibited.
        </p>
        <h4 className="font-display text-sm text-foreground tracking-wide">
          Limitation of Liability
        </h4>
        <p>
          To the fullest extent permitted by law, Maison Élite shall not be
          liable for indirect, incidental, or consequential damages arising from
          the use of our platform or products. Our liability is limited to the
          purchase price of the relevant item.
        </p>
        <p>
          These terms are governed by the laws of France and the European Union.
          Any disputes shall be resolved in the courts of Paris.
        </p>
      </div>
    ),
  },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    content: (
      <div className="space-y-0 divide-y divide-border">
        {FAQ_ITEMS.map((item) => (
          <FAQItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    ),
  },
];

export function PoliciesPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted/30 py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <AnimatedSection variant="fade-in">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Transparency
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight mb-5">
              Policies &amp; Information
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We believe in complete transparency with our clientele. Everything
              you need to know about how we operate.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Table of contents */}
      <section className="py-10 bg-card border-b border-border sticky top-16 z-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <nav aria-label="Policy sections">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 justify-center">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-ocid={`policies.${s.id}.link`}
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground hover:text-primary border-b border-transparent hover:border-primary/50 pb-0.5 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(s.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Policy sections */}
      <article className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          {SECTIONS.map((section, i) => (
            <AnimatedSection
              key={section.id}
              variant="slide-in-up"
              delay={i * 60}
            >
              <section id={section.id} className="scroll-mt-36 pt-4 pb-12">
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                  {section.title}
                </h2>
                {section.content}
              </section>
              {i < SECTIONS.length - 1 && <GoldDivider />}
            </AnimatedSection>
          ))}
        </div>
      </article>
    </Layout>
  );
}
