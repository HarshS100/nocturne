import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Lock,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentForm {
  cardNumber: string;
  expiry: string;
  cvv: string;
  nameOnCard: string;
  sameAsShipping: boolean;
}

type CheckoutStep = "shipping" | "payment" | "confirmation";

const SHIPPING_METHODS = [
  {
    id: "standard",
    label: "Standard Shipping",
    price: 0,
    eta: "5–7 business days",
  },
  {
    id: "express",
    label: "Express Shipping",
    price: 2500,
    eta: "2–3 business days",
  },
] as const;

type ShippingMethodId = (typeof SHIPPING_METHODS)[number]["id"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(cents: bigint | number, zeroLabel?: string): string {
  const n = typeof cents === "bigint" ? Number(cents) : cents;
  if (n === 0 && zeroLabel) return zeroLabel;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(n / 100);
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ME-${timestamp}-${rand}`;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p
      className="font-body text-xs text-destructive mt-1"
      data-ocid="checkout.field_error"
    >
      {msg}
    </p>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="font-body text-xs tracking-wider uppercase text-muted-foreground mb-1.5 block">
        {label}
      </Label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

// ─── Order Summary Panel ──────────────────────────────────────────────────────

function OrderSummaryPanel({
  shippingMethod,
  onShippingChange,
  subtotal,
  items,
  isOpen,
  onToggle,
}: {
  shippingMethod: ShippingMethodId;
  onShippingChange: (id: ShippingMethodId) => void;
  subtotal: number;
  items: ReturnType<typeof useCart>["items"];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const shipping = SHIPPING_METHODS.find((m) => m.id === shippingMethod)!;
  const total = subtotal + shipping.price;

  return (
    <div
      className="bg-card border border-border rounded-sm overflow-hidden"
      data-ocid="checkout.summary_panel"
    >
      {/* Mobile toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 lg:hidden border-b border-border"
        data-ocid="checkout.summary_toggle"
      >
        <span className="font-display text-sm text-foreground">
          Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
        </span>
        <div className="flex items-center gap-2">
          <span className="font-display text-sm text-primary">
            {formatPrice(total)}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        {/* Items */}
        <div className="px-6 pt-6 pb-4 space-y-4">
          {items.map((item) => (
            <div key={item.cartItemId} className="flex gap-3">
              <div className="relative flex-shrink-0 w-14 h-18 bg-muted rounded overflow-hidden">
                {item.productImage ? (
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-display flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-xs text-foreground leading-snug truncate">
                  {item.productName}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {[item.size, item.color].filter(Boolean).join(" · ")}
                </p>
              </div>
              <span className="font-body text-xs text-foreground flex-shrink-0">
                {formatPrice(Number(item.price) * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="bg-border/60" />

        {/* Shipping selector */}
        <div className="px-6 py-4">
          <p className="font-body text-xs tracking-wider uppercase text-muted-foreground mb-3">
            Shipping Method
          </p>
          <div className="space-y-2">
            {SHIPPING_METHODS.map((method) => (
              <label
                key={method.id}
                className="flex items-start gap-3 cursor-pointer group"
                data-ocid={`checkout.shipping_method.${method.id}`}
              >
                <div className="mt-0.5 w-4 h-4 rounded-full border-2 border-border flex-shrink-0 flex items-center justify-center group-hover:border-primary transition-smooth">
                  {shippingMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <input
                  type="radio"
                  name="shipping"
                  value={method.id}
                  checked={shippingMethod === method.id}
                  onChange={() => onShippingChange(method.id)}
                  className="sr-only"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-foreground">
                    {method.label}
                  </p>
                  <p className="font-body text-xs text-muted-foreground">
                    {method.eta}
                  </p>
                </div>
                <span className="font-body text-xs text-foreground flex-shrink-0">
                  {formatPrice(method.price, "Free")}
                </span>
              </label>
            ))}
          </div>
        </div>

        <Separator className="bg-border/60" />

        {/* Totals */}
        <div className="px-6 py-5 space-y-2.5 font-body text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground">
              {formatPrice(shipping.price, "Free")}
            </span>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="px-6 py-5 flex justify-between">
          <span className="font-display text-base text-foreground">Total</span>
          <span className="font-display text-xl text-primary">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Shipping Step ────────────────────────────────────────────────────────────

function ShippingStep({
  values,
  onChange,
  onSubmit,
}: {
  values: ShippingForm;
  onChange: (field: keyof ShippingForm, val: string) => void;
  onSubmit: () => void;
}) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingForm, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ShippingForm, boolean>>
  >({});

  const required: (keyof ShippingForm)[] = [
    "firstName",
    "lastName",
    "email",
    "address1",
    "city",
    "state",
    "postalCode",
    "country",
  ];

  function validate(): boolean {
    const errs: Partial<Record<keyof ShippingForm, string>> = {};
    for (const f of required) {
      if (!values[f].trim()) errs[f] = "This field is required";
    }
    if (values.email && !validateEmail(values.email)) {
      errs.email = "Please enter a valid email address";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    const allTouched: Partial<Record<keyof ShippingForm, boolean>> = {};
    for (const f of required) {
      allTouched[f] = true;
    }
    setTouched(allTouched);
    if (validate()) onSubmit();
  }

  function handleBlur(field: keyof ShippingForm) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (touched[field]) validate();
  }

  function field(
    name: keyof ShippingForm,
    label: string,
    type = "text",
    placeholder = "",
  ) {
    return (
      <FormField label={label} error={touched[name] ? errors[name] : undefined}>
        <Input
          type={type}
          value={values[name]}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => handleBlur(name)}
          placeholder={placeholder}
          className="bg-background border-input font-body text-sm h-11 focus-visible:ring-ring"
          data-ocid={`checkout.${name}_input`}
        />
      </FormField>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      data-ocid="checkout.shipping_step"
    >
      <h2 className="font-display text-2xl text-foreground mb-8">
        Shipping Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field("firstName", "First Name *", "text", "Éloise")}
        {field("lastName", "Last Name *", "text", "Dupont")}
        <div className="sm:col-span-2">
          {field("email", "Email Address *", "email", "eloisa@example.com")}
        </div>
        <div className="sm:col-span-2">
          {field("phone", "Phone Number", "tel", "+1 (555) 000-0000")}
        </div>
        <div className="sm:col-span-2">
          {field("address1", "Address Line 1 *", "text", "15 Rue de la Paix")}
        </div>
        <div className="sm:col-span-2">
          {field("address2", "Address Line 2", "text", "Apt 4, Suite B")}
        </div>
        {field("city", "City *", "text", "New York")}
        {field("state", "State / Province *", "text", "NY")}
        {field("postalCode", "Postal Code *", "text", "10001")}
        {field("country", "Country *", "text", "United States")}
      </div>

      <div className="mt-10">
        <Button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground font-display tracking-widest uppercase text-xs py-6 h-auto hover:bg-primary/90 transition-smooth"
          data-ocid="checkout.continue_to_payment_button"
        >
          Continue to Payment
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Payment Step ─────────────────────────────────────────────────────────────

function PaymentStep({
  values,
  onChange,
  onSubmit,
  onBack,
  isProcessing,
  paymentError,
}: {
  values: PaymentForm;
  onChange: (field: keyof PaymentForm, val: string | boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isProcessing: boolean;
  paymentError: string | null;
}) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof PaymentForm, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof PaymentForm, boolean>>
  >({});

  function validate(): boolean {
    const errs: Partial<Record<keyof PaymentForm, string>> = {};
    const rawCard = values.cardNumber.replace(/\s/g, "");
    if (!rawCard) errs.cardNumber = "Card number is required";
    else if (rawCard.length < 16)
      errs.cardNumber = "Enter a complete card number";
    if (!values.expiry) errs.expiry = "Expiry date is required";
    else if (values.expiry.length < 5)
      errs.expiry = "Enter a valid expiry (MM/YY)";
    if (!values.cvv) errs.cvv = "CVV is required";
    else if (values.cvv.length < 3) errs.cvv = "Enter a 3–4 digit CVV";
    if (!values.nameOnCard.trim()) errs.nameOnCard = "Name on card is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    setTouched({ cardNumber: true, expiry: true, cvv: true, nameOnCard: true });
    if (validate()) onSubmit();
  }

  function handleBlur(field: keyof PaymentForm) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      data-ocid="checkout.payment_step"
    >
      <h2 className="font-display text-2xl text-foreground mb-8">
        Payment Details
      </h2>

      {/* Card wrapper — Stripe-like styling */}
      <div className="bg-muted/40 border border-border rounded-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Lock className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="font-body text-xs text-muted-foreground tracking-wider">
            Secured with 256-bit SSL encryption
          </span>
        </div>

        <div className="space-y-5">
          <FormField
            label="Card Number *"
            error={touched.cardNumber ? errors.cardNumber : undefined}
          >
            <Input
              type="text"
              inputMode="numeric"
              value={values.cardNumber}
              onChange={(e) =>
                onChange("cardNumber", formatCardNumber(e.target.value))
              }
              onBlur={() => handleBlur("cardNumber")}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="bg-background border-input font-mono text-sm h-11 tracking-wider"
              data-ocid="checkout.card_number_input"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Expiry Date *"
              error={touched.expiry ? errors.expiry : undefined}
            >
              <Input
                type="text"
                inputMode="numeric"
                value={values.expiry}
                onChange={(e) =>
                  onChange("expiry", formatExpiry(e.target.value))
                }
                onBlur={() => handleBlur("expiry")}
                placeholder="MM / YY"
                maxLength={5}
                className="bg-background border-input font-mono text-sm h-11"
                data-ocid="checkout.expiry_input"
              />
            </FormField>
            <FormField
              label="CVV *"
              error={touched.cvv ? errors.cvv : undefined}
            >
              <Input
                type="text"
                inputMode="numeric"
                value={values.cvv}
                onChange={(e) =>
                  onChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                onBlur={() => handleBlur("cvv")}
                placeholder="123"
                maxLength={4}
                className="bg-background border-input font-mono text-sm h-11"
                data-ocid="checkout.cvv_input"
              />
            </FormField>
          </div>

          <FormField
            label="Name on Card *"
            error={touched.nameOnCard ? errors.nameOnCard : undefined}
          >
            <Input
              type="text"
              value={values.nameOnCard}
              onChange={(e) => onChange("nameOnCard", e.target.value)}
              onBlur={() => handleBlur("nameOnCard")}
              placeholder="Éloise Dupont"
              className="bg-background border-input font-body text-sm h-11"
              data-ocid="checkout.name_on_card_input"
            />
          </FormField>
        </div>
      </div>

      {/* Billing address */}
      <label
        className="flex items-center gap-3 cursor-pointer mb-8"
        data-ocid="checkout.same_as_shipping_checkbox"
      >
        <div
          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-smooth ${
            values.sameAsShipping
              ? "border-primary bg-primary"
              : "border-border bg-background"
          }`}
        >
          {values.sameAsShipping && (
            <svg
              aria-hidden="true"
              className="w-2.5 h-2.5 text-primary-foreground"
              viewBox="0 0 10 8"
              fill="none"
            >
              <path
                d="M1 4l3 3 5-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <input
          type="checkbox"
          checked={values.sameAsShipping}
          onChange={(e) => onChange("sameAsShipping", e.target.checked)}
          className="sr-only"
          data-ocid="checkout.billing_same_as_shipping"
        />
        <span className="font-body text-sm text-foreground">
          Billing address same as shipping
        </span>
      </label>

      {/* Payment error */}
      {paymentError && (
        <div
          className="bg-destructive/10 border border-destructive/30 rounded-sm px-4 py-3 mb-6"
          data-ocid="checkout.payment_error_state"
        >
          <p className="font-body text-sm text-destructive">{paymentError}</p>
        </div>
      )}

      <div className="space-y-3">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isProcessing}
          className="w-full bg-primary text-primary-foreground font-display tracking-widest uppercase text-xs py-6 h-auto hover:bg-primary/90 transition-smooth disabled:opacity-70"
          data-ocid="checkout.place_order_button"
        >
          {isProcessing ? (
            <span
              className="flex items-center gap-2"
              data-ocid="checkout.loading_state"
            >
              <svg
                aria-hidden="true"
                className="animate-spin w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Processing…
            </span>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 mr-1" />
              Place Order
            </>
          )}
        </Button>

        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="w-full font-display text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-smooth py-2 disabled:opacity-40"
          data-ocid="checkout.back_to_shipping_button"
        >
          ← Back to Shipping
        </button>
      </div>
    </motion.div>
  );
}

// ─── Order Confirmation ────────────────────────────────────────────────────────

function OrderConfirmation({
  orderNumber,
  email,
  items,
  total,
}: {
  orderNumber: string;
  email: string;
  items: ReturnType<typeof useCart>["items"];
  total: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center py-8 max-w-xl mx-auto"
      data-ocid="checkout.confirmation_panel"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle className="w-10 h-10 text-primary" />
      </motion.div>

      <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
        Order Confirmed
      </p>
      <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4 leading-tight">
        Thank you for your order
      </h1>
      <p className="font-body text-muted-foreground mb-2">
        Order number:{" "}
        <span className="font-mono text-foreground font-medium">
          {orderNumber}
        </span>
      </p>
      {email && (
        <p className="font-body text-sm text-muted-foreground mb-8">
          A confirmation has been sent to{" "}
          <span className="text-foreground">{email}</span>
        </p>
      )}

      {/* Order recap */}
      <div className="bg-card border border-border rounded-sm p-6 mb-8 text-left">
        <h3 className="font-display text-base text-foreground mb-4">
          Order Summary
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.cartItemId}
              className="flex justify-between items-center"
            >
              <div className="min-w-0 pr-4">
                <p className="font-body text-sm text-foreground truncate">
                  {item.productName}
                </p>
                <p className="font-body text-xs text-muted-foreground">
                  Qty: {item.quantity}
                  {item.size ? ` · ${item.size}` : ""}
                  {item.color ? ` · ${item.color}` : ""}
                </p>
              </div>
              <span className="font-body text-sm text-foreground flex-shrink-0">
                {formatPrice(Number(item.price) * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <Separator className="my-4 bg-border" />
        <div className="flex justify-between font-display text-base">
          <span className="text-foreground">Total Paid</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>

      <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
        Your order will be carefully packaged and dispatched within 1–2 business
        days. Complimentary gift wrapping included.
      </p>

      <Link to="/collections" data-ocid="checkout.continue_shopping_link">
        <Button
          className="bg-primary text-primary-foreground font-display tracking-widest uppercase text-xs px-10 py-6 h-auto hover:bg-primary/90 transition-smooth"
          data-ocid="checkout.continue_shopping_button"
        >
          Continue Shopping
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </Link>
    </motion.div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirmation" },
];

function StepIndicator({ current }: { current: CheckoutStep }) {
  const currentIdx = STEPS.findIndex((s) => s.key === current);
  return (
    <div
      className="flex items-center gap-0 justify-center"
      data-ocid="checkout.progress_indicator"
    >
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-smooth text-xs font-display ${
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : active
                      ? "border-primary bg-background text-primary"
                      : "border-border bg-background text-muted-foreground"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`mt-1.5 font-body text-xs tracking-wider uppercase ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 h-px mb-4 mx-1 transition-smooth ${
                  done ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main CheckoutPage ────────────────────────────────────────────────────────

const emptyShipping: ShippingForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

const emptyPayment: PaymentForm = {
  cardNumber: "",
  expiry: "",
  cvv: "",
  nameOnCard: "",
  sameAsShipping: true,
};

export function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [shipping, setShipping] = useState<ShippingForm>(emptyShipping);
  const [payment, setPayment] = useState<PaymentForm>(emptyPayment);
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethodId>("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [confirmedItems, setConfirmedItems] = useState<
    ReturnType<typeof useCart>["items"]
  >([]);

  const shippingCost = SHIPPING_METHODS.find(
    (m) => m.id === shippingMethod,
  )!.price;
  const total = subtotal + shippingCost;

  function updateShipping(field: keyof ShippingForm, val: string) {
    setShipping((prev) => ({ ...prev, [field]: val }));
  }

  function updatePayment(field: keyof PaymentForm, val: string | boolean) {
    setPayment((prev) => ({ ...prev, [field]: val }));
  }

  async function handlePlaceOrder() {
    setIsProcessing(true);
    setPaymentError(null);
    // Simulate payment processing delay
    await new Promise((r) => setTimeout(r, 2200));
    // Simulate 90% success rate for demo
    const success = Math.random() > 0.1;
    if (success) {
      const num = generateOrderNumber();
      setOrderNumber(num);
      setConfirmedItems(items);
      clearCart();
      setStep("confirmation");
    } else {
      setPaymentError(
        "Your card was declined. Please check your details and try again, or use a different payment method.",
      );
    }
    setIsProcessing(false);
  }

  // Empty cart guard (not in confirmation)
  if (items.length === 0 && step !== "confirmation") {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
          <h1 className="font-display text-4xl text-foreground mb-4">
            Your cart is empty
          </h1>
          <p className="font-body text-muted-foreground mb-8">
            Add some items before checking out.
          </p>
          <Link to="/collections" data-ocid="checkout.empty_state">
            <Button
              className="bg-primary text-primary-foreground font-display tracking-widest uppercase text-xs px-10 py-6 h-auto hover:bg-primary/90"
              data-ocid="checkout.browse_collections_button"
            >
              Browse Collections
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Page header */}
      <div className="bg-card border-b border-border py-10 px-6 text-center">
        <p className="font-display text-xs tracking-[0.25em] uppercase text-primary mb-3">
          Secure Checkout
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
          {step === "confirmation" ? "Order Confirmed" : "Complete Your Order"}
        </h1>
        {step !== "confirmation" && <StepIndicator current={step} />}
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {step === "confirmation" ? (
          <OrderConfirmation
            orderNumber={orderNumber}
            email={shipping.email}
            items={confirmedItems}
            total={total}
          />
        ) : (
          <div className="lg:grid lg:grid-cols-5 lg:gap-14">
            {/* Form column */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <ShippingStep
                    key="shipping"
                    values={shipping}
                    onChange={updateShipping}
                    onSubmit={() => setStep("payment")}
                  />
                )}
                {step === "payment" && (
                  <PaymentStep
                    key="payment"
                    values={payment}
                    onChange={updatePayment}
                    onSubmit={handlePlaceOrder}
                    onBack={() => setStep("shipping")}
                    isProcessing={isProcessing}
                    paymentError={paymentError}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Summary column */}
            <div className="lg:col-span-2 mt-12 lg:mt-0">
              <div className="lg:sticky lg:top-24">
                <OrderSummaryPanel
                  shippingMethod={shippingMethod}
                  onShippingChange={setShippingMethod}
                  subtotal={subtotal}
                  items={items}
                  isOpen={summaryOpen}
                  onToggle={() => setSummaryOpen((v) => !v)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
