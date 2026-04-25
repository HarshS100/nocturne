import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { useLookbookEntries } from "@/hooks/useBackend";
import type { LookbookEntry } from "@/types";
import { Link } from "@tanstack/react-router";

const FALLBACK_ENTRIES: LookbookEntry[] = [
  {
    id: 1n,
    title: "The Chronicle of Autumn",
    description:
      "A study in contrast — warm camel wools against the grey light of late October, worn with an ease that only confidence can produce.",
    coverImage: {
      url: "https://picsum.photos/seed/lb1/800/1100",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1697500000000n * 1000000n,
    tags: ["Autumn", "Tailoring", "Editorial"],
  },
  {
    id: 2n,
    title: "Silence in White",
    description:
      "The spring collection photographed at dawn on the Normandy coast. Cream and ivory, unadorned and absolute.",
    coverImage: {
      url: "https://picsum.photos/seed/lb2/800/1100",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1711900000000n * 1000000n,
    tags: ["Spring", "White", "Coast"],
  },
  {
    id: 3n,
    title: "Midnight in the Marais",
    description:
      "A nocturnal exploration — charcoal and black silk after dark, the city a blurred canvas behind.",
    coverImage: {
      url: "https://picsum.photos/seed/lb3/800/1100",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1704200000000n * 1000000n,
    tags: ["Evening", "Silk", "Paris"],
  },
  {
    id: 4n,
    title: "The Garden Journals",
    description:
      "Linen and cotton in the last warmth of summer, photographed in a private garden in Provence.",
    coverImage: {
      url: "https://picsum.photos/seed/lb4/800/1100",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: 1690000000000n * 1000000n,
    tags: ["Summer", "Linen", "Garden"],
  },
];

function LookbookCard({
  entry,
  index,
}: {
  entry: LookbookEntry;
  index: number;
}) {
  const dateStr = new Date(Number(entry.publishedAt)).toLocaleDateString(
    "en-GB",
    { year: "numeric", month: "long" },
  );
  const tallCard = index % 3 !== 1;

  return (
    <AnimatedSection
      variant="slide-in-up"
      delay={index * 100}
      className="group"
      data-ocid={`lookbook.card.item.${index + 1}`}
    >
      <Link
        to="/lookbook/$id"
        params={{ id: entry.id.toString() }}
        data-ocid={`lookbook.entry.link.${index + 1}`}
      >
        <div className="overflow-hidden rounded-sm mb-5">
          <img
            src={entry.coverImage.url}
            alt={entry.title}
            className="w-full object-cover transition-smooth group-hover:scale-105"
            style={{ aspectRatio: tallCard ? "3/4" : "4/3" }}
          />
        </div>
        <div className="space-y-2">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
            {dateStr}
          </p>
          <h3 className="font-display text-xl md:text-2xl text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
            {entry.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {entry.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-xs tracking-widest uppercase border border-border px-3 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <p
            className="font-display text-sm tracking-[0.15em] uppercase pt-2 transition-smooth group-hover:tracking-[0.25em]"
            style={{ color: "oklch(0.78 0.12 65)" }}
          >
            Read Editorial →
          </p>
        </div>
      </Link>
    </AnimatedSection>
  );
}

function LookbookSkeletons() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="space-y-4" data-ocid="lookbook.loading_state">
          <Skeleton className="w-full h-80 rounded-sm" />
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-full h-4" />
        </div>
      ))}
    </>
  );
}

export function LookbookPage() {
  const { data: entries, isLoading } = useLookbookEntries();
  const displayEntries =
    entries && entries.length > 0 ? entries : FALLBACK_ENTRIES;

  return (
    <Layout fullBleed>
      {/* ── Hero ── */}
      <section
        className="relative flex flex-col items-center justify-end min-h-[55vh] px-6 pb-20 text-center overflow-hidden"
        data-ocid="lookbook.hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://picsum.photos/seed/lookbookhero/1600/900)",
            filter: "brightness(0.35)",
          }}
        />
        <div className="relative z-10 max-w-3xl">
          <AnimatedSection variant="fade-in">
            <p
              className="font-display text-xs tracking-[0.3em] uppercase mb-5"
              style={{ color: "oklch(0.78 0.12 65)" }}
            >
              Maison Élite
            </p>
            <h1
              className="font-display text-6xl md:text-8xl leading-none mb-6"
              style={{ color: "oklch(0.96 0.018 75)" }}
            >
              The Lookbook
            </h1>
            <p
              className="font-body text-base md:text-xl italic leading-relaxed"
              style={{ color: "oklch(0.82 0.015 65)" }}
            >
              Season's Stories in Light and Fabric
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Grid ── */}
      <section
        className="editorial-section bg-background"
        data-ocid="lookbook.grid"
      >
        <div className="max-w-6xl mx-auto">
          <AnimatedSection variant="fade-in" className="mb-14 text-center">
            <SectionTitle
              eyebrow="Editorials"
              title="All Issues"
              subtitle="Each entry a study in wearing well."
            />
          </AnimatedSection>
          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <LookbookSkeletons />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              {displayEntries.map((entry, i) => (
                <LookbookCard
                  key={entry.id.toString()}
                  entry={entry}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
