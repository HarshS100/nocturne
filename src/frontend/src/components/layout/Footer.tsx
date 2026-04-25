import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useState } from "react";
import { SiPinterest, SiX } from "react-icons/si";

const navigateLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Collaborations", href: "/collaborations" },
  { label: "New Arrivals", href: "/collections" },
  { label: "Size Guide", href: "/size-guide" },
];

const customerLinks = [
  { label: "About NOCTURNE", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Policies & FAQ", href: "/policies" },
  { label: "Returns", href: "/policies" },
];

const socials = [
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    IconSize: 16,
  },
  { label: "X (Twitter)", icon: SiX, href: "https://x.com", IconSize: 15 },
  {
    label: "Pinterest",
    icon: SiPinterest,
    href: "https://pinterest.com",
    IconSize: 15,
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-background">
      {/* Platinum accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Main footer grid */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="md:col-span-1">
          <Link
            to="/"
            className="font-display italic text-base tracking-[0.3em] text-foreground block mb-3 uppercase hover:text-primary transition-colors duration-300"
          >
            NOCTURNE
          </Link>
          <p className="font-body text-xs text-muted-foreground leading-relaxed tracking-wide max-w-[200px]">
            Dark luxury. Absolute refinement. For those who inhabit the night.
          </p>
          <div className="flex gap-4 mt-6">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4 className="font-body text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-5">
            Navigate
          </h4>
          <ul className="space-y-3">
            {navigateLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-body text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-5">
            Customer Care
          </h4>
          <ul className="space-y-3">
            {customerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-body text-[10px] tracking-[0.22em] uppercase text-foreground/50 mb-5">
            The NOCTURNE Letter
          </h4>
          <p className="font-body text-xs text-muted-foreground mb-5 leading-relaxed">
            Exclusive access. Early collections. Editorial stories.
          </p>
          {subscribed ? (
            <p
              data-ocid="footer.newsletter_success_state"
              className="font-body text-xs text-primary tracking-wide"
            >
              You're on the list.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
              <input
                data-ocid="footer.newsletter_input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full bg-transparent border border-border/60 text-foreground font-body text-xs px-3 py-2.5 placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors duration-300 tracking-wide"
              />
              <button
                data-ocid="footer.newsletter_submit_button"
                type="submit"
                className="w-full border border-foreground/20 text-foreground font-body text-[10px] tracking-[0.2em] uppercase py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Thin separator */}
      <div className="border-t border-border/40">
        <div className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[10px] text-muted-foreground/60 tracking-widest uppercase">
            © {year} NOCTURNE. All rights reserved.
          </p>
          <p className="font-body text-[10px] text-muted-foreground/40">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-muted-foreground transition-colors duration-200"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
