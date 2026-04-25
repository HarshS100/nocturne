import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ProductCard } from "@/components/ui/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCollections,
  useProduct,
  useProductsByCollection,
} from "@/hooks/useBackend";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(price));
}

const COLOR_MAP: Record<string, string> = {
  black: "#1a1a1a",
  white: "#f0ede8",
  ivory: "#fffff0",
  cream: "#f5f1ed",
  camel: "#c19a6b",
  taupe: "#8b8680",
  navy: "#1b2a4a",
  brown: "#6b3f20",
  beige: "#d4c09e",
  grey: "#9e9e9e",
  gray: "#9e9e9e",
  burgundy: "#800020",
  forest: "#228b22",
  cognac: "#9a3324",
  sand: "#c2b280",
  olive: "#6b6b28",
  charcoal: "#3c3c3c",
  silver: "#c0c0c0",
};

function getColorSwatch(colorName: string): string {
  return COLOR_MAP[colorName.toLowerCase()] ?? "#6b6b6b";
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({
  collectionId,
  collectionName,
  productName,
}: {
  collectionId?: string;
  collectionName?: string;
  productName: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8"
      data-ocid="product_detail.breadcrumb"
    >
      <ol className="flex items-center gap-2 font-body text-[11px] tracking-widest uppercase text-muted-foreground flex-wrap">
        <li>
          <Link
            to="/"
            className="hover:text-foreground transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="opacity-30">
          ›
        </li>
        {collectionName && collectionId ? (
          <>
            <li>
              <Link
                to="/collections/$id"
                params={{ id: collectionId }}
                className="hover:text-foreground transition-colors duration-200"
              >
                {collectionName}
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-30">
              ›
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/collections"
                className="hover:text-foreground transition-colors duration-200"
              >
                Collections
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-30">
              ›
            </li>
          </>
        )}
        <li className="text-foreground/70 truncate max-w-[200px]">
          {productName}
        </li>
      </ol>
    </nav>
  );
}

// ─── Image Gallery ────────────────────────────────────────────────────────────

function ImageGallery({ product }: { product: Product }) {
  const images =
    product.images.length > 0
      ? product.images
      : [
          {
            url: "/assets/images/placeholder.svg",
            contentType: "image/svg+xml",
          },
        ];
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const img = imgRef.current.querySelector("img");
    if (img) {
      img.style.transformOrigin = `${x}% ${y}%`;
    }
  }

  return (
    <div
      data-ocid="product_detail.image_gallery"
      className="lg:sticky lg:top-8"
    >
      {/* Main Image */}
      <div
        ref={imgRef}
        className="relative aspect-[3/4] bg-card overflow-hidden mb-4 group cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        data-ocid="product_detail.main_image"
      >
        {/* Subtle corner marks for luxury feel */}
        <span className="absolute top-3 left-3 w-5 h-5 border-t border-l border-border/40 z-10 pointer-events-none" />
        <span className="absolute top-3 right-3 w-5 h-5 border-t border-r border-border/40 z-10 pointer-events-none" />
        <span className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-border/40 z-10 pointer-events-none" />
        <span className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-border/40 z-10 pointer-events-none" />

        <img
          src={images[activeIdx]?.url ?? "/assets/images/placeholder.svg"}
          alt={`${product.name} — view ${activeIdx + 1}`}
          key={activeIdx}
          className={`w-full h-full object-cover transition-[transform,opacity] duration-700 ease-out ${
            isZoomed ? "scale-[1.06]" : "scale-100"
          } fade-in`}
          style={{ willChange: "transform" }}
        />

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 font-body text-[10px] tracking-widest text-foreground/50 bg-background/60 backdrop-blur-sm px-2 py-1">
            {activeIdx + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              aria-label={`View image ${i + 1}`}
              data-ocid={`product_detail.thumbnail.${i + 1}`}
              onClick={() => setActiveIdx(i)}
              className={`flex-shrink-0 w-[72px] h-[90px] overflow-hidden border transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
                activeIdx === i
                  ? "border-primary opacity-100"
                  : "border-border/40 opacity-50 hover:opacity-80 hover:border-border"
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Product Panel ────────────────────────────────────────────────────────────

function ProductPanel({
  product,
  collectionName,
  collectionId,
}: {
  product: Product;
  collectionName?: string;
  collectionId?: string;
}) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0] ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState(false);

  function handleAddToCart() {
    if (!selectedSize) return;
    const imageUrl = product.images[0]?.url ?? "/assets/images/placeholder.svg";
    addItem(
      product.id,
      product.name,
      imageUrl,
      product.price,
      selectedSize,
      selectedColor,
      quantity,
    );
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 3500);
  }

  return (
    <div className="space-y-7 pt-2">
      <Breadcrumb
        collectionId={collectionId}
        collectionName={collectionName}
        productName={product.name}
      />

      {/* Category + Material badges */}
      <div className="flex flex-wrap items-center gap-3">
        {product.category && (
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground border border-border/50 px-3 py-1">
            {product.category}
          </span>
        )}
        {product.material && (
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground border border-border/50 px-3 py-1">
            {product.material}
          </span>
        )}
      </div>

      {/* Name */}
      <h1
        data-ocid="product_detail.title"
        className="font-display-italic text-4xl md:text-5xl text-foreground leading-[1.05] tracking-tight"
      >
        {product.name}
      </h1>

      {/* Price */}
      <p
        data-ocid="product_detail.price"
        className="font-body text-2xl font-medium tracking-wide"
        style={{ color: "oklch(0.82 0.04 240)" }}
      >
        {formatPrice(product.price)}
      </p>

      {/* Divider */}
      <div className="border-t border-border/30" />

      {/* Short Description */}
      <p className="font-body text-sm text-foreground/75 leading-[1.8]">
        {product.description}
      </p>

      {/* Availability */}
      <div
        data-ocid="product_detail.availability"
        className="flex items-center gap-2.5"
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          aria-hidden="true"
          style={{
            background: product.availability
              ? "oklch(0.62 0.15 150)"
              : "oklch(0.45 0.02 60)",
          }}
        />
        <span className="font-body text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          {product.availability ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Color Selector */}
      {product.colors.length > 0 && (
        <div>
          <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
            Colour:{" "}
            <span className="text-foreground/80 normal-case font-medium">
              {selectedColor}
            </span>
          </p>
          <div className="flex gap-3 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={color}
                data-ocid={`product_detail.color.${color.toLowerCase()}`}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                  selectedColor === color
                    ? "ring-2 ring-offset-2 ring-offset-background scale-110"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}
                style={{
                  backgroundColor: getColorSwatch(color),
                  boxShadow:
                    selectedColor === color
                      ? "0 0 0 2px oklch(0.1 0 0), 0 0 0 3.5px oklch(0.82 0.04 240)"
                      : undefined,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      {product.sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              Size
              {!selectedSize && (
                <span className="text-foreground/40 normal-case ml-2">
                  — select
                </span>
              )}
            </p>
            <Link
              to="/size-guide"
              data-ocid="product_detail.size_guide_link"
              className="font-body text-[10px] tracking-[0.15em] uppercase underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Size Guide
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                data-ocid={`product_detail.size.${size.toLowerCase()}`}
                onClick={() => setSelectedSize(size)}
                className={`font-body text-xs w-12 h-12 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring tracking-wider ${
                  selectedSize === size
                    ? "border-primary/80 text-foreground bg-primary/5"
                    : "border-border/50 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
                style={
                  selectedSize === size
                    ? {
                        borderColor: "oklch(0.82 0.04 240)",
                        color: "oklch(0.82 0.04 240)",
                      }
                    : undefined
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
          Quantity
        </p>
        <div className="inline-flex items-center border border-border/50">
          <button
            type="button"
            aria-label="Decrease quantity"
            data-ocid="product_detail.qty_decrease"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center font-body text-lg text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none"
          >
            −
          </button>
          <span
            data-ocid="product_detail.qty_value"
            className="w-10 h-10 flex items-center justify-center font-body text-sm text-foreground border-x border-border/50 tabular-nums"
          >
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            data-ocid="product_detail.qty_increase"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center font-body text-lg text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-none"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="space-y-3">
        <button
          type="button"
          data-ocid="product_detail.add_to_cart_button"
          disabled={!product.availability || !selectedSize}
          onClick={handleAddToCart}
          className={`w-full font-body text-[11px] tracking-[0.35em] uppercase py-4 border transition-all duration-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring group relative overflow-hidden ${
            product.availability && selectedSize
              ? "border-foreground/40 text-foreground hover:text-background cursor-pointer"
              : "border-border/30 text-muted-foreground cursor-not-allowed"
          }`}
          style={
            product.availability && selectedSize
              ? {
                  borderColor: "oklch(0.82 0.04 240)",
                  color: "oklch(0.82 0.04 240)",
                }
              : undefined
          }
        >
          {/* Hover fill */}
          {product.availability && selectedSize && (
            <span
              className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
              style={{ background: "oklch(0.82 0.04 240)" }}
              aria-hidden="true"
            />
          )}
          <span className="relative z-10 group-hover:text-background transition-colors duration-300">
            {!product.availability
              ? "Out of Stock"
              : !selectedSize
                ? "Select a Size"
                : "Add to Cart"}
          </span>
        </button>

        {/* Confirmation feedback */}
        {addedMsg && (
          <div
            data-ocid="product_detail.success_state"
            className="border border-border/40 bg-card text-foreground/70 font-body text-[11px] tracking-[0.2em] uppercase px-4 py-3 text-center fade-in"
          >
            Added to your cart ✓
          </div>
        )}

        {/* Shipping note */}
        <p className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground text-center">
          Complimentary shipping on all orders
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-border/30" />

      {/* Description expanded */}
      <div className="space-y-4">
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          About this Piece
        </p>
        <p className="font-body text-sm text-foreground/70 leading-[1.9]">
          {product.description}
        </p>
        {product.material && (
          <p className="font-body text-xs text-muted-foreground">
            <span className="tracking-widest uppercase text-[10px]">
              Material:
            </span>{" "}
            {product.material}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function ProductDetailSkeleton() {
  return (
    <Layout>
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          <div className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="w-[72px] h-[90px]" />
              ))}
            </div>
          </div>
          <div className="space-y-5 pt-8">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-px w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="w-8 h-8 rounded-full" />
              ))}
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <Skeleton key={i} className="w-12 h-12" />
              ))}
            </div>
            <Skeleton className="h-12 w-full mt-4" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const productId = useMemo(() => {
    try {
      return BigInt(id);
    } catch {
      return undefined;
    }
  }, [id]);

  const { data: product, isLoading } = useProduct(productId);
  const { data: collections } = useCollections();

  const parentCollection = useMemo(() => {
    if (!product || !collections) return undefined;
    return collections.find((col) => col.productIds.includes(product.id));
  }, [product, collections]);

  const { data: related } = useProductsByCollection(parentCollection?.id);

  const relatedProducts = useMemo(() => {
    if (!related || !product) return [];
    return related.filter((p) => p.id !== product.id).slice(0, 4);
  }, [related, product]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (!product) {
    return (
      <Layout>
        <div
          data-ocid="product_detail.error_state"
          className="max-w-screen-xl mx-auto px-6 py-32 text-center"
        >
          <p className="font-display-italic text-4xl text-foreground mb-4">
            Not Found
          </p>
          <p className="font-body text-sm text-muted-foreground mb-10 tracking-wide">
            This piece may no longer be available in our collection.
          </p>
          <Link
            to="/collections"
            data-ocid="product_detail.back_to_collections_link"
            className="font-body text-[11px] tracking-[0.3em] uppercase border px-8 py-3.5 text-foreground hover:bg-foreground hover:text-background transition-smooth"
            style={{
              borderColor: "oklch(0.82 0.04 240)",
              color: "oklch(0.82 0.04 240)",
            }}
          >
            View Collections
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* ── Main product section ── */}
      <section
        data-ocid="product_detail.page"
        className="max-w-screen-xl mx-auto px-6 py-12 md:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left — Gallery (sticky) */}
          <AnimatedSection variant="fade-in">
            <ImageGallery product={product} />
          </AnimatedSection>

          {/* Right — Details */}
          <AnimatedSection variant="slide-in-up" delay={120}>
            <ProductPanel
              product={product}
              collectionName={parentCollection?.name}
              collectionId={parentCollection?.id.toString()}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section
          data-ocid="product_detail.related_section"
          className="border-t border-border/30 bg-card/40"
        >
          <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-20">
            <AnimatedSection variant="fade-in" className="mb-12 text-center">
              <p
                className="font-body text-[10px] tracking-[0.4em] uppercase mb-4"
                style={{ color: "oklch(0.82 0.04 240)" }}
              >
                Curated for You
              </p>
              <h2 className="font-display-italic text-3xl md:text-4xl text-foreground">
                You May Also Like
              </h2>
            </AnimatedSection>

            <div
              data-ocid="product_detail.related_list"
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6"
            >
              {relatedProducts.map((p: Product, i: number) => (
                <AnimatedSection
                  key={p.id.toString()}
                  variant="slide-in-up"
                  delay={i * 90}
                >
                  <ProductCard product={p} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
