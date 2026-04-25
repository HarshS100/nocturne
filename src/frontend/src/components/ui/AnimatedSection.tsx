import { useEffect, useRef, useState } from "react";

type AnimationVariant = "fade-in" | "slide-in-up" | "slide-in-right";

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  threshold?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  variant = "slide-in-up",
  delay = 0,
  threshold = 0.15,
  className = "",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style: React.CSSProperties = {
    opacity: visible ? undefined : 0,
    animationDelay: delay ? `${delay}ms` : undefined,
    animationFillMode: "both",
  };

  return (
    <div
      ref={ref}
      className={`${visible ? variant : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
