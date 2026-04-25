import { useEffect, useRef, useState } from "react";

const SPLASH_KEY = "nocturne_splash_shown";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SPLASH_KEY);
    if (alreadyShown) return;

    setVisible(true);
    sessionStorage.setItem(SPLASH_KEY, "1");

    // Begin exit after 2.8s
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2800);

    // Unmount after exit animation completes (2.8s + 0.7s)
    const unmountTimer = setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className={`splash-overlay${exiting ? " splash-hidden" : ""}`}
      aria-hidden="true"
      data-ocid="splash.overlay"
    >
      {/* Ambient orb — left */}
      <div
        style={{
          position: "absolute",
          left: "-5%",
          top: "30%",
          width: "38vw",
          height: "38vw",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, oklch(0.55 0.06 240 / 0.13) 0%, oklch(0.3 0.04 240 / 0.06) 50%, transparent 70%)",
          filter: "blur(40px)",
          animation: "splashOrbLeft 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Ambient orb — right */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          bottom: "28%",
          width: "36vw",
          height: "36vw",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, oklch(0.45 0.08 285 / 0.12) 0%, oklch(0.3 0.05 285 / 0.05) 50%, transparent 70%)",
          filter: "blur(48px)",
          animation: "splashOrbRight 7s ease-in-out 0.8s infinite",
          pointerEvents: "none",
        }}
      />

      {/* Corner light ray — top left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "35vw",
          height: "35vh",
          background:
            "linear-gradient(135deg, oklch(0.65 0.04 240 / 0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Corner light ray — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "35vw",
          height: "35vh",
          background:
            "linear-gradient(315deg, oklch(0.5 0.06 285 / 0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo mark — geometric N emblem */}
        <div className="splash-logo-mark" style={{ marginBottom: "1.5rem" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="NOCTURNE emblem"
          >
            {/* Outer diamond frame */}
            <polygon
              points="24,2 46,24 24,46 2,24"
              stroke="oklch(0.75 0.04 240)"
              strokeWidth="1"
              fill="none"
              opacity="0.7"
            />
            {/* Inner diamond */}
            <polygon
              points="24,8 40,24 24,40 8,24"
              stroke="oklch(0.75 0.04 240)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />
            {/* Stylized N */}
            <path
              d="M17 32 L17 16 L31 32 L31 16"
              stroke="oklch(0.92 0 0)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* NOCTURNE wordmark */}
        <h1
          className="splash-brand-name"
          style={{
            fontFamily: "var(--font-display), serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2.8rem, 8vw, 6rem)",
            color: "oklch(0.95 0 0)",
            letterSpacing: "0.5em",
            lineHeight: 1,
            margin: 0,
            paddingRight: "0.5em" /* compensate letter-spacing on last char */,
            textTransform: "uppercase",
          }}
        >
          NOCTURNE
        </h1>

        {/* Platinum line */}
        <div
          style={{
            width: "220px",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.75 0.04 240) 30%, oklch(0.85 0.02 240) 50%, oklch(0.75 0.04 240) 70%, transparent 100%)",
            margin: "1.4rem 0 1.1rem",
            overflow: "hidden",
          }}
        >
          <div
            className="splash-line"
            style={{
              width: "100%",
              height: "100%",
              background: "inherit",
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="splash-tagline"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.6rem",
            fontWeight: 400,
            letterSpacing: "0.45em",
            color: "oklch(0.6 0 0)",
            textTransform: "uppercase",
            margin: 0,
            paddingRight: "0.45em",
          }}
        >
          MAISON DE LUXE
        </p>
      </div>
    </div>
  );
}
