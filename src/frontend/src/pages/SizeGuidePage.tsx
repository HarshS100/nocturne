import { Layout } from "@/components/layout/Layout";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useState } from "react";

type Gender = "women" | "men";

const WOMEN_SIZES = [
  {
    size: "XS",
    chest: "80 / 31.5",
    waist: "62 / 24.4",
    hip: "88 / 34.6",
    length: "158–163",
  },
  {
    size: "S",
    chest: "84 / 33.1",
    waist: "66 / 26.0",
    hip: "92 / 36.2",
    length: "163–168",
  },
  {
    size: "M",
    chest: "88 / 34.6",
    waist: "70 / 27.6",
    hip: "96 / 37.8",
    length: "165–170",
  },
  {
    size: "L",
    chest: "94 / 37.0",
    waist: "76 / 29.9",
    hip: "102 / 40.2",
    length: "168–173",
  },
  {
    size: "XL",
    chest: "100 / 39.4",
    waist: "82 / 32.3",
    hip: "108 / 42.5",
    length: "170–175",
  },
];

const MEN_SIZES = [
  {
    size: "XS",
    chest: "86 / 33.9",
    waist: "72 / 28.3",
    hip: "88 / 34.6",
    length: "170–175",
  },
  {
    size: "S",
    chest: "92 / 36.2",
    waist: "78 / 30.7",
    hip: "94 / 37.0",
    length: "175–180",
  },
  {
    size: "M",
    chest: "98 / 38.6",
    waist: "84 / 33.1",
    hip: "100 / 39.4",
    length: "178–183",
  },
  {
    size: "L",
    chest: "104 / 40.9",
    waist: "90 / 35.4",
    hip: "106 / 41.7",
    length: "181–186",
  },
  {
    size: "XL",
    chest: "110 / 43.3",
    waist: "96 / 37.8",
    hip: "112 / 44.1",
    length: "183–188",
  },
];

const TIPS = [
  {
    title: "Chest",
    description:
      "Measure around the fullest part of your chest, keeping the tape parallel to the floor and your arms relaxed at your sides.",
  },
  {
    title: "Waist",
    description:
      "Measure around your natural waistline — the narrowest point of your torso, typically an inch above the navel.",
  },
  {
    title: "Hip",
    description:
      "Stand with feet together. Measure around the fullest part of your hips and seat, approximately 20cm below the waistline.",
  },
  {
    title: "Length",
    description:
      "Stand in bare feet. Measure from the crown of the head to the floor. Our length ranges indicate optimal fit for each size.",
  },
];

const CARE_TIPS = [
  "Maison Élite pieces are cut generously — if between sizes, we recommend sizing down for a tailored silhouette.",
  "Cashmere and fine wool should be dry-cleaned or gently hand-washed in cold water with a specialist detergent.",
  "Silk and satin garments require dry cleaning only. Always store folded in acid-free tissue.",
  "Allow your leather pieces to breathe — store on padded hangers, away from direct sunlight.",
  "Should your piece require alteration, consult our atelier directly at hello@maisonelite.com.",
];

export function SizeGuidePage() {
  const [gender, setGender] = useState<Gender>("women");
  const sizes = gender === "women" ? WOMEN_SIZES : MEN_SIZES;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-muted/30 py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <AnimatedSection variant="fade-in">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Atelier Reference
            </p>
            <h1 className="font-display text-5xl md:text-6xl text-foreground leading-tight mb-6">
              Size Guide
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Our pieces are cut to a European fit — precise, elevated, and made
              to flatter the natural form. We recommend taking measurements over
              light undergarments for the most accurate result.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* How to measure */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSection variant="slide-in-up">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2 text-center">
              How to Measure
            </h2>
            <div className="w-8 h-0.5 bg-primary mx-auto mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {TIPS.map((tip, i) => (
                <div
                  key={tip.title}
                  className="fade-in"
                  style={{
                    animationDelay: `${i * 80}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-display text-4xl text-primary/20 leading-none select-none">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base text-foreground mb-1">
                        {tip.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Size chart */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <AnimatedSection variant="slide-in-up">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2 text-center">
              Size Charts
            </h2>
            <div className="w-8 h-0.5 bg-primary mx-auto mb-10" />

            {/* Gender tabs */}
            <div className="flex justify-center gap-0 mb-10 border border-border w-fit mx-auto">
              {(["women", "men"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  data-ocid={`size_guide.${g}.tab`}
                  onClick={() => setGender(g)}
                  className={`px-10 py-3 font-display text-xs tracking-[0.2em] uppercase transition-all duration-200 ${
                    gender === g
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {g === "women" ? "Women's" : "Men's"}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    {[
                      "Size",
                      "Chest (cm / in)",
                      "Waist (cm / in)",
                      "Hip (cm / in)",
                      "Height (cm)",
                    ].map((h) => (
                      <th
                        key={h}
                        className="font-display text-xs tracking-widest uppercase py-4 px-5 text-left font-normal border-r border-primary-foreground/20 last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((row, i) => (
                    <tr
                      key={row.size}
                      className={`border-b border-border transition-colors duration-150 hover:bg-muted/40 ${i % 2 === 0 ? "bg-card" : "bg-background"}`}
                    >
                      <td className="font-display text-sm py-4 px-5 text-primary font-semibold">
                        {row.size}
                      </td>
                      <td className="font-body text-sm py-4 px-5 text-foreground tabular-nums">
                        {row.chest}
                      </td>
                      <td className="font-body text-sm py-4 px-5 text-foreground tabular-nums">
                        {row.waist}
                      </td>
                      <td className="font-body text-sm py-4 px-5 text-foreground tabular-nums">
                        {row.hip}
                      </td>
                      <td className="font-body text-sm py-4 px-5 text-muted-foreground">
                        {row.length}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="font-body text-xs text-muted-foreground mt-5 text-center">
              All measurements are in centimetres / inches. For bespoke
              tailoring, contact our atelier directly.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Care & Fit */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatedSection variant="slide-in-up">
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2 text-center">
              Care &amp; Fit Notes
            </h2>
            <div className="w-8 h-0.5 bg-primary mx-auto mb-10" />
            <ul className="space-y-5">
              {CARE_TIPS.map((tip) => (
                <li key={tip} className="flex gap-4 items-start">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {tip}
                  </p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
