import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-border" />
      <div className="flex gap-1.5">
        <span className="w-1 h-1 rounded-full bg-primary opacity-60" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="w-1 h-1 rounded-full bg-primary opacity-60" />
      </div>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function formatPrice(cents: bigint | number): string {
  const n = typeof cents === "bigint" ? Number(cents) : cents;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n / 100);
}

export function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const isEmpty = items.length === 0;

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-card border-b border-border py-12 px-6 text-center">
        <p className="font-display text-xs tracking-[0.25em] uppercase text-primary mb-3">
          Your Selections
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground">
          Your Cart
        </h1>
        {!isEmpty && (
          <p className="font-body text-muted-foreground mt-2">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            /* ── Empty state ── */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="cart.empty_state"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                <ShoppingBag className="w-9 h-9 text-muted-foreground" />
              </div>
              <h2 className="font-display text-3xl text-foreground mb-3">
                Your cart is empty
              </h2>
              <p className="font-body text-muted-foreground max-w-sm mb-8">
                Discover our curated collections and find your next timeless
                piece.
              </p>
              <GoldDivider />
              <Link to="/collections" data-ocid="cart.continue_shopping_link">
                <Button
                  className="mt-2 bg-primary text-primary-foreground font-display tracking-widest uppercase text-xs px-10 py-6 h-auto hover:bg-primary/90 transition-smooth"
                  data-ocid="cart.continue_shopping_button"
                >
                  Continue Shopping
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            /* ── Cart with items ── */
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="lg:grid lg:grid-cols-3 lg:gap-16"
            >
              {/* Items column */}
              <div className="lg:col-span-2" data-ocid="cart.list">
                <AnimatePresence initial={false}>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.cartItemId}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.08 },
                      }}
                      exit={{
                        opacity: 0,
                        x: 20,
                        transition: { duration: 0.25 },
                      }}
                      className="group"
                      data-ocid={`cart.item.${index + 1}`}
                    >
                      <div className="flex gap-5 py-7">
                        {/* Product image */}
                        <div className="w-28 h-36 flex-shrink-0 bg-muted rounded overflow-hidden">
                          {item.productImage ? (
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover object-top"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-8 h-8 text-muted-foreground opacity-40" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="font-display text-base text-foreground leading-snug truncate">
                                {item.productName}
                              </h3>
                              <div className="flex gap-3 mt-1.5 font-body text-xs text-muted-foreground uppercase tracking-wider">
                                {item.size && <span>Size: {item.size}</span>}
                                {item.color && <span>· {item.color}</span>}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.cartItemId)}
                              aria-label={`Remove ${item.productName}`}
                              className="text-muted-foreground hover:text-foreground transition-smooth flex-shrink-0 p-1 -mr-1"
                              data-ocid={`cart.delete_button.${index + 1}`}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity stepper */}
                            <div
                              className="flex items-center border border-border rounded"
                              data-ocid={`cart.quantity.${index + 1}`}
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.cartItemId,
                                    item.quantity - 1,
                                  )
                                }
                                aria-label="Decrease quantity"
                                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
                                data-ocid={`cart.quantity_decrease.${index + 1}`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-body text-sm text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.cartItemId,
                                    item.quantity + 1,
                                  )
                                }
                                aria-label="Increase quantity"
                                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
                                data-ocid={`cart.quantity_increase.${index + 1}`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Prices */}
                            <div className="text-right">
                              {item.quantity > 1 && (
                                <p className="font-body text-xs text-muted-foreground">
                                  {formatPrice(item.price)} each
                                </p>
                              )}
                              <p className="font-display text-base text-foreground">
                                {formatPrice(
                                  Number(item.price) * item.quantity,
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator className="bg-border/60" />
                    </motion.div>
                  ))}
                </AnimatePresence>

                <div className="mt-6">
                  <Link
                    to="/collections"
                    data-ocid="cart.continue_shopping_link"
                  >
                    <button
                      type="button"
                      className="font-display text-xs tracking-widest uppercase text-muted-foreground hover:text-primary transition-smooth flex items-center gap-2"
                      data-ocid="cart.continue_shopping_button"
                    >
                      ← Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>

              {/* Order summary sidebar */}
              <div className="mt-12 lg:mt-0" data-ocid="cart.summary_panel">
                <div className="lg:sticky lg:top-24 bg-card border border-border rounded-sm p-8">
                  <h2 className="font-display text-xl text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 font-body text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-muted-foreground italic text-xs">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>

                  <Separator className="my-5 bg-border" />

                  <div className="flex justify-between font-display text-base mb-8">
                    <span className="text-foreground">Estimated Total</span>
                    <span className="text-primary font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <Link to="/checkout" data-ocid="cart.checkout_link">
                    <Button
                      className="w-full bg-primary text-primary-foreground font-display tracking-widest uppercase text-xs py-6 h-auto hover:bg-primary/90 transition-smooth"
                      data-ocid="cart.proceed_to_checkout_button"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>

                  <p className="font-body text-xs text-muted-foreground text-center mt-4">
                    Secure checkout · SSL encrypted
                  </p>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
                      Complimentary shipping on orders over $500 · Free returns
                      within 30 days
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
