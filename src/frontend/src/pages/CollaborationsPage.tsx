import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollaborations } from "@/hooks/useBackend";
import type { Collaboration } from "@/types";
import { Link } from "@tanstack/react-router";

const FALLBACK_COLLABORATIONS: Collaboration[] = [
  {
    id: 1n,
    title: "A Study in Restraint",
    celebrity: "Isabelle Moreau",
    campaign: "Autumn / Winter 2024",
    description:
      "Actress and ambassador Isabelle Moreau brings her singular poise to the Autumn/Winter collection — a woman for whom understatement is the highest form of elegance.",
    quote:
      "Maison Élite clothes are the ones I reach for when I need to be remembered without effort.",
    coverImage: {
      url: "https://picsum.photos/seed/collab1/1600/900",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1697500000000n,
  },
  {
    id: 2n,
    title: "The New Classicism",
    celebrity: "Rafael Okafor",
    campaign: "Spring / Summer 2024",
    description:
      "With his sharp eye for form and uncompromising taste, Rafael Okafor captures the contemporary spirit of the house.",
    quote:
      "Wearing Maison Élite feels like speaking fluent French in a room that expects broken phrases.",
    coverImage: {
      url: "https://picsum.photos/seed/collab2/1600/900",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1711900000000n,
  },
  {
    id: 3n,
    title: "La Vie en Doré",
    celebrity: "Claudine Voss",
    campaign: "Resort 2025",
    description:
      "Fashion icon Claudine Voss renders the Resort collection with iconic ease, photographed over three days in Cap d'Antibes.",
    quote:
      "True luxury is the absence of noise. That's exactly what these clothes give you.",
    coverImage: {
      url: "https://picsum.photos/seed/collab3/1600/900",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1704200000000n,
  },
  {
    id: 4n,
    title: "Monochrome Dialogue",
    celebrity: "Dmitri Lavrov",
    campaign: "Pre-Fall 2024",
    description:
      "The director and cultural polymath Dmitri Lavrov explores the dialogue between restraint and drama in our Pre-Fall campaign.",
    quote: "I came for the coat. I stayed for the philosophy.",
    coverImage: {
      url: "https://picsum.photos/seed/collab4/1600/900",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1690000000000n,
  },
];

function CollaborationSkeletons() {
  return (
    <div className="space-y-6" data-ocid="collaborations.loading_state">
      <Skeleton className="w-full h-[55vh] rounded-sm" />
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="w-full h-64 rounded-sm" />
            <Skeleton className="w-32 h-3" />
            <Skeleton className="w-full h-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CollaborationsPage() {
  const { data: collaborations, isLoading } = useCollaborations();
  const displayCollabs =
    collaborations && collaborations.length > 0
      ? collaborations
      : FALLBACK_COLLABORATIONS;

  const featured = displayCollabs[0];
  const rest = displayCollabs.slice(1);

  return (
    <Layout fullBleed>
      {/* ── Hero Banner ── */}
      <section
        className="relative flex items-end min-h-[55vh] px-6 pb-20 overflow-hidden"
        data-ocid="collaborations.hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://picsum.photos/seed/collabhero/1600/900)",
            filter: "brightness(0.3)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <AnimatedSection variant="fade-in">
            <p
              className="font-display text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "oklch(0.78 0.12 65)" }}
            >
              Maison Élite
            </p>
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-5"
              style={{ color: "oklch(0.96 0.018 75)" }}
            >
              Collaborations
            </h1>
            <p
              className="font-body text-base md:text-xl italic"
              style={{ color: "oklch(0.82 0.015 65)" }}
            >
              Where Heritage Meets Icon
            </p>
          </AnimatedSection>
        </div>
      </section>

      {isLoading ? (
        <section className="editorial-section bg-background">
          <div className="max-w-6xl mx-auto">
            <CollaborationSkeletons />
          </div>
        </section>
      ) : (
        <>
          {/* ── Featured ── */}
          {featured && (
            <section
              className="editorial-section bg-background"
              data-ocid="collaborations.featured"
            >
              <div className="max-w-6xl mx-auto">
                <AnimatedSection variant="fade-in" className="mb-8 text-center">
                  <p
                    className="font-display text-xs tracking-[0.3em] uppercase"
                    style={{ color: "oklch(0.78 0.12 65)" }}
                  >
                    Featured Campaign
                  </p>
                </AnimatedSection>
                <AnimatedSection variant="slide-in-up" delay={100}>
                  <Link
                    to="/collaborations/$id"
                    params={{ id: featured.id.toString() }}
                    className="block group relative overflow-hidden rounded-sm"
                    data-ocid="collaborations.featured.link"
                  >
                    <img
                      src={featured.coverImage.url}
                      alt={featured.title}
                      className="w-full aspect-[16/7] object-cover transition-smooth group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-10">
                      <p
                        className="font-body text-xs tracking-[0.25em] uppercase mb-3"
                        style={{ color: "oklch(0.78 0.12 65)" }}
                      >
                        {featured.campaign}
                      </p>
                      <p
                        className="font-display text-sm tracking-[0.2em] uppercase mb-2"
                        style={{ color: "oklch(0.85 0.015 65)" }}
                      >
                        {featured.celebrity}
                      </p>
                      <h2
                        className="font-display text-4xl md:text-6xl leading-tight mb-4"
                        style={{ color: "oklch(0.96 0.018 75)" }}
                      >
                        {featured.title}
                      </h2>
                      {featured.quote && (
                        <p
                          className="font-body text-sm italic max-w-lg mb-6"
                          style={{ color: "oklch(0.82 0.015 65)" }}
                        >
                          "{featured.quote}"
                        </p>
                      )}
                      <span
                        className="inline-block font-body text-xs tracking-[0.3em] uppercase border px-6 py-3 transition-smooth group-hover:bg-white/10"
                        style={{
                          borderColor: "oklch(0.78 0.12 65)",
                          color: "oklch(0.96 0.018 75)",
                        }}
                        data-ocid="collaborations.featured.view_button"
                      >
                        View Campaign
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              </div>
            </section>
          )}

          {/* ── Grid ── */}
          {rest.length > 0 && (
            <section
              className="editorial-section bg-muted/30"
              data-ocid="collaborations.grid"
            >
              <div className="max-w-6xl mx-auto">
                <AnimatedSection
                  variant="fade-in"
                  className="mb-14 text-center"
                >
                  <SectionTitle
                    eyebrow="All Campaigns"
                    title="The Icons"
                    subtitle="A curated lineage of creative partnerships that define the Maison Élite era."
                  />
                </AnimatedSection>
                <div className="grid md:grid-cols-3 gap-10">
                  {rest.map((collab, i) => (
                    <AnimatedSection
                      key={collab.id.toString()}
                      variant="slide-in-up"
                      delay={i * 120}
                      className="group"
                      data-ocid={`collaborations.card.item.${i + 1}`}
                    >
                      <Link
                        to="/collaborations/$id"
                        params={{ id: collab.id.toString() }}
                        data-ocid={`collaborations.card.link.${i + 1}`}
                      >
                        <div className="overflow-hidden rounded-sm mb-5 relative">
                          <img
                            src={collab.coverImage.url}
                            alt={collab.title}
                            className="w-full aspect-[3/4] object-cover transition-smooth group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
                        </div>
                        <p
                          className="font-body text-xs tracking-[0.2em] uppercase mb-1"
                          style={{ color: "oklch(0.78 0.12 65)" }}
                        >
                          {collab.campaign}
                        </p>
                        <p className="font-body text-sm tracking-widest uppercase text-muted-foreground mb-2">
                          {collab.celebrity}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {collab.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                          {collab.description}
                        </p>
                        <p
                          className="font-display text-xs tracking-[0.2em] uppercase transition-smooth group-hover:tracking-[0.3em]"
                          style={{ color: "oklch(0.78 0.12 65)" }}
                        >
                          Discover →
                        </p>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}
