import type { backendInterface, ExternalBlob } from "../backend";

function makeBlob(url: string): ExternalBlob {
  return {
    getBytes: async () => new Uint8Array(),
    getDirectURL: () => url,
    withUploadProgress: (_onProgress) => makeBlob(url),
  } as ExternalBlob;
}

// ─── MENSWEAR ───────────────────────────────────────────────────────────────
const menswear = [
  {
    id: BigInt(0),
    name: "The Marlborough Overcoat",
    description:
      "A masterwork in double-faced cashmere, the Marlborough drapes with aristocratic authority. Hand-finished lapels, horn buttons, and a structured shoulder define its unmistakable silhouette.",
    price: BigInt(425000),
    category: "Menswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=800"),
      makeBlob("https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory Cream", "Charcoal", "Camel"],
    material: "Double-faced cashmere, horn buttons",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(1),
    name: "The Devonshire Tweed Blazer",
    description:
      "Woven in a heritage herringbone tweed by the last remaining mill in Yorkshire, this blazer is lined in ivory silk and finished with leather-bound buttonholes.",
    price: BigInt(189500),
    category: "Menswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"),
      makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Autumn Tweed", "Forest Green Tweed"],
    material: "Yorkshire herringbone tweed, silk lining",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(2),
    name: "The Pemberton Wool Suit",
    description:
      "Cut from a super-160s wool, the Pemberton suit is tailored in a single-button silhouette with a suppressed waist and elongated jacket.",
    price: BigInt(345000),
    category: "Menswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=800"),
      makeBlob("https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Charcoal", "Champagne"],
    material: "Super-160s wool, silk lining",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(3),
    name: "The Ashford Cashmere Turtleneck",
    description:
      "Knitted from Grade-A Mongolian cashmere in a relaxed, ribbed silhouette. An essential of the heritage wardrobe.",
    price: BigInt(62000),
    category: "Menswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800"),
      makeBlob("https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Oatmeal", "Ivory", "Slate Grey", "Burgundy"],
    material: "Grade-A Mongolian cashmere",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(10),
    name: "The Nightfall Dress Shirt",
    description:
      "Woven from 200-thread Egyptian cotton with a subtle bib front and mother-of-pearl studs. The definitive evening shirt.",
    price: BigInt(38500),
    category: "Menswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800"),
      makeBlob("https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800"),
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Ivory White", "Pale Blue", "Midnight Black"],
    material: "200-thread Egyptian cotton, mother-of-pearl studs",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700100000000000000"),
  },
  {
    id: BigInt(11),
    name: "The Ravello Wool Trousers",
    description:
      "Precision-cut high-rise trousers in a Super-120s flannel, finished with a double-pleat and turn-up hem. Heritage tailoring at its most distinguished.",
    price: BigInt(78000),
    category: "Menswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"),
      makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=800"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal Grey", "Navy", "Stone"],
    material: "Super-120s flannel wool",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700200000000000000"),
  },
];

// ─── WOMENSWEAR ──────────────────────────────────────────────────────────────
const womenswear = [
  {
    id: BigInt(8),
    name: "The Constance Silk Blouse",
    description:
      "A fluid blouse in 22-momme mulberry silk with a softly draped collar and concealed placket. Effortlessly refined.",
    price: BigInt(89500),
    category: "Womenswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=800"),
      makeBlob("https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Ivory", "Burgundy", "Navy"],
    material: "22-momme mulberry silk",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(9),
    name: "The Maison Tailored Blazer",
    description:
      "A sharp single-breasted women's blazer in a fine-grain wool crepe with padded shoulders and a cinched waist.",
    price: BigInt(42500),
    category: "Womenswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=800"),
      makeBlob("https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory White", "Blush Pink", "Slate Blue", "Champagne"],
    material: "Fine-grain wool crepe",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(12),
    name: "The Riviera Midi Skirt",
    description:
      "A fluid A-line midi skirt in heavyweight silk charmeuse. The gentle drape and bias cut create a silhouette of effortless sophistication.",
    price: BigInt(67500),
    category: "Womenswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800"),
      makeBlob("https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Onyx", "Champagne", "Deep Jade"],
    material: "Heavyweight silk charmeuse",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700300000000000000"),
  },
  {
    id: BigInt(13),
    name: "The Celeste Wool Trousers",
    description:
      "Wide-leg trousers in a fine bouclé wool blend with a high rise and side-seam pockets. Tailored for the modern heroine.",
    price: BigInt(74000),
    category: "Womenswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800"),
      makeBlob("https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ivory", "Camel", "Forest Green"],
    material: "Fine bouclé wool blend",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700400000000000000"),
  },
  {
    id: BigInt(14),
    name: "The Odessa Silk Dress",
    description:
      "A slip dress rendered in hand-washed silk satin, with a fluid bias cut and adjustable spaghetti straps. Day to night, effortlessly.",
    price: BigInt(95000),
    category: "Womenswear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"),
      makeBlob("https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Midnight", "Blush Rose"],
    material: "Hand-washed silk satin",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700500000000000000"),
  },
];

// ─── ACCESSORIES ─────────────────────────────────────────────────────────────
const accessories = [
  {
    id: BigInt(15),
    name: "The Nocturne Cashmere Scarf",
    description:
      "Woven in pure Grade-A cashmere and hand-fringed at each end. A quiet luxury that elevates every ensemble.",
    price: BigInt(18500),
    category: "Accessories",
    images: [
      makeBlob("https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800"),
      makeBlob("https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800"),
    ],
    sizes: ["One Size"],
    colors: ["Camel", "Charcoal", "Ivory", "Bordeaux"],
    material: "Grade-A cashmere",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700600000000000000"),
  },
  {
    id: BigInt(16),
    name: "The Maison Leather Belt",
    description:
      "Hand-stitched in full-grain calf leather with a polished silver-tone buckle engraved with the house monogram.",
    price: BigInt(24500),
    category: "Accessories",
    images: [
      makeBlob("https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800"),
      makeBlob("https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Dark Tan", "Cognac"],
    material: "Full-grain calf leather, silver-tone hardware",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700700000000000000"),
  },
  {
    id: BigInt(17),
    name: "The Sovereign Leather Gloves",
    description:
      "Seamless hairline-stitched gloves in peccary leather with a cashmere lining. A touch of aristocracy.",
    price: BigInt(32000),
    category: "Accessories",
    images: [
      makeBlob("https://images.unsplash.com/photo-1517002979599-80b98a47e2f8?w=800"),
      makeBlob("https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Dark Brown", "Oxblood"],
    material: "Peccary leather, cashmere lining",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700800000000000000"),
  },
  {
    id: BigInt(18),
    name: "The Atelier Wool Fedora",
    description:
      "Blocked from a single piece of Italian felt and finished with a grosgrain ribbon band. The hat that completes the look.",
    price: BigInt(28500),
    category: "Accessories",
    images: [
      makeBlob("https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800"),
      makeBlob("https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800"),
    ],
    sizes: ["S/M", "L/XL"],
    colors: ["Charcoal", "Camel", "Black"],
    material: "Italian felt, grosgrain ribbon",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700900000000000000"),
  },
];

// ─── EVENING WEAR ────────────────────────────────────────────────────────────
const eveningWear = [
  {
    id: BigInt(4),
    name: "The Élise Silk Gown",
    description:
      "Sculpted from duchess satin with a floor-length bias cut, the Élise gown moves with breathtaking fluidity.",
    price: BigInt(385000),
    category: "Evening Wear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"),
      makeBlob("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Champagne", "Midnight Black", "Deep Garnet"],
    material: "Duchess satin, French seams",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(5),
    name: "The Versailles Velvet Blazer",
    description:
      "Crushed midnight-blue velvet with a peak lapel and gold satin lining.",
    price: BigInt(145000),
    category: "Evening Wear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=800"),
      makeBlob("https://images.unsplash.com/photo-1555069519-127aadecd47a?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Midnight Blue", "Emerald", "Bordeaux"],
    material: "Crushed velvet, gold satin lining",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(6),
    name: "The Lumière Beaded Dress",
    description:
      "Hand-beaded in Paris over forty hours, the Lumière dress captures light with every movement.",
    price: BigInt(450000),
    category: "Evening Wear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"),
      makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Blush Rose"],
    material: "Silk organza, hand-applied crystals and seed pearls",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(19),
    name: "The Grand Palais Tuxedo",
    description:
      "A peak-lapel tuxedo in a silk-wool barathea with grosgrain facing and a single-button closure. The pinnacle of black tie.",
    price: BigInt(495000),
    category: "Evening Wear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1555069519-127aadecd47a?w=800"),
      makeBlob("https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=800"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Black", "Midnight Navy"],
    material: "Silk-wool barathea, grosgrain facing",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1701000000000000000"),
  },
  {
    id: BigInt(20),
    name: "The Midnight Silk Gown",
    description:
      "A column gown in heavy silk crêpe with a deep cowl back and a fluid train. Reserved for the most memorable evenings.",
    price: BigInt(520000),
    category: "Evening Wear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"),
      makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Midnight Black", "Deep Sapphire", "Champagne"],
    material: "Heavy silk crêpe",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1701100000000000000"),
  },
];

// ─── OUTERWEAR ───────────────────────────────────────────────────────────────
const outerwear = [
  {
    id: BigInt(7),
    name: "The Belted Heritage Trench",
    description:
      "The NOCTURNE trench reinterpreted for contemporary dressing. Egyptian cotton gabardine with storm guard and brass D-ring belt.",
    price: BigInt(149500),
    category: "Outerwear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1548624313-0396a7194277?w=800"),
      makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Honey Camel", "Ivory", "Storm Grey"],
    material: "Egyptian cotton gabardine, brass hardware",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1700000000000000000"),
  },
  {
    id: BigInt(21),
    name: "The Midnight Wool Overcoat",
    description:
      "A statement-length overcoat in a double-faced cashmere-wool blend. Structured yet fluid, with concealed button closures and a full silk lining.",
    price: BigInt(395000),
    category: "Outerwear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"),
      makeBlob("https://images.unsplash.com/photo-1548624313-0396a7194277?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Jet Black", "Charcoal", "Deep Forest"],
    material: "Double-faced cashmere-wool, silk lining",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1701200000000000000"),
  },
  {
    id: BigInt(22),
    name: "The Dusk Cape",
    description:
      "A sculptural cape in boiled wool, falling to the knee with a single hook-and-eye closure at the throat. Drama distilled to its essence.",
    price: BigInt(175000),
    category: "Outerwear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"),
      makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"),
    ],
    sizes: ["XS/S", "M/L", "XL/XXL"],
    colors: ["Midnight Black", "Deep Plum", "Camel"],
    material: "Boiled wool, leather hardware",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1701300000000000000"),
  },
  {
    id: BigInt(23),
    name: "The Contessa Velvet Wrap",
    description:
      "A generous evening wrap in devore silk velvet, lined in hammered satin. The most elegant layer in any wardrobe.",
    price: BigInt(148000),
    category: "Outerwear",
    images: [
      makeBlob("https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"),
      makeBlob("https://images.unsplash.com/photo-1548624313-0396a7194277?w=800"),
    ],
    sizes: ["One Size"],
    colors: ["Midnight Navy", "Bordeaux", "Emerald"],
    material: "Devore silk velvet, hammered satin lining",
    availability: true,
    isFeatured: false,
    createdAt: BigInt("1701400000000000000"),
  },
];

// ─── NEW ARRIVALS ─────────────────────────────────────────────────────────────
const newArrivals = [
  {
    id: BigInt(24),
    name: "The Nocturne Signature Coat",
    description:
      "Our latest icon: an elongated cocoon coat in virgin wool with hand-sewn hidden placket and sculptural collar. The definitive piece of the season.",
    price: BigInt(580000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"),
      makeBlob("https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ebony", "Platinum", "Bordeaux"],
    material: "Virgin wool, silk lining",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714000000000000000"),
  },
  {
    id: BigInt(25),
    name: "The Nocturne Evening Gown",
    description:
      "This season's most anticipated drop — a floor-length gown in duchess satin with an architectural corseted bodice and cascading skirt.",
    price: BigInt(620000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"),
      makeBlob("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Midnight", "Deep Garnet"],
    material: "Duchess satin, boning structure",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714100000000000000"),
  },
  {
    id: BigInt(26),
    name: "The Nocturne Tailored Suit",
    description:
      "Freshly arrived: a two-piece suit in a Super-180s merino wool with a razor-sharp silhouette. Power dressing elevated.",
    price: BigInt(465000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=800"),
      makeBlob("https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight Black", "Charcoal", "Deep Navy"],
    material: "Super-180s merino wool",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714200000000000000"),
  },
  {
    id: BigInt(27),
    name: "The Nocturne Silk Blouse",
    description:
      "Just landed — a gossamer silk blouse with a sculptural bow collar and long, ruffled cuffs. Understated yet unmistakable.",
    price: BigInt(115000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=800"),
      makeBlob("https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Pale Blush", "Ecru"],
    material: "Gossamer silk chiffon",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714300000000000000"),
  },
  {
    id: BigInt(28),
    name: "The Nocturne Leather Gloves",
    description:
      "New for the season — calfskin gloves with a three-point stitch and a deep fold-back cuff lined in platinum silk.",
    price: BigInt(42000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1517002979599-80b98a47e2f8?w=800"),
      makeBlob("https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Oxblood", "Tan"],
    material: "Calfskin, platinum silk lining",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714400000000000000"),
  },
  {
    id: BigInt(29),
    name: "The Nocturne Cashmere Turtleneck",
    description:
      "Our season-defining knit — a fine-gauge cashmere turtleneck in our new elongated fit. The perfect foundation.",
    price: BigInt(88000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800"),
      makeBlob("https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Jet Black", "Ecru", "Deep Plum"],
    material: "Fine-gauge cashmere",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714500000000000000"),
  },
  {
    id: BigInt(30),
    name: "The Nocturne Midi Skirt",
    description:
      "New this season — a bias-cut midi skirt in hammered silk satin that catches the light with every step.",
    price: BigInt(98000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800"),
      makeBlob("https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Midnight Black", "Champagne", "Bordeaux"],
    material: "Hammered silk satin",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714600000000000000"),
  },
  {
    id: BigInt(31),
    name: "The Nocturne Trench",
    description:
      "New season — our deconstructed trench in waxed cotton gabardine with a storm flap and removable wool liner.",
    price: BigInt(265000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1548624313-0396a7194277?w=800"),
      makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Storm Grey", "Honey Camel", "Black"],
    material: "Waxed cotton gabardine, removable wool liner",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714700000000000000"),
  },
  {
    id: BigInt(32),
    name: "The Nocturne Crystal Dress",
    description:
      "An astonishing debut — hand-encrusted with over three thousand Swarovski crystals on a silk tulle base. The most coveted evening piece of the year.",
    price: BigInt(890000),
    category: "New Arrivals",
    images: [
      makeBlob("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800"),
      makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Crystal Clear", "Midnight Onyx"],
    material: "Silk tulle, Swarovski crystals",
    availability: true,
    isFeatured: true,
    createdAt: BigInt("1714800000000000000"),
  },
];

const products = [
  ...menswear,
  ...womenswear,
  ...accessories,
  ...eveningWear,
  ...outerwear,
  ...newArrivals,
];

const collections = [
  {
    id: BigInt(0),
    name: "Menswear",
    description:
      "Precision tailoring and elevated essentials for the discerning gentleman — from bespoke suits to heritage knitwear.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=1200"),
    productIds: menswear.map((p) => p.id),
  },
  {
    id: BigInt(1),
    name: "Womenswear",
    description:
      "Refined silhouettes and couture-quality fabrications for the modern woman of substance and style.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=1200"),
    productIds: womenswear.map((p) => p.id),
  },
  {
    id: BigInt(2),
    name: "Accessories",
    description:
      "Handcrafted accessories that complete the composition — scarves, belts, gloves, and hats of exquisite provenance.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=1200"),
    productIds: accessories.map((p) => p.id),
  },
  {
    id: BigInt(3),
    name: "Evening Wear",
    description:
      "For the grandest occasions. Gowns, tuxedos, and velvet blazers conceived for moments that demand nothing less than extraordinary.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200"),
    productIds: eveningWear.map((p) => p.id),
  },
  {
    id: BigInt(4),
    name: "Outerwear",
    description:
      "Coats, capes, and wraps of uncompromising quality — outerwear as architecture, designed to define the silhouette.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200"),
    productIds: outerwear.map((p) => p.id),
  },
  {
    id: BigInt(5),
    name: "New Arrivals",
    description:
      "The most anticipated pieces of the season, now available. Be the first to wear NOCTURNE's latest expressions.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200"),
    productIds: newArrivals.map((p) => p.id),
  },
];

const lookbookEntries = [
  {
    id: BigInt(0),
    title: "Autumn in Paris",
    description:
      "As the chestnuts turn gold along the Boulevard Saint-Germain, we find our muse wrapped in the Marlborough Overcoat.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200"),
    images: [
      makeBlob("https://images.unsplash.com/photo-1548624313-0396a7194277?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=800"),
      makeBlob("https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800"),
    ],
    publishedAt: BigInt("1696000000000000000"),
    tags: ["Autumn", "Paris", "Coats", "Heritage"],
  },
  {
    id: BigInt(1),
    title: "The Modern Aristocrat",
    description:
      "Power dressing reimagined for the twenty-first century in the panelled halls of a Scottish estate.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1594938298603-c8148c4b4057?w=1200"),
    images: [
      makeBlob("https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800"),
      makeBlob("https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200"),
    ],
    publishedAt: BigInt("1698000000000000000"),
    tags: ["Tailoring", "Suits", "Heritage", "Power Dressing"],
  },
  {
    id: BigInt(2),
    title: "Golden Hour",
    description:
      "Shot at the Villa d'Este as the last light falls across Lake Como — evening dressing at its most transcendent.",
    coverImage: makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200"),
    images: [
      makeBlob("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"),
      makeBlob("https://images.unsplash.com/photo-1555069519-127aadecd47a?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=800"),
    ],
    publishedAt: BigInt("1700000000000000000"),
    tags: ["Evening", "Gowns", "Lake Como", "Golden Hour"],
  },
];

const collaborations = [
  {
    id: BigInt(0),
    title: "The Margot Campaign",
    description:
      "When Margot Bellamy steps into a room, the room rearranges itself around her.",
    celebrity: "Margot Bellamy",
    campaign: "Autumn/Winter 2024",
    coverImage: makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200"),
    images: [
      makeBlob("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800"),
      makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200"),
    ],
    publishedAt: BigInt("1697000000000000000"),
    quote:
      "There are houses, and then there is NOCTURNE. This is the one I wear when nothing else will do.",
  },
  {
    id: BigInt(1),
    title: "Isabella & NOCTURNE",
    description:
      "Countess Isabella Vanthorpe has been the quiet face of European elegance for three decades.",
    celebrity: "Countess Isabella Vanthorpe",
    campaign: "The Heritage Edit 2024",
    coverImage: makeBlob("https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=1200"),
    images: [
      makeBlob("https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800"),
      makeBlob("https://images.unsplash.com/photo-1594938240161-e674b51547f7?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800"),
    ],
    publishedAt: BigInt("1699000000000000000"),
    quote:
      "The Heritage Collection is everything I believe clothing should be — permanent, considered, and entirely without apology.",
  },
  {
    id: BigInt(2),
    title: "The Royale Edit",
    description:
      "For the Royale Edit, we partnered with Dame Vivienne Ashworth — actress, philanthropist, and the last true style authority.",
    celebrity: "Dame Vivienne Ashworth",
    campaign: "Evening Atelier 2024",
    coverImage: makeBlob("https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=1200"),
    images: [
      makeBlob("https://images.unsplash.com/photo-1555069519-127aadecd47a?w=1200"),
      makeBlob("https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800"),
      makeBlob("https://images.unsplash.com/photo-1600091166971-7f9faad6c498?w=1200"),
    ],
    publishedAt: BigInt("1701000000000000000"),
    quote:
      "I have worn couture since I was nineteen. NOCTURNE understands something the others have forgotten.",
  },
];

export const mockBackend: backendInterface = {
  // biome-ignore lint/suspicious/noExplicitAny: internal object-storage plumbing required by backendInterface
  _immutableObjectStorageBlobsAreLive: undefined as any,
  // biome-ignore lint/suspicious/noExplicitAny: internal object-storage plumbing required by backendInterface
  _immutableObjectStorageBlobsToDelete: undefined as any,
  // biome-ignore lint/suspicious/noExplicitAny: internal object-storage plumbing required by backendInterface
  _immutableObjectStorageConfirmBlobDeletion: undefined as any,
  // biome-ignore lint/suspicious/noExplicitAny: internal object-storage plumbing required by backendInterface
  _immutableObjectStorageCreateCertificate: undefined as any,
  // biome-ignore lint/suspicious/noExplicitAny: internal object-storage plumbing required by backendInterface
  _immutableObjectStorageRefillCashier: undefined as any,
  // biome-ignore lint/suspicious/noExplicitAny: internal object-storage plumbing required by backendInterface
  _immutableObjectStorageUpdateGatewayPrincipals: undefined as any,
  filterProducts: async (_filter) => products,
  getCollaborationById: async (id) =>
    collaborations.find((c) => c.id === id) ?? null,
  getCollaborations: async () => collaborations,
  getCollectionById: async (id) =>
    collections.find((c) => c.id === id) ?? null,
  getCollections: async () => collections,
  getFeaturedProducts: async () => products.filter((p) => p.isFeatured),
  getLookbookEntries: async () => lookbookEntries,
  getLookbookEntryById: async (id) =>
    lookbookEntries.find((e) => e.id === id) ?? null,
  getProductById: async (id) => products.find((p) => p.id === id) ?? null,
  getProducts: async () => products,
  getProductsByCollection: async (collectionId) => {
    const col = collections.find((c) => c.id === collectionId);
    if (!col) return [];
    return products.filter((p) => col.productIds.includes(p.id));
  },
  searchProducts: async (query) =>
    products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    ),
  submitContact: async (_name, _email, _subject, _message) => ({
    __kind__: "ok",
    ok: "Thank you for your message. We will be in touch shortly.",
  }),
};
