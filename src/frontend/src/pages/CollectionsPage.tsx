import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductCard } from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useBackend";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const SECTIONS = [
  "Menswear",
  "Womenswear",
  "Accessories",
  "Evening Wear",
  "Outerwear",
  "New Arrivals",
] as const;

type SectionName = (typeof SECTIONS)[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function sectionId(name: SectionName): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

function groupBySection(products: Product[]): Record<SectionName, Product[]> {
  const map = {} as Record<SectionName, Product[]>;
  for (const s of SECTIONS) map[s] = [];
  for (const p of products) {
    const match = SECTIONS.find(
      (s) => s.toLowerCase() === p.category.toLowerCase(),
    );
    if (match) map[match].push(p);
  }
  return map;
}

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(price));
}

// ─── Product Card Inline (with hover View overlay) ────────────────────────────

function LuxProductCard({
  product,
  index,
  sectionIndex,
}: {
  product: Product;
  index: number;
  sectionIndex: number;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imageUrl = product.images[0]?.url ?? "/assets/images/placeholder.svg";
  const delay = index * 80;

  return (
    <AnimatedSection variant="slide-in-up" delay={delay}>
      <Link
        to="/products/$id"
        params={{ id: product.id.toString() }}
        data-ocid={`collections.section.${sectionIndex + 1}.item.${index + 1}`}
        className="group block bg-card border border-border overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          {!imgLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse" />
          )}
          <img
            src={imageUrl}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <span className="font-display text-[11px] tracking-[0.3em] uppercase text-foreground border border-foreground/60 px-6 py-2 backdrop-blur-sm bg-background/20">
              View
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isFeatured && (
              <span className="bg-primary text-primary-foreground font-display text-[10px] tracking-widest uppercase px-2.5 py-1">
                Featured
              </span>
            )}
            {!product.availability && (
              <span className="bg-muted text-muted-foreground font-display text-[10px] tracking-widest uppercase px-2.5 py-1">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-sm md:text-base text-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <span className="font-body text-sm text-foreground/80">
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>
    </AnimatedSection>
  );
}

// ─── Section Row ──────────────────────────────────────────────────────────────

function CollectionSection({
  name,
  products,
  sectionIndex,
  activeSection,
}: {
  name: SectionName;
  products: Product[];
  sectionIndex: number;
  activeSection: string;
}) {
  const isActive = activeSection === sectionId(name);

  return (
    <section
      id={sectionId(name)}
      data-ocid={`collections.section.${sectionIndex + 1}`}
      className="scroll-mt-28"
    >
      {/* Section Header */}
      <AnimatedSection variant="fade-in">
        <div className="mb-8 md:mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                {String(sectionIndex + 1).padStart(2, "0")} /{" "}
                {String(SECTIONS.length).padStart(2, "0")}
              </p>
              <h2
                className={`font-display-italic text-4xl md:text-6xl lg:text-7xl transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-foreground/80"
                }`}
              >
                {name}
              </h2>
            </div>
            <span className="font-body text-sm text-muted-foreground hidden sm:block pb-2">
              {products.length} {products.length === 1 ? "Piece" : "Pieces"}
            </span>
          </div>
          {/* Thin platinum separator */}
          <div className="h-px bg-gradient-to-r from-primary/60 via-border to-transparent" />
        </div>
      </AnimatedSection>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div
          data-ocid={`collections.section.${sectionIndex + 1}.empty_state`}
          className="border border-border bg-card py-16 text-center mb-16"
        >
          <p className="font-display text-lg text-muted-foreground">
            Coming Soon
          </p>
          <p className="font-body text-sm text-muted-foreground/60 mt-1">
            This section is being curated.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20">
          {products.map((product, i) => (
            <LuxProductCard
              key={product.id.toString()}
              product={product}
              index={i}
              sectionIndex={sectionIndex}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Sticky Section Nav ────────────────────────────────────────────────────────

function SectionNav({
  activeSection,
  visibleSections,
}: {
  activeSection: string;
  visibleSections: Set<SectionName>;
}) {
  const scrollTo = (name: SectionName) => {
    const el = document.getElementById(sectionId(name));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      data-ocid="collections.section_nav"
      aria-label="Section navigation"
      className="sticky top-[64px] z-30 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
          {SECTIONS.map((name) => {
            const id = sectionId(name);
            const isActive = activeSection === id;
            const hasItems = visibleSections.has(name);

            return (
              <button
                key={name}
                type="button"
                data-ocid={`collections.nav.${id}`}
                onClick={() => scrollTo(name)}
                className={`flex-shrink-0 relative font-display text-[11px] tracking-[0.2em] uppercase px-4 py-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } ${!hasItems ? "opacity-50" : ""}`}
              >
                {name}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

// ─── Filter Controls ──────────────────────────────────────────────────────────

type SortOption = "newest" | "price-asc" | "price-desc";

function FilterControls({
  activeFilter,
  sort,
  onFilterChange,
  onSortChange,
}: {
  activeFilter: SectionName | "all";
  sort: SortOption;
  onFilterChange: (f: SectionName | "all") => void;
  onSortChange: (s: SortOption) => void;
}) {
  return (
    <div
      data-ocid="collections.filter_bar"
      className="flex items-center justify-between gap-4 flex-wrap py-5"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          data-ocid="collections.filter.all"
          onClick={() => onFilterChange("all")}
          className={`font-display text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            activeFilter === "all"
              ? "bg-foreground text-background border-foreground"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {SECTIONS.map((s) => (
          <button
            key={s}
            type="button"
            data-ocid={`collections.filter.${sectionId(s)}`}
            onClick={() => {
              onFilterChange(s);
              const el = document.getElementById(sectionId(s));
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className={`font-display text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              activeFilter === s
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-select"
          className="font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground"
        >
          Sort
        </label>
        <select
          id="sort-select"
          data-ocid="collections.sort_select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="font-body text-xs border border-border bg-card text-foreground px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-16 space-y-20">
      {SECTIONS.map((s) => (
        <div key={s}>
          <Skeleton className="h-12 w-64 mb-4" />
          <div className="h-px bg-border mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <div key={i}>
                <Skeleton className="aspect-[3/4] w-full mb-3" />
                <Skeleton className="h-3 w-1/3 mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CollectionsPage() {
  const { data: products, isLoading } = useProducts();
  const [activeSection, setActiveSection] = useState<string>(
    sectionId(SECTIONS[0]),
  );
  const [activeFilter, setActiveFilter] = useState<SectionName | "all">("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  const sectioned = useMemo(() => {
    if (!products) return {} as Record<SectionName, Product[]>;
    const grouped = groupBySection(products);
    // apply sort per section
    for (const s of SECTIONS) {
      if (sort === "price-asc")
        grouped[s].sort((a, b) => Number(a.price) - Number(b.price));
      else if (sort === "price-desc")
        grouped[s].sort((a, b) => Number(b.price) - Number(a.price));
      else grouped[s].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    }
    return grouped;
  }, [products, sort]);

  const visibleSections = useMemo(() => {
    const set = new Set<SectionName>();
    if (!sectioned) return set;
    for (const s of SECTIONS) {
      if (sectioned[s] && sectioned[s].length > 0) set.add(s);
    }
    return set;
  }, [sectioned]);

  const displayedSections = useMemo(() => {
    if (activeFilter === "all") return SECTIONS;
    return SECTIONS.filter((s) => s === activeFilter);
  }, [activeFilter]);

  // Scroll-spy with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          sectionRefs.current.set(entry.target.id, entry);
        }
        // find topmost visible section
        let topVisible: string | null = null;
        let topY = Number.POSITIVE_INFINITY;
        for (const [, entry] of sectionRefs.current) {
          if (entry.isIntersecting && entry.boundingClientRect.top < topY) {
            topY = entry.boundingClientRect.top;
            topVisible = entry.target.id;
          }
        }
        if (topVisible) setActiveSection(topVisible);
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    for (const name of SECTIONS) {
      const el = document.getElementById(sectionId(name));
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section
        data-ocid="collections.page"
        className="relative bg-background border-b border-border overflow-hidden"
      >
        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "120px 100%",
          }}
        />

        {/* Vertical marquee side text */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 opacity-20">
          <div className="h-12 w-px bg-foreground" />
          <p
            className="font-display text-[9px] tracking-[0.4em] uppercase text-foreground"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            NOCTURNE — 2025
          </p>
          <div className="h-12 w-px bg-foreground" />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-6 py-24 md:py-40 text-center">
          <AnimatedSection variant="fade-in">
            <p className="font-display text-[10px] tracking-[0.5em] uppercase text-primary mb-6">
              NOCTURNE
            </p>
          </AnimatedSection>
          <AnimatedSection variant="slide-in-up" delay={200}>
            <h1 className="font-display-italic text-6xl md:text-9xl lg:text-[10rem] text-foreground leading-[0.88] tracking-tight">
              THE
              <br />
              COLLECTION
            </h1>
          </AnimatedSection>
          <AnimatedSection variant="fade-in" delay={500}>
            <p className="font-body text-sm text-muted-foreground mt-8 max-w-md mx-auto leading-relaxed">
              Six distinct worlds. Crafted with precision. Each section, a
              statement.
            </p>
          </AnimatedSection>

          {/* Section count row */}
          <AnimatedSection variant="fade-in" delay={700}>
            <div className="flex items-center justify-center gap-6 mt-12">
              <div className="h-px w-16 bg-border" />
              <p className="font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {SECTIONS.length} Collections — {products?.length ?? 0} Pieces
              </p>
              <div className="h-px w-16 bg-border" />
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom line accent */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* Sticky Section Nav */}
      <SectionNav
        activeSection={activeSection}
        visibleSections={visibleSections}
      />

      {/* Filter + Content */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <FilterControls
          activeFilter={activeFilter}
          sort={sort}
          onFilterChange={setActiveFilter}
          onSortChange={setSort}
        />

        {isLoading ? (
          <PageSkeleton />
        ) : (
          <div className="pb-24">
            {displayedSections.map((name) => (
              <CollectionSection
                key={name}
                name={name}
                products={sectioned[name] ?? []}
                sectionIndex={SECTIONS.indexOf(name)}
                activeSection={activeSection}
              />
            ))}
          </div>
        )}
      </div>

      {/* Editorial CTA */}
      <section className="bg-secondary border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <AnimatedSection variant="slide-in-up">
            <p className="font-display text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
              Need guidance?
            </p>
            <h2 className="font-display-italic text-3xl md:text-4xl text-foreground">
              Speak with a Style Advisor
            </h2>
          </AnimatedSection>
          <AnimatedSection variant="fade-in" delay={200}>
            <Link
              to="/contact"
              data-ocid="collections.contact_link"
              className="inline-flex items-center gap-3 bg-foreground text-background font-display text-[11px] tracking-[0.25em] uppercase px-8 py-4 transition-smooth hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Book a Consultation
              <span aria-hidden="true">→</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
