import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useLookbookEntries, useLookbookEntry } from "@/hooks/useBackend";
import type { LookbookEntry } from "@/types";
import { Link, useParams } from "@tanstack/react-router";

const FALLBACK_ENTRY: LookbookEntry = {
  id: 1n,
  title: "The Chronicle of Autumn",
  description:
    "A study in contrast — warm camel wools against the grey light of late October, worn with an ease that only confidence can produce. These are clothes that understand their moment: the quiet authority of a perfectly weighted coat, the restraint of a trouser with no ornament beyond its cut.\n\nWe shot this story over three days in the Sologne, chasing the last of the amber light through forests that seemed to hold their breath. The wardrobe was assembled without hierarchy — each piece as essential as the last, each capable of standing alone or stepping into a composition. The photographer asked for stillness; the clothes provided it.",
  coverImage: {
    url: "https://picsum.photos/seed/lb_detail_cover/1600/900",
    contentType: "image/jpeg",
  },
  images: [
    {
      url: "https://picsum.photos/seed/lb_d1/800/1100",
      contentType: "image/jpeg",
    },
    {
      url: "https://picsum.photos/seed/lb_d2/1100/800",
      contentType: "image/jpeg",
    },
    {
      url: "https://picsum.photos/seed/lb_d3/800/1100",
      contentType: "image/jpeg",
    },
    {
      url: "https://picsum.photos/seed/lb_d4/800/1100",
      contentType: "image/jpeg",
    },
  ],
  publishedAt: 1697500000000n,
  tags: ["Autumn", "Tailoring", "Editorial"],
};

const MORE_FALLBACK: LookbookEntry[] = [
  {
    id: 2n,
    title: "Silence in White",
    description:
      "The spring collection photographed at dawn on the Normandy coast.",
    coverImage: {
      url: "https://picsum.photos/seed/lb2/800/1100",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1711900000000n,
    tags: ["Spring", "White"],
  },
  {
    id: 3n,
    title: "Midnight in the Marais",
    description:
      "A nocturnal exploration — charcoal and black silk after dark.",
    coverImage: {
      url: "https://picsum.photos/seed/lb3/800/1100",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1704200000000n,
    tags: ["Evening", "Silk"],
  },
];

const GALLERY_FALLBACK = [
  {
    url: "https://picsum.photos/seed/lb_d1/800/1100",
    contentType: "image/jpeg",
  },
  {
    url: "https://picsum.photos/seed/lb_d2/1100/800",
    contentType: "image/jpeg",
  },
  {
    url: "https://picsum.photos/seed/lb_d3/800/1100",
    contentType: "image/jpeg",
  },
  {
    url: "https://picsum.photos/seed/lb_d4/800/1100",
    contentType: "image/jpeg",
  },
];

function EntryLoadingState() {
  return (
    <div
      className="max-w-4xl mx-auto px-6 py-20 space-y-8"
      data-ocid="lookbook_detail.loading_state"
    >
      <Skeleton className="w-full h-[60vh] rounded-sm" />
      <Skeleton className="w-48 h-4" />
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-4" />
    </div>
  );
}

export function LookbookDetailPage() {
  const { id } = useParams({ from: "/lookbook/$id" });
  const numericId = BigInt(id);
  const { data: entry, isLoading } = useLookbookEntry(numericId);
  const { data: allEntries } = useLookbookEntries();

  const displayEntry = entry ?? FALLBACK_ENTRY;
  const otherEntries = allEntries
    ? allEntries.filter((e) => e.id !== numericId).slice(0, 2)
    : MORE_FALLBACK;

  const dateStr = new Date(Number(displayEntry.publishedAt)).toLocaleDateString(
    "en-GB",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const galleryImages =
    displayEntry.images.length > 0 ? displayEntry.images : GALLERY_FALLBACK;

  if (isLoading)
    return (
      <Layout fullBleed>
        <EntryLoadingState />
      </Layout>
    );

  return (
    <Layout fullBleed>
      {/* ── Full-bleed Cover ── */}
      <section
        className="relative flex items-end min-h-[70vh] overflow-hidden"
        data-ocid="lookbook_detail.hero"
      >
        <img
          src={displayEntry.coverImage.url}
          alt={displayEntry.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-16">
          <AnimatedSection variant="fade-in">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 mb-6 font-body text-xs tracking-[0.15em] uppercase"
              aria-label="Breadcrumb"
            >
              <Link
                to="/lookbook"
                className="transition-colors duration-200"
                style={{ color: "oklch(0.78 0.12 65)" }}
                data-ocid="lookbook_detail.breadcrumb_lookbook_link"
              >
                Lookbook
              </Link>
              <span style={{ color: "oklch(0.65 0.02 65)" }}>›</span>
              <span
                className="truncate max-w-xs"
                style={{ color: "oklch(0.85 0.018 75)" }}
              >
                {displayEntry.title}
              </span>
            </nav>
            <div className="flex flex-wrap gap-2 mb-4">
              {displayEntry.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs tracking-widest uppercase border px-3 py-1"
                  style={{
                    borderColor: "oklch(0.78 0.12 65)",
                    color: "oklch(0.78 0.12 65)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-4"
              style={{ color: "oklch(0.96 0.018 75)" }}
            >
              {displayEntry.title}
            </h1>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.75 0.015 65)" }}
            >
              {dateStr}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Description ── */}
      <section
        className="editorial-section bg-background"
        data-ocid="lookbook_detail.body"
      >
        <div className="max-w-3xl mx-auto">
          <AnimatedSection variant="slide-in-up">
            {displayEntry.description.split("\n\n").map((para) => (
              <p
                key={para.slice(0, 20)}
                className="font-body text-base md:text-lg text-muted-foreground leading-[1.9] mb-6"
              >
                {para}
              </p>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section
        className="editorial-section bg-muted/30 pt-0"
        data-ocid="lookbook_detail.gallery"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryImages.map((img, i) => (
              <AnimatedSection
                key={img.url}
                variant="fade-in"
                delay={i * 100}
                className={`overflow-hidden rounded-sm ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <img
                  src={img.url}
                  alt={`${displayEntry.title} — look ${i + 1}`}
                  className="w-full h-full object-cover transition-smooth hover:scale-[1.02]"
                  style={{ aspectRatio: i === 0 ? "16/7" : "4/5" }}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── More Editorials ── */}
      {otherEntries.length > 0 && (
        <section
          className="editorial-section bg-background"
          data-ocid="lookbook_detail.more"
        >
          <div className="max-w-6xl mx-auto">
            <AnimatedSection variant="fade-in" className="mb-12 text-center">
              <p
                className="font-display text-xs tracking-[0.25em] uppercase mb-3"
                style={{ color: "oklch(0.78 0.12 65)" }}
              >
                Continue Reading
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">
                Explore More Editorials
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12">
              {otherEntries.map((e, i) => (
                <AnimatedSection
                  key={e.id.toString()}
                  variant="slide-in-up"
                  delay={i * 120}
                  className="group"
                  data-ocid={`lookbook_detail.more.item.${i + 1}`}
                >
                  <Link
                    to="/lookbook/$id"
                    params={{ id: e.id.toString() }}
                    data-ocid={`lookbook_detail.more.link.${i + 1}`}
                  >
                    <div className="overflow-hidden rounded-sm mb-4">
                      <img
                        src={e.coverImage.url}
                        alt={e.title}
                        className="w-full aspect-[3/2] object-cover transition-smooth group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {e.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground line-clamp-2">
                      {e.description}
                    </p>
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
