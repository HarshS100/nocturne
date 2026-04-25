import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollaboration, useCollaborations } from "@/hooks/useBackend";
import type { Collaboration } from "@/types";
import { Link, useParams } from "@tanstack/react-router";

const FALLBACK_COLLABORATION: Collaboration = {
  id: 1n,
  title: "A Study in Restraint",
  celebrity: "Isabelle Moreau",
  campaign: "Autumn / Winter 2024",
  description:
    "Actress and ambassador Isabelle Moreau brings her singular poise to the Autumn/Winter collection — a woman for whom understatement is the highest form of elegance.\n\nFor this campaign we worked without a mood board. We arrived at a house in the Médoc with seven looks and a photographer who had never photographed fashion before. The results speak to something rarely captured: the exact quality of attention a confident woman pays to herself.\n\nThe clothes — a sculptural overcoat in double-face wool, a bias-cut gown in Lyonnais silk, trousers that fall with balletic precision — were not styled. They were worn. Isabelle wore them as she wears everything: with the quiet authority of a woman who chooses well and never doubts the choice.",
  quote:
    "Maison Élite clothes are the ones I reach for when I need to be remembered without effort.",
  coverImage: {
    url: "https://picsum.photos/seed/collab1/1600/900",
    contentType: "image/jpeg",
  },
  images: [
    {
      url: "https://picsum.photos/seed/cd1/800/1100",
      contentType: "image/jpeg",
    },
    {
      url: "https://picsum.photos/seed/cd2/1100/800",
      contentType: "image/jpeg",
    },
    {
      url: "https://picsum.photos/seed/cd3/800/1100",
      contentType: "image/jpeg",
    },
    {
      url: "https://picsum.photos/seed/cd4/1100/800",
      contentType: "image/jpeg",
    },
  ],
  publishedAt: 1697500000000n,
};

const MORE_FALLBACK: Collaboration[] = [
  {
    id: 2n,
    title: "The New Classicism",
    celebrity: "Rafael Okafor",
    campaign: "Spring / Summer 2024",
    description:
      "With his sharp eye for form, Rafael Okafor captures the spirit of the house.",
    quote: "Wearing Maison Élite feels like speaking fluent French.",
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
      "Fashion icon Claudine Voss renders the Resort collection with her iconic ease.",
    quote: "True luxury is the absence of noise.",
    coverImage: {
      url: "https://picsum.photos/seed/collab3/1600/900",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1704200000000n,
  },
];

const GALLERY_FALLBACK = [
  { url: "https://picsum.photos/seed/cd1/800/1100", contentType: "image/jpeg" },
  { url: "https://picsum.photos/seed/cd2/1100/800", contentType: "image/jpeg" },
  { url: "https://picsum.photos/seed/cd3/800/1100", contentType: "image/jpeg" },
  { url: "https://picsum.photos/seed/cd4/1100/800", contentType: "image/jpeg" },
];

function DetailLoadingState() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 py-20 space-y-8"
      data-ocid="collab_detail.loading_state"
    >
      <Skeleton className="w-full h-[65vh] rounded-sm" />
      <Skeleton className="w-48 h-4" />
      <Skeleton className="w-3/4 h-10" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-full h-4" />
    </div>
  );
}

export function CollaborationDetailPage() {
  const { id } = useParams({ from: "/collaborations/$id" });
  const numericId = BigInt(id);
  const { data: collab, isLoading } = useCollaboration(numericId);
  const { data: allCollabs } = useCollaborations();

  const displayCollab = collab ?? FALLBACK_COLLABORATION;
  const related = allCollabs
    ? allCollabs.filter((c) => c.id !== numericId).slice(0, 2)
    : MORE_FALLBACK;

  const galleryImages =
    displayCollab.images.length > 0 ? displayCollab.images : GALLERY_FALLBACK;

  const descParagraphs = displayCollab.description.split("\n\n");

  if (isLoading)
    return (
      <Layout fullBleed>
        <DetailLoadingState />
      </Layout>
    );

  return (
    <Layout fullBleed>
      {/* ── Full-bleed Hero ── */}
      <section
        className="relative flex items-end min-h-[75vh] overflow-hidden"
        data-ocid="collab_detail.hero"
      >
        <img
          src={displayCollab.coverImage.url}
          alt={displayCollab.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-16">
          <AnimatedSection variant="fade-in">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 mb-8 font-body text-xs tracking-[0.15em] uppercase"
              aria-label="Breadcrumb"
            >
              <Link
                to="/collaborations"
                className="transition-colors duration-200"
                style={{ color: "oklch(0.78 0.12 65)" }}
                data-ocid="collab_detail.breadcrumb_collaborations_link"
              >
                Collaborations
              </Link>
              <span style={{ color: "oklch(0.65 0.02 65)" }}>›</span>
              <span
                className="truncate max-w-xs"
                style={{ color: "oklch(0.85 0.018 75)" }}
              >
                {displayCollab.title}
              </span>
            </nav>
            <p
              className="font-body text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "oklch(0.78 0.12 65)" }}
            >
              {displayCollab.campaign}
            </p>
            <p
              className="font-display text-sm tracking-[0.25em] uppercase mb-4"
              style={{ color: "oklch(0.88 0.018 75)" }}
            >
              {displayCollab.celebrity}
            </p>
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl leading-none"
              style={{ color: "oklch(0.96 0.018 75)" }}
            >
              {displayCollab.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Campaign Story ── */}
      <section
        className="editorial-section bg-background"
        data-ocid="collab_detail.story"
      >
        <div className="max-w-3xl mx-auto">
          <AnimatedSection variant="fade-in" className="mb-12">
            <p
              className="font-display text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "oklch(0.78 0.12 65)" }}
            >
              The Campaign
            </p>
            {descParagraphs.map((para) => (
              <p
                key={para.slice(0, 20)}
                className="font-body text-base md:text-lg text-muted-foreground leading-[1.9] mb-6"
              >
                {para}
              </p>
            ))}
          </AnimatedSection>

          {/* Pull Quote */}
          {displayCollab.quote && (
            <AnimatedSection variant="slide-in-up" delay={150}>
              <blockquote
                className="border-l-2 pl-8 py-2 my-12"
                style={{ borderColor: "oklch(0.78 0.12 65)" }}
                data-ocid="collab_detail.quote"
              >
                <p
                  className="font-display text-2xl md:text-4xl leading-[1.3] italic"
                  style={{ color: "oklch(0.78 0.12 65)" }}
                >
                  "{displayCollab.quote}"
                </p>
                <cite className="block font-body text-sm tracking-[0.2em] uppercase text-muted-foreground mt-4 not-italic">
                  — {displayCollab.celebrity}
                </cite>
              </blockquote>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ── Campaign Details ── */}
      <section
        className="bg-secondary/30 py-12 px-6"
        data-ocid="collab_detail.details"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection variant="fade-in">
            <div className="grid grid-cols-3 divide-x divide-border border border-border">
              {[
                { label: "Ambassador", value: displayCollab.celebrity },
                { label: "Campaign", value: displayCollab.campaign },
                {
                  label: "Year",
                  value: new Date(Number(displayCollab.publishedAt))
                    .getFullYear()
                    .toString(),
                },
              ].map((item) => (
                <div key={item.label} className="px-8 py-8 text-center">
                  <p className="font-body text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">
                    {item.label}
                  </p>
                  <p className="font-display text-lg md:text-xl text-foreground">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section
        className="editorial-section bg-background"
        data-ocid="collab_detail.gallery"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection variant="fade-in" className="mb-10 text-center">
            <p
              className="font-display text-xs tracking-[0.3em] uppercase"
              style={{ color: "oklch(0.78 0.12 65)" }}
            >
              Campaign Images
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryImages.map((img, i) => (
              <AnimatedSection
                key={img.url}
                variant="fade-in"
                delay={i * 80}
                className={`overflow-hidden rounded-sm ${i === 0 || i === 3 ? "md:col-span-2" : ""}`}
              >
                <img
                  src={img.url}
                  alt={`${displayCollab.title} — look ${i + 1}`}
                  className="w-full object-cover transition-smooth hover:scale-[1.02]"
                  style={{
                    aspectRatio: i === 0 || i === 3 ? "16/7" : "4/5",
                  }}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section
          className="editorial-section bg-muted/30"
          data-ocid="collab_detail.related"
        >
          <div className="max-w-6xl mx-auto">
            <AnimatedSection variant="fade-in" className="mb-12 text-center">
              <p
                className="font-display text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: "oklch(0.78 0.12 65)" }}
              >
                Continue
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                Related Collaborations
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12">
              {related.map((c, i) => (
                <AnimatedSection
                  key={c.id.toString()}
                  variant="slide-in-up"
                  delay={i * 120}
                  className="group"
                  data-ocid={`collab_detail.related.item.${i + 1}`}
                >
                  <Link
                    to="/collaborations/$id"
                    params={{ id: c.id.toString() }}
                    data-ocid={`collab_detail.related.link.${i + 1}`}
                  >
                    <div className="overflow-hidden rounded-sm mb-5 relative">
                      <img
                        src={c.coverImage.url}
                        alt={c.title}
                        className="w-full aspect-[16/9] object-cover transition-smooth group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-smooth" />
                    </div>
                    <p
                      className="font-body text-xs tracking-[0.2em] uppercase mb-1"
                      style={{ color: "oklch(0.78 0.12 65)" }}
                    >
                      {c.campaign}
                    </p>
                    <p className="font-body text-sm tracking-widest uppercase text-muted-foreground mb-2">
                      {c.celebrity}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {c.title}
                    </h3>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
