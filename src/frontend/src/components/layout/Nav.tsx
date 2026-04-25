import { useCart } from "@/hooks/useCart";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Collaborations", href: "/collaborations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NocturneLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Geometric diamond mark */}
      <polygon
        points="14,2 26,14 14,26 2,14"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.9"
      />
      <polygon
        points="14,7 21,14 14,21 7,14"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.5"
      />
      {/* Center dot */}
      <circle cx="14" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
      {/* N letterform inside */}
      <path
        d="M10 18V10L14 16V10M14 16L18 10V18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

export function Nav() {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      setMobileOpen(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        data-ocid="nav.header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.logo_link"
            className="flex items-center gap-3 group"
          >
            <NocturneLogo className="text-foreground group-hover:text-primary transition-colors duration-300" />
            <span
              className="font-display italic text-lg tracking-[0.35em] text-foreground uppercase group-hover:text-primary transition-colors duration-300"
              style={{ letterSpacing: "0.3em" }}
            >
              NOCTURNE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
                className="relative font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground group hover:text-foreground transition-colors duration-200"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-foreground/60 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="nav.search_button"
              aria-label="Search"
              onClick={() => navigate({ to: "/search" })}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1.5"
            >
              <Search size={16} strokeWidth={1.5} />
            </button>

            <Link
              to="/cart"
              data-ocid="nav.cart_link"
              aria-label={`Cart (${totalItems} items)`}
              className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 p-1.5"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span
                  data-ocid="nav.cart_badge"
                  className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-primary text-background text-[9px] font-body font-semibold rounded-full flex items-center justify-center px-0.5 leading-none"
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              data-ocid="nav.mobile_menu_toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors duration-200 p-1.5"
            >
              {mobileOpen ? (
                <X size={18} strokeWidth={1.5} />
              ) : (
                <Menu size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        data-ocid="nav.mobile_menu"
        className={`fixed inset-0 z-40 bg-background flex flex-col transition-all duration-500 md:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Decorative platinum line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-16" />

        <nav
          className="flex-1 flex flex-col items-center justify-center gap-8 px-6"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              to={link.href}
              data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
              className="font-display italic text-3xl tracking-[0.12em] text-foreground/80 hover:text-foreground transition-all duration-300 hover:tracking-[0.18em]"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : "0ms",
                transform: mobileOpen ? "translateY(0)" : "translateY(12px)",
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom decorative line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />
      </div>
    </>
  );
}
