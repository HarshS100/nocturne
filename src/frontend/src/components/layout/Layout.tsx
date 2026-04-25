import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

interface LayoutProps {
  children: React.ReactNode;
  /**
   * fullBleed: suppresses the default pt-16 offset for hero pages where
   * the nav overlays the content (transparent nav at top).
   */
  fullBleed?: boolean;
}

export function Layout({ children, fullBleed = false }: LayoutProps) {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  // Scroll to top on route change
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Nav />
      <main className={`flex-1 ${fullBleed ? "" : "pt-16"}`}>{children}</main>
      <Footer />
    </div>
  );
}
