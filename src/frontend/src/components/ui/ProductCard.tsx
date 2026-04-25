import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Number(price));
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl = product.images[0]?.url ?? "/assets/images/placeholder.svg";

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id.toString() }}
      data-ocid={`product.item.${index + 1}`}
      className="group block bg-card border border-border overflow-hidden cursor-pointer transition-smooth hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
        />

        {/* Hover overlay with quick info */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-300" />

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

      {/* Details */}
      <div className="p-4">
        <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-base text-foreground leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.colors.length > 0 && (
            <span className="font-body text-xs text-muted-foreground">
              {product.colors.length}{" "}
              {product.colors.length === 1 ? "color" : "colors"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
