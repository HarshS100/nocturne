import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ui/ProductCard";
import { useSearchProducts } from "@/hooks/useBackend";
import { Link, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useRef, useState } from "react";

export function SearchPage() {
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const initialQuery = (searchParams.q as string) ?? "";
  const [inputValue, setInputValue] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results = [], isLoading } = useSearchProducts(activeQuery);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    setActiveQuery(trimmed);
    const url = new URL(window.location.href);
    if (trimmed) {
      url.searchParams.set("q", trimmed);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url.toString());
  }

  const hasQuery = activeQuery.trim().length > 0;

  return (
    <Layout>
      {/* Search hero */}
      <section className="bg-muted/30 py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-5">
            Discover
          </p>
          <form onSubmit={handleSearch} className="relative">
            <input
              ref={inputRef}
              type="search"
              data-ocid="search.search_input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for pieces…"
              className="w-full bg-transparent font-display text-2xl md:text-3xl text-foreground placeholder:text-muted-foreground/40 border-b-2 border-primary/50 focus:border-primary outline-none pb-3 pr-10 text-center transition-colors duration-300"
            />
            <button
              type="submit"
              aria-label="Search"
              data-ocid="search.primary_button"
              className="absolute right-0 top-0 h-full flex items-center text-primary hover:text-primary/70 transition-colors duration-200"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Loading */}
          {isLoading && hasQuery && (
            <div data-ocid="search.loading_state">
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground text-center mb-10">
                Searching…
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-muted rounded-sm mb-3" />
                    <div className="h-3 bg-muted rounded w-2/3 mb-2" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-3 bg-muted rounded w-1/3" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {!isLoading && hasQuery && results.length > 0 && (
            <>
              <p className="font-body text-sm text-muted-foreground text-center mb-10">
                <span className="text-foreground font-display">
                  {results.length}
                </span>{" "}
                {results.length === 1 ? "piece" : "pieces"} found for{" "}
                <span className="italic text-foreground">"{activeQuery}"</span>
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((product, index) => (
                  <div
                    key={product.id.toString()}
                    data-ocid={`search.item.${index + 1}`}
                    className="fade-in"
                    style={{
                      animationDelay: `${index * 80}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <ProductCard product={product} index={index} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Empty state */}
          {!isLoading && hasQuery && results.length === 0 && (
            <div data-ocid="search.empty_state" className="text-center py-20">
              <div className="w-12 h-0.5 bg-primary/40 mx-auto mb-8" />
              <p className="font-display text-2xl text-foreground mb-3">
                No pieces found for{" "}
                <span className="italic">"{activeQuery}"</span>
              </p>
              <p className="font-body text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                Our curators could not find an exact match. Explore our full
                collections instead.
              </p>
              <Link
                to="/collections"
                data-ocid="search.link"
                className="font-display text-xs tracking-[0.2em] uppercase text-primary border-b border-primary/50 pb-0.5 hover:border-primary transition-colors duration-200"
              >
                Browse All Collections
              </Link>
            </div>
          )}

          {/* Initial empty — no query yet */}
          {!hasQuery && (
            <div className="text-center py-20">
              <p className="font-body text-muted-foreground">
                Enter a search term to discover our curated pieces.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
