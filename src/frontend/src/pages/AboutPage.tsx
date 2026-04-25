import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";

const values = [
  {
    title: "Heritage",
    description:
      "Rooted in a Parisian legacy that spans four decades, every Maison Élite piece carries the quiet confidence of time-honoured tradition.",
  },
  {
    title: "Craftsmanship",
    description:
      "Each garment is constructed by hand in our Marais atelier — cut, draped, and finished by artisans who have devoted their lives to the craft.",
  },
  {
    title: "Timelessness",
    description:
      "We do not chase seasons. We create wardrobe foundations that appreciate with wear and resist the noise of fleeting trend.",
  },
];

const team = [
  {
    img: "https://picsum.photos/seed/atelier1/600/800",
    name: "Marguerite Fontaine",
    title: "Creative Director",
  },
  {
    img: "https://picsum.photos/seed/atelier2/600/800",
    name: "Étienne Beaumont",
    title: "Head of Atelier",
  },
  {
    img: "https://picsum.photos/seed/atelier3/600/800",
    name: "Isabelle Renard",
    title: "Head of Textiles",
  },
];

export function AboutPage() {
  return (
    <Layout fullBleed>
      {/* ── Hero ── */}
      <section
        className="relative flex items-end min-h-[60vh] px-6 pb-20 overflow-hidden"
        style={{ background: "oklch(0.5 0.025 50)" }}
        data-ocid="about.hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url(https://picsum.photos/seed/maisonhero/1600/900)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <p
            className="font-display text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "oklch(0.78 0.12 65)" }}
          >
            Maison Élite
          </p>
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-none"
            style={{ color: "oklch(0.96 0.018 75)" }}
          >
            Our Heritage
          </h1>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section
        className="editorial-section bg-background"
        data-ocid="about.story"
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <AnimatedSection variant="fade-in">
            <p className="font-body text-lg md:text-xl text-foreground leading-[1.9] text-center italic">
              Est. 1987 — Born from a Parisian atelier.
            </p>
          </AnimatedSection>
          <AnimatedSection variant="slide-in-up" delay={100}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.9]">
              Maison Élite was founded in 1987 by Marguerite Fontaine in a
              narrow atelier on Rue du Faubourg Saint-Honoré. What began as a
              small couture studio — rented for its north-facing light and worn
              parquet floors — quickly earned a reputation for quietly
              exceptional tailoring. Marguerite's training under the great
              houses of the seventies instilled in her a belief that a garment's
              worth is measured not at first glance but in the tenth year of
              wear. That conviction has never left the house.
            </p>
          </AnimatedSection>
          <AnimatedSection variant="slide-in-up" delay={200}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.9]">
              The philosophy of the house is deceptively simple: build for the
              body as it moves through a life. Every seam is placed with the
              understanding that the wearer will walk into a meeting, step onto
              a terrace, pause in a doorway at evening — and in each of these
              moments, the clothes must hold their composure. We select our
              wools from a single Biella mill, our silks from a family-run
              workshop in Lyon, and our hardware from a third-generation
              Florentine ironmonger. Nothing is sourced for convenience. Every
              choice is an argument for quality over speed.
            </p>
          </AnimatedSection>
          <AnimatedSection variant="slide-in-up" delay={300}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.9]">
              Today, under the creative direction of Étienne Beaumont, Maison
              Élite looks forward with the same quiet authority that has always
              defined it. New silhouettes are introduced slowly, each informed
              by the archive and measured against a single question: will this
              matter in twenty years? A growing community of discerning clients
              across Paris, Milan, New York, and Tokyo has expanded the house's
              reach without diluting its soul. We remain, above all, an atelier.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Split Layout 1: Image Left ── */}
      <section
        className="editorial-section bg-secondary/30"
        data-ocid="about.split1"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection
            variant="fade-in"
            className="overflow-hidden rounded-sm"
          >
            <img
              src="https://picsum.photos/seed/atelier_craft/800/1000"
              alt="Atelier craftsmanship"
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </AnimatedSection>
          <AnimatedSection variant="slide-in-right" delay={150}>
            <p
              className="font-display text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: "oklch(0.78 0.12 65)" }}
            >
              The Atelier
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Where Every Stitch Is Intentional
            </h2>
            <p className="font-body text-muted-foreground leading-[1.9] mb-4">
              Our Marais atelier is not a factory. It is a workspace built
              around human attention — natural light pouring across cutting
              tables, the gentle percussion of hand-sewing, bolts of cloth
              suspended from century-old racks.
            </p>
            <p className="font-body text-muted-foreground leading-[1.9]">
              Every jacket that leaves our doors has passed through at least
              twelve pairs of hands — pattern cutters, tailors, pressers,
              finishers. We do not automate what cannot be automated without
              loss.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Split Layout 2: Image Right ── */}
      <section
        className="editorial-section bg-background"
        data-ocid="about.split2"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection
            variant="slide-in-up"
            delay={150}
            className="order-2 md:order-1"
          >
            <p
              className="font-display text-xs tracking-[0.25em] uppercase mb-5"
              style={{ color: "oklch(0.78 0.12 65)" }}
            >
              Materials
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              Sourced With Uncompromising Care
            </h2>
            <p className="font-body text-muted-foreground leading-[1.9] mb-4">
              We travel to source. The Biella wools that anchor our autumn
              collection are chosen in person — held to the light, weighed, run
              across the wrist. The Lyon silks that flow through our spring
              pieces carry a provenance of over a hundred years of weaving.
            </p>
            <p className="font-body text-muted-foreground leading-[1.9]">
              Material integrity is not a marketing position for us. It is the
              foundation that makes a thirty-year coat possible.
            </p>
          </AnimatedSection>
          <AnimatedSection
            variant="fade-in"
            className="order-1 md:order-2 overflow-hidden rounded-sm"
          >
            <img
              src="https://picsum.photos/seed/atelier_fabric/800/1000"
              alt="Fabric sourcing"
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section
        className="editorial-section bg-muted/40"
        data-ocid="about.values"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection variant="fade-in" className="mb-14 text-center">
            <SectionTitle
              eyebrow="Principles"
              title="Our Values"
              subtitle="Three beliefs that have guided Maison Élite since the first stitch was placed in 1987."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((v, i) => (
              <AnimatedSection
                key={v.title}
                variant="slide-in-up"
                delay={i * 150}
                className="text-center px-4"
                data-ocid={`about.value.item.${i + 1}`}
              >
                <div
                  className="w-px h-12 mx-auto mb-8"
                  style={{ background: "oklch(0.78 0.12 65)" }}
                />
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                  {v.title}
                </h3>
                <p className="font-body text-muted-foreground leading-[1.8] text-sm md:text-base">
                  {v.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section
        className="editorial-section bg-background"
        data-ocid="about.team"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection variant="fade-in" className="mb-14 text-center">
            <SectionTitle
              eyebrow="The Makers"
              title="The Atelier"
              subtitle="The people whose hands bring Maison Élite to life."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <AnimatedSection
                key={member.name}
                variant="slide-in-up"
                delay={i * 120}
                className="group"
                data-ocid={`about.team.item.${i + 1}`}
              >
                <div className="overflow-hidden rounded-sm mb-5">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full aspect-[3/4] object-cover transition-smooth group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {member.title}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
