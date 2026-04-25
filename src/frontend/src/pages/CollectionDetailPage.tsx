import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductCard } from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCollection, useProductsByCollection } from "@/hooks/useBackend";
import type { Product } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PriceRange = "all" | "under500" | "500to1500" | "over1500";
type SortOption = "newest" | "price-asc" | "price-desc";

interface FilterState {
  priceRange: PriceRange;
  sizes: string[];
  sort: SortOption;
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function matchesPrice(product: Product, range: PriceRange): boolean {
  const price = Number(product.price);
  if (range === "under500") return price < 500;
  if (range === "500to1500") return price >= 500 && price <= 1500;
  if (range === "over1500") return price > 1500;
  return true;
}

function applyFilters(products: Product[], filters: FilterState): Product[] {
  let result = products.filter((p) => {
    if (!matchesPrice(p, filters.priceRange)) return false;
    if (
      filters.sizes.length > 0 &&
      !filters.sizes.some((s) => p.sizes.includes(s))
    )
      return false;
    return true;
  });
  if (filters.sort === "price-asc")
    result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
  else if (filters.sort === "price-desc")
    result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
  else
    result = [...result].sort(
      (a, b) => Number(b.createdAt) - Number(a.createdAt),
    );
  return result;
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const toggleSize = (size: string) => {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: next });
  };

  const hasActive = filters.priceRange !== "all" || filters.sizes.length > 0;

  return (
    <div
      data-ocid="collection_detail.filter_bar"
      className="border border-border bg-card p-5 mb-8 space-y-4"
    >
      <div className="flex flex-wrap gap-x-8 gap-y-4 items-start">
        {/* Price */}
        <div>
          <p className="font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Price
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: "all", label: "All" },
                { value: "under500", label: "Under $500" },
                { value: "500to1500", label: "$500–$1,500" },
                { value: "over1500", label: "$1,500+" },
              ] as { value: PriceRange; label: string }[]
            ).map(({ value, label }) => (
              <button
                key={value}
                type="button"
                data-ocid={`collection_detail.price_filter.${value}`}
                onClick={() => onChange({ ...filters, priceRange: value })}
                className={`font-body text-xs px-3 py-1.5 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  filters.priceRange === value
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <p className="font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {ALL_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                data-ocid={`collection_detail.size_filter.${size.toLowerCase()}`}
                onClick={() => toggleSize(size)}
                className={`font-display text-xs w-10 h-10 border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  filters.sizes.includes(size)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="ml-auto">
          <p className="font-display text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Sort By
          </p>
          <select
            data-ocid="collection_detail.sort_select"
            value={filters.sort}
            onChange={(e) =>
              onChange({ ...filters, sort: e.target.value as SortOption })
            }
            className="font-body text-sm border border-border bg-card text-foreground px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Active filters + clear */}
      {hasActive && (
        <div className="flex items-center gap-3 pt-3 border-t border-border flex-wrap">
          <span className="font-body text-xs text-muted-foreground">
            Active:
          </span>
          {filters.priceRange !== "all" && (
            <span className="inline-flex items-center gap-1.5 bg-secondary border border-border font-body text-xs px-2.5 py-1">
              {filters.priceRange === "under500"
                ? "Under $500"
                : filters.priceRange === "500to1500"
                  ? "$500–$1,500"
                  : "$1,500+"}
              <button
                type="button"
                aria-label="Remove price filter"
                onClick={() => onChange({ ...filters, priceRange: "all" })}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ×
              </button>
            </span>
          )}
          {filters.sizes.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 bg-secondary border border-border font-body text-xs px-2.5 py-1"
            >
              {s}
              <button
                type="button"
                aria-label={`Remove size ${s}`}
                onClick={() =>
                  onChange({
                    ...filters,
                    sizes: filters.sizes.filter((x) => x !== s),
                  })
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ×
              </button>
            </span>
          ))}
          <button
            type="button"
            data-ocid="collection_detail.clear_filters_button"
            onClick={() =>
              onChange({ priceRange: "all", sizes: [], sort: filters.sort })
            }
            className="ml-auto font-display text-[10px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function CollectionDetailPage() {
  const { id } = useParams({ from: "/collections/$id" });
  const collectionId = useMemo(() => {
    try {
      return BigInt(id);
    } catch {
      return undefined;
    }
  }, [id]);

  const { data: collection, isLoading: collectionLoading } =
    useCollection(collectionId);
  const { data: products, isLoading: productsLoading } =
    useProductsByCollection(collectionId);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: "all",
    sizes: [],
    sort: "newest",
  });

  const filtered = useMemo(() => {
    if (!products) return [];
    return applyFilters(products, filters);
  }, [products, filters]);

  const isLoading = collectionLoading || productsLoading;
  const coverUrl =
    collection?.coverImage?.url ?? "/assets/images/placeholder.svg";

  return (
    <Layout>
      {/* Hero */}
      {isLoading ? (
        <div className="h-80 md:h-[420px] bg-secondary animate-pulse" />
      ) : collection ? (
        <section
          data-ocid="collection_detail.page"
          className="relative h-80 md:h-[420px] overflow-hidden bg-secondary"
        >
          <img
            src={coverUrl}
            alt={collection.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="relative h-full flex flex-col justify-end max-w-screen-xl mx-auto px-6 pb-10">
            <AnimatedSection variant="slide-in-up">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-muted-foreground">
                  <li>
                    <Link
                      to="/collections"
                      data-ocid="collection_detail.breadcrumb_collections"
                      className="hover:text-foreground transition-colors duration-200"
                    >
                      Collections
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-border">
                    ›
                  </li>
                  <li className="text-foreground/60 truncate max-w-[200px]">
                    {collection.name}
                  </li>
                </ol>
              </nav>

              <p className="font-display text-[10px] tracking-[0.35em] uppercase text-primary mb-2">
                Collection
              </p>
              <h1 className="font-display-italic text-4xl md:text-6xl lg:text-7xl text-foreground leading-tight mb-3">
                {collection.name}
              </h1>
              <p className="font-body text-sm text-foreground/60 max-w-lg leading-relaxed">
                {collection.description}
              </p>
            </AnimatedSection>
          </div>
        </section>
      ) : null}

      {/* Content */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-10">
        <FilterBar filters={filters} onChange={setFilters} />

        {!isLoading && (
          <p className="font-body text-xs text-muted-foreground mb-6 tracking-wider">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
              <div key={i}>
                <Skeleton className="aspect-[3/4] w-full mb-3" />
                <Skeleton className="h-3 w-1/3 mb-2" />
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <AnimatedSection variant="fade-in">
            <div
              data-ocid="collection_detail.empty_state"
              className="text-center py-24 border border-border bg-card"
            >
              <p className="font-display-italic text-2xl text-foreground mb-3">
                No Pieces Match
              </p>
              <p className="font-body text-muted-foreground max-w-xs mx-auto mb-6">
                Adjust your filters to discover more from this collection.
              </p>
              <button
                type="button"
                data-ocid="collection_detail.reset_filters_button"
                onClick={() =>
                  setFilters({ priceRange: "all", sizes: [], sort: "newest" })
                }
                className="font-display text-[11px] tracking-[0.2em] uppercase border border-foreground text-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-smooth"
              >
                Clear Filters
              </button>
            </div>
          </AnimatedSection>
        ) : (
          <div
            data-ocid="collection_detail.product_list"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {filtered.map((product, i) => (
              <AnimatedSection
                key={product.id.toString()}
                variant="slide-in-up"
                delay={i * 60}
              >
                <ProductCard product={product} index={i} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
