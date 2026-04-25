import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  useCollections,
  useFeaturedProducts,
  useLookbookEntries,
} from "@/hooks/useBackend";
import type { LookbookEntry, Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

// ─── IntersectionObserver hook ────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      data-ocid="hero.section"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      aria-label="NOCTURNE Hero"
    >
      {/* Parallax background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&auto=format&fit=crop&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Dark cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.1 0 0 / 0.5) 0%, oklch(0.07 0 0 / 0.72) 60%, oklch(0.07 0 0 / 0.88) 100%)",
        }}
      />

      {/* Center content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1200 ease-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        {/* Brand name — massive italic */}
        <h1
          className="font-display-italic text-foreground select-none"
          style={{
            fontSize: "clamp(4rem, 14vw, 14rem)",
            letterSpacing: "0.22em",
            lineHeight: 0.9,
            textShadow: "0 2px 40px oklch(0.1 0 0 / 0.6)",
          }}
        >
          NOCTURNE
        </h1>

        {/* Platinum divider line */}
        <div
          className="mx-auto my-6"
          style={{
            width: "5rem",
            height: "1px",
            background: "oklch(0.75 0.04 240 / 0.8)",
          }}
        />

        {/* Season tagline */}
        <p
          className="font-body text-xs tracking-[0.45em] uppercase mb-10"
          style={{ color: "oklch(0.75 0.04 240)" }}
        >
          Autumn · Winter 2025
        </p>

        {/* CTA */}
        <Link
          to="/collections"
          data-ocid="hero.primary_button"
          className="inline-block font-body text-xs tracking-[0.35em] uppercase px-10 py-4 border transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            borderColor: "oklch(0.75 0.04 240 / 0.7)",
            color: "oklch(0.95 0 0)",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "oklch(0.75 0.04 240 / 0.12)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "oklch(0.75 0.04 240)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
            (e.currentTarget as HTMLAnchorElement).style.borderColor =
              "oklch(0.75 0.04 240 / 0.7)";
          }}
        >
          Discover the Collection
        </Link>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 0.55 : 0,
          transition: "opacity 1.2s ease",
          transitionDelay: "1.5s",
        }}
      >
        <span
          className="font-body text-[10px] tracking-[0.35em] uppercase"
          style={{ color: "oklch(0.7 0 0)" }}
        >
          Scroll
        </span>
        <div
          className="w-px"
          style={{
            height: "3rem",
            background:
              "linear-gradient(to bottom, oklch(0.75 0.04 240 / 0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}

// ─── New Arrivals ─────────────────────────────────────────────────────────────

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Double-Breasted Wool Overcoat",
    price: 340000n,
    category: "Outerwear",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80",
        contentType: "image/jpeg",
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Noir", "Charcoal"],
    material: "Virgin Wool",
    availability: true,
    isFeatured: true,
    description: "A refined double-breasted silhouette in heavy wool.",
    createdAt: 0n,
  },
  {
    id: 2n,
    name: "Sculptural Silk Evening Gown",
    price: 490000n,
    category: "Evening Wear",
    images: [
      {
        url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
        contentType: "image/jpeg",
      },
    ],
    sizes: ["XS", "S", "M"],
    colors: ["Onyx", "Midnight"],
    material: "Duchess Silk",
    availability: true,
    isFeatured: true,
    description: "An architectural evening gown in structured duchess silk.",
    createdAt: 0n,
  },
  {
    id: 3n,
    name: "Slim Tailored Tuxedo Jacket",
    price: 285000n,
    category: "Menswear",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80",
        contentType: "image/jpeg",
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir"],
    material: "Wool-Mohair",
    availability: true,
    isFeatured: false,
    description: "A slim one-button tuxedo in peak-lapel wool-mohair.",
    createdAt: 0n,
  },
  {
    id: 4n,
    name: "Structured Leather Shoulder Bag",
    price: 175000n,
    category: "Accessories",
    images: [
      {
        url: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&auto=format&fit=crop&q=80",
        contentType: "image/jpeg",
      },
    ],
    sizes: ["One Size"],
    colors: ["Noir", "Graphite"],
    material: "Saffiano Leather",
    availability: true,
    isFeatured: true,
    description:
      "Architectural structured bag in hand-finished saffiano leather.",
    createdAt: 0n,
  },
];

function NewArrivalsSection({ products }: { products: Product[] }) {
  const { ref, visible } = useReveal();
  const display =
    products.length > 0 ? products.slice(0, 4) : FALLBACK_PRODUCTS;

  return (
    <section
      data-ocid="new-arrivals.section"
      className="editorial-section bg-background"
      aria-label="New Arrivals"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div
          ref={ref}
          className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p
            className="font-body text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "oklch(0.75 0.04 240)" }}
          >
            Just In
          </p>
          <h2
            className="font-display-italic"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "oklch(0.95 0 0)",
            }}
          >
            New Arrivals
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {display.map((product, i) => (
            <div
              key={product.id.toString()}
              className="transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transitionDelay: `${i * 110}ms`,
              }}
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "500ms",
          }}
        >
          <Link
            to="/collections"
            data-ocid="new-arrivals.link"
            className="inline-block font-body text-xs tracking-[0.35em] uppercase pb-0.5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              color: "oklch(0.75 0.04 240)",
              borderBottom: "1px solid oklch(0.75 0.04 240 / 0.5)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.letterSpacing =
                "0.45em";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.letterSpacing =
                "0.35em";
            }}
          >
            Shop All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Brand Statement ──────────────────────────────────────────────────────────

function BrandStatementSection() {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      data-ocid="brand-statement.section"
      className="editorial-section"
      style={{ background: "oklch(0.08 0 0)" }}
      aria-label="Brand Statement"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div
            ref={ref}
            className={`transition-all duration-900 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <p
              className="font-body text-xs tracking-[0.4em] uppercase mb-5"
              style={{ color: "oklch(0.75 0.04 240)" }}
            >
              The House
            </p>
            <h2
              className="font-display-italic mb-7 leading-[1.05]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "oklch(0.95 0 0)",
              }}
            >
              Darkness is not the absence of light — it is its own illumination.
            </h2>
            <p
              className="font-body text-sm leading-[1.8] mb-8"
              style={{ color: "oklch(0.6 0 0)" }}
            >
              NOCTURNE was born from the quiet hours after midnight, when the
              world slows and beauty sharpens. Each collection is a meditation
              on restraint — the power of a single line, the weight of fine
              cloth, the silence between movements. We dress those who
              understand that true luxury is never announced.
            </p>
            <Link
              to="/about"
              data-ocid="brand-statement.link"
              className="inline-block font-body text-xs tracking-[0.35em] uppercase pb-0.5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                color: "oklch(0.75 0.04 240)",
                borderBottom: "1px solid oklch(0.75 0.04 240 / 0.5)",
              }}
            >
              The Maison
            </Link>
          </div>

          {/* Image */}
          <div
            className={`image-zoom transition-all duration-900 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=800&auto=format&fit=crop&q=80"
                alt="NOCTURNE editorial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Collections Grid ─────────────────────────────────────────────────────────

const COLLECTION_TILES = [
  {
    name: "Menswear",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80",
    href: "/collections",
  },
  {
    name: "Womenswear",
    image:
      "https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=800&auto=format&fit=crop&q=80",
    href: "/collections",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&auto=format&fit=crop&q=80",
    href: "/collections",
  },
  {
    name: "Evening Wear",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80",
    href: "/collections",
  },
  {
    name: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80",
    href: "/collections",
  },
  {
    name: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
    href: "/collections",
  },
];

function CollectionTile({
  tile,
  index,
  parentVisible,
}: {
  tile: (typeof COLLECTION_TILES)[0];
  index: number;
  parentVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/collections"
      data-ocid={`collections.item.${index + 1}`}
      className="group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        transitionDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={tile.image}
          alt={tile.name}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />
      </div>

      {/* Persistent bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.07 0 0 / 0.85) 0%, transparent 50%)",
        }}
      />

      {/* Name */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
        <p
          className="font-display-italic text-foreground"
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.4s ease",
          }}
        >
          {tile.name}
        </p>
        <p
          className="font-body text-[10px] tracking-[0.35em] uppercase mt-1"
          style={{
            color: "oklch(0.75 0.04 240)",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          View →
        </p>
      </div>
    </Link>
  );
}

function CollectionsGridSection() {
  const { ref, visible } = useReveal(0.08);

  return (
    <section
      data-ocid="collections.section"
      className="editorial-section bg-background"
      aria-label="Collections"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div
          className={`mb-12 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p
            className="font-body text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "oklch(0.75 0.04 240)" }}
          >
            The World of Nocturne
          </p>
          <h2
            className="font-display-italic"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "oklch(0.95 0 0)",
            }}
          >
            Collections
          </h2>
        </div>

        {/* 3×2 grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {COLLECTION_TILES.map((tile, i) => (
            <CollectionTile
              key={tile.name}
              tile={tile}
              index={i}
              parentVisible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lookbook Preview ─────────────────────────────────────────────────────────

const FALLBACK_LOOKBOOK: LookbookEntry[] = [
  {
    id: 1n,
    title: "The Quiet Hours",
    description:
      "A portrait of stillness — early morning before the city wakes",
    coverImage: {
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: BigInt(Date.now()) * 1_000_000n,
    tags: ["AW25", "Editorial"],
  },
  {
    id: 2n,
    title: "Shadow Play",
    description:
      "Light and dark in conversation — the architecture of dressing",
    coverImage: {
      url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&auto=format&fit=crop&q=80",
      contentType: "image/jpeg",
    },
    images: [],
    publishedAt: BigInt(Date.now() - 7 * 86400000) * 1_000_000n,
    tags: ["AW25", "Campaign"],
  },
];

function LookbookPreviewSection({ entries }: { entries: LookbookEntry[] }) {
  const { ref, visible } = useReveal(0.1);
  const display = entries.length > 0 ? entries.slice(0, 2) : FALLBACK_LOOKBOOK;

  return (
    <section
      data-ocid="lookbook.section"
      className="editorial-section"
      style={{ background: "oklch(0.08 0 0)" }}
      aria-label="Lookbook"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div
          className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p
            className="font-body text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: "oklch(0.75 0.04 240)" }}
          >
            Editorial
          </p>
          <h2
            className="font-display-italic"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              color: "oklch(0.95 0 0)",
            }}
          >
            The Lookbook
          </h2>
        </div>

        {/* 2-up layout */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {display.map((entry, i) => (
            <Link
              key={entry.id.toString()}
              to="/lookbook"
              data-ocid={`lookbook.item.${i + 1}`}
              className="group relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="aspect-[4/5] overflow-hidden image-zoom">
                <img
                  src={entry.coverImage.url}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.07 0 0 / 0.9) 0%, oklch(0.07 0 0 / 0.2) 50%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
                <p
                  className="font-body text-[10px] tracking-[0.35em] uppercase mb-2"
                  style={{ color: "oklch(0.75 0.04 240)" }}
                >
                  {entry.tags.join(" · ")}
                </p>
                <h3
                  className="font-display-italic leading-tight"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                    color: "oklch(0.95 0 0)",
                  }}
                >
                  {entry.title}
                </h3>
                <p
                  className="font-body text-xs mt-2 leading-relaxed line-clamp-2"
                  style={{ color: "oklch(0.6 0 0)" }}
                >
                  {entry.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: "400ms" }}
        >
          <Link
            to="/lookbook"
            data-ocid="lookbook.link"
            className="inline-block font-body text-xs tracking-[0.35em] uppercase pb-0.5 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              color: "oklch(0.75 0.04 240)",
              borderBottom: "1px solid oklch(0.75 0.04 240 / 0.5)",
            }}
          >
            Explore Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

function NewsletterSection() {
  const { ref, visible } = useReveal(0.2);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      data-ocid="newsletter.section"
      className="editorial-section bg-background"
      aria-label="Newsletter signup"
    >
      <div
        ref={ref}
        className={`max-w-xl mx-auto text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p
          className="font-body text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "oklch(0.75 0.04 240)" }}
        >
          The Inner Circle
        </p>
        <h2
          className="font-display-italic mb-3"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "oklch(0.95 0 0)",
          }}
        >
          Join Nocturne
        </h2>
        <p
          className="font-body text-sm mb-10 leading-relaxed"
          style={{ color: "oklch(0.55 0 0)" }}
        >
          First access to collections, private events, and correspondence from
          the Maison.
        </p>

        {submitted ? (
          <div data-ocid="newsletter.success_state" className="fade-in py-4">
            <div
              className="w-8 h-px mx-auto mb-4"
              style={{ background: "oklch(0.75 0.04 240)" }}
            />
            <p
              className="font-display-italic text-xl"
              style={{ color: "oklch(0.95 0 0)" }}
            >
              You are on the list.
            </p>
            <p
              className="font-body text-xs mt-2 tracking-[0.2em]"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              Expect a letter from the Maison shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            data-ocid="newsletter.form"
            className="flex gap-0"
            style={{ border: "1px solid oklch(0.22 0 0)" }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-ocid="newsletter.input"
              aria-label="Email address for newsletter"
              className="flex-1 px-5 py-4 font-body text-sm outline-none focus:ring-1 focus:ring-inset"
              style={{
                background: "transparent",
                color: "oklch(0.95 0 0)",
                border: "none",
                caretColor: "oklch(0.75 0.04 240)",
              }}
            />
            <button
              type="submit"
              data-ocid="newsletter.submit_button"
              className="px-7 py-4 font-body text-xs tracking-[0.3em] uppercase transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap"
              style={{
                background: "oklch(0.75 0.04 240)",
                color: "oklch(0.1 0 0)",
                border: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.85 0.04 240)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "oklch(0.75 0.04 240)";
              }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export function HomePage() {
  const { data: featuredProducts = [], isLoading } = useFeaturedProducts();
  const { data: lookbookEntries = [] } = useLookbookEntries();

  // Trigger useCollections to warm cache but we don't render it here
  useCollections();

  const productsToShow = isLoading ? [] : featuredProducts;

  return (
    <Layout fullBleed>
      <HeroSection />
      <NewArrivalsSection products={productsToShow} />
      <BrandStatementSection />
      <CollectionsGridSection />
      <LookbookPreviewSection entries={lookbookEntries} />
      <NewsletterSection />
    </Layout>
  );
}
