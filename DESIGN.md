# Design Brief

## Direction

NOCTURNE — Ultra-refined minimalist luxury fashion brand competing with Saint Laurent and Diptyque. Deep charcoal gallery aesthetic with contemporary platinum accents.

## Tone

Gallery minimalism: understated luxury over ornament. Every interaction intentional, nothing accidental. Dark mode for premium, intimate browsing.

## Differentiation

Minimalistic geometric lettermark logo + full-screen splash screen with elegant fade-in animations + section-wise product browsing with magnetic hover states + restrained parallax on hero only.

## Color Palette

| Token      | OKLCH          | Role                      |
|------------|----------------|---------------------------|
| background | 0.12 0 0       | Deep charcoal gallery base |
| foreground | 0.95 0 0       | Off-white text            |
| card       | 0.16 0 0       | Elevated dark surfaces    |
| primary    | 0.75 0.04 240  | Platinum/silver accent    |
| accent     | 0.4 0.08 285   | Deep plum secondary       |
| muted      | 0.22 0.02 240  | Dark neutral sections     |

## Typography

- Display: Instrument Serif (italic) — hero, section headings, brand name, elegant elegance
- Body: DM Sans — paragraphs, product descriptions, clean modern labels
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-semibold`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base md:text-lg`

## Elevation & Depth

Layered dark surfaces with sharp contrast; elevated shadows on product cards (soft platinum glow), minimal borders on dark cards. Surface hierarchy through background elevation (card vs. muted) with subtle blue-toned shadows.

## Structural Zones

| Zone    | Background              | Border                 | Notes                        |
|---------|-------------------------|------------------------|------------------------------|
| Header  | card (dark elevated)    | border-b subtle        | Minimal navigation + logo    |
| Content | background (charcoal)   | —                      | Alternates card/muted sec.   |
| Footer  | muted (darker neutral)  | border-t subtle        | Links, social, contact info  |

## Spacing & Rhythm

Section padding `py-16 md:py-24`, generous margins between product cards (gap-8), micro-spacing (4–8px) within groups. Gallery-like breathing room throughout.

## Component Patterns

- Buttons: rounded-md, platinum primary, soft elevation on hover, smooth transition
- Cards: rounded-md, card background, subtle border, hover lift + soft shadow
- Badges: rounded-full, muted background, off-white text

## Motion

- Entrance: splash screen (logo fade-in 4s + brand slide-in 4s with 0.3s delay), section fade-in on scroll
- Hover: product cards lift +4px shadow + subtle scale 1.02, buttons fade to deeper platinum
- Decorative: parallax float on hero only (restrained), smooth transitions on all interactive elements (0.3s cubic-bezier)

## Constraints

- Dark mode only — no light mode
- Serif italic for headings (Instrument Serif), clean sans for body (DM Sans)
- Platinum accents used sparingly: CTAs, hover states, highlights only
- Animations refined and subtle (no bounces, no rapid motion)
- No unnecessary decorative elements

## Signature Detail

Full-screen splash screen with animated logo + brand name entrance, then dissolves to homepage. Creates premium first impression and establishes brand identity instantly.
