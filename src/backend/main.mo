import List "mo:core/List";
import Types "types/product-catalog";
import ProductCatalogApi "mixins/product-catalog-api";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

actor {
  // ── Stable State ──────────────────────────────────────────────────────────
  let products = List.empty<Types.Product>();
  let collections = List.empty<Types.Collection>();
  let lookbookEntries = List.empty<Types.LookbookEntry>();
  let collaborations = List.empty<Types.Collaboration>();
  let contactMessages = List.empty<Types.ContactMessage>();
  var nextProductId : Nat = 0;
  var nextCollectionId : Nat = 0;
  var nextLookbookEntryId : Nat = 0;
  var nextCollaborationId : Nat = 0;
  let nextContactMessageId : Nat = 0;

  // ── Sample Data Initialisation ────────────────────────────────────────────
  // Helper: encode a URL string as a Blob (ExternalBlob = Blob)
  func url(u : Text) : Blob { u.encodeUtf8() };

  // Collections
  let col0 : Types.Collection = {
    id = 0;
    name = "The Heritage Collection";
    description = "Rooted in tradition, crafted for the modern aristocrat. Each piece in The Heritage Collection draws from centuries of tailoring mastery, rendered in the finest wools and cashmeres sourced from the Scottish Highlands.";
    coverImage = url("https://picsum.photos/seed/heritage-cover/1200/800");
    productIds = [0, 1, 2, 3];
  };
  let col1 : Types.Collection = {
    id = 1;
    name = "Evening Atelier";
    description = "An ode to the glamour of the golden age. Evening Atelier presents couture-level gowns, silk-draped suits, and embellished separates conceived for the grandest occasions — from private galas to gallery openings.";
    coverImage = url("https://picsum.photos/seed/evening-cover/1200/800");
    productIds = [4, 5, 6];
  };
  let col2 : Types.Collection = {
    id = 2;
    name = "Maison Classics";
    description = "Timeless silhouettes that define the Maison Élite wardrobe. From the signature belted trench to the impeccably structured blazer, these are the foundational pieces that endure beyond any season.";
    coverImage = url("https://picsum.photos/seed/classics-cover/1200/800");
    productIds = [7, 8, 9];
  };

  collections.add(col0);
  collections.add(col1);
  collections.add(col2);
  nextCollectionId := 3;

  // Products — Heritage Collection
  products.add({
    id = 0;
    name = "The Marlborough Overcoat";
    description = "A masterwork in double-faced cashmere, the Marlborough drapes with aristocratic authority. Hand-finished lapels, horn buttons, and a structured shoulder define its unmistakable silhouette.";
    price = 425000; // $4,250
    category = "Coats";
    images = [
      url("https://picsum.photos/seed/marlborough-1/800/1100"),
      url("https://picsum.photos/seed/marlborough-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L", "XL"];
    colors = ["Ivory Cream", "Charcoal", "Camel"];
    material = "Double-faced cashmere, horn buttons";
    availability = true;
    isFeatured = true;
    createdAt = 1_700_000_000_000_000_000;
  });
  products.add({
    id = 1;
    name = "The Devonshire Tweed Blazer";
    description = "Woven in a heritage herringbone tweed by the last remaining mill in Yorkshire, this blazer is lined in ivory silk and finished with leather-bound buttonholes. Quintessentially British, uncompromisingly refined.";
    price = 189500; // $1,895
    category = "Blazers";
    images = [
      url("https://picsum.photos/seed/devonshire-1/800/1100"),
      url("https://picsum.photos/seed/devonshire-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    colors = ["Autumn Tweed", "Forest Green Tweed"];
    material = "Yorkshire herringbone tweed, silk lining";
    availability = true;
    isFeatured = true;
    createdAt = 1_700_000_000_000_000_000;
  });
  products.add({
    id = 2;
    name = "The Pemberton Wool Suit";
    description = "Cut from a super-160s wool, the Pemberton suit is tailored in a single-button silhouette with a suppressed waist and elongated jacket. A portrait of understated power.";
    price = 345000; // $3,450
    category = "Suits";
    images = [
      url("https://picsum.photos/seed/pemberton-1/800/1100"),
      url("https://picsum.photos/seed/pemberton-2/800/1100"),
    ];
    sizes = ["S", "M", "L", "XL"];
    colors = ["Navy", "Charcoal", "Champagne"];
    material = "Super-160s wool, silk lining";
    availability = true;
    isFeatured = false;
    createdAt = 1_700_000_000_000_000_000;
  });
  products.add({
    id = 3;
    name = "The Ashford Cashmere Turtleneck";
    description = "Knitted from Grade-A Mongolian cashmere in a relaxed, ribbed silhouette. An essential of the heritage wardrobe, worn alone or beneath the Marlborough Overcoat.";
    price = 62000; // $620
    category = "Knitwear";
    images = [
      url("https://picsum.photos/seed/ashford-1/800/1100"),
      url("https://picsum.photos/seed/ashford-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    colors = ["Oatmeal", "Ivory", "Slate Grey", "Burgundy"];
    material = "Grade-A Mongolian cashmere";
    availability = true;
    isFeatured = true;
    createdAt = 1_700_000_000_000_000_000;
  });

  // Products — Evening Atelier
  products.add({
    id = 4;
    name = "The Élise Silk Gown";
    description = "Sculpted from duchess satin with a floor-length bias cut, the Élise gown moves with breathtaking fluidity. A low back, covered buttons, and a sweeping train make this the definitive statement piece for black-tie occasions.";
    price = 385000; // $3,850
    category = "Gowns";
    images = [
      url("https://picsum.photos/seed/elise-1/800/1100"),
      url("https://picsum.photos/seed/elise-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L"];
    colors = ["Champagne", "Midnight Black", "Deep Garnet"];
    material = "Duchess satin, French seams";
    availability = true;
    isFeatured = true;
    createdAt = 1_700_000_000_000_000_000;
  });
  products.add({
    id = 5;
    name = "The Versailles Velvet Blazer";
    description = "Crushed midnight-blue velvet with a peak lapel and gold satin lining. The Versailles blazer is the pinnacle of evening dressing for those who command a room without raising their voice.";
    price = 145000; // $1,450
    category = "Blazers";
    images = [
      url("https://picsum.photos/seed/versailles-1/800/1100"),
      url("https://picsum.photos/seed/versailles-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L", "XL"];
    colors = ["Midnight Blue", "Emerald", "Bordeaux"];
    material = "Crushed velvet, gold satin lining";
    availability = true;
    isFeatured = false;
    createdAt = 1_700_000_000_000_000_000;
  });
  products.add({
    id = 6;
    name = "The Lumière Beaded Dress";
    description = "Hand-beaded in Paris over forty hours, the Lumière dress captures light with every movement. A column silhouette in ivory silk organza, adorned with thousands of individually sewn crystals and seed pearls.";
    price = 450000; // $4,500
    category = "Dresses";
    images = [
      url("https://picsum.photos/seed/lumiere-1/800/1100"),
      url("https://picsum.photos/seed/lumiere-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L"];
    colors = ["Ivory", "Blush Rose"];
    material = "Silk organza, hand-applied crystals and seed pearls";
    availability = true;
    isFeatured = true;
    createdAt = 1_700_000_000_000_000_000;
  });

  // Products — Maison Classics
  products.add({
    id = 7;
    name = "The Belted Heritage Trench";
    description = "The Maison Élite trench reinterpreted for contemporary dressing. A tightly woven Egyptian cotton gabardine, storm guard, and brass D-ring belt create the iconic silhouette that defines the house's legacy.";
    price = 149500; // $1,495
    category = "Coats";
    images = [
      url("https://picsum.photos/seed/trench-1/800/1100"),
      url("https://picsum.photos/seed/trench-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    colors = ["Honey Camel", "Ivory", "Storm Grey"];
    material = "Egyptian cotton gabardine, brass hardware";
    availability = true;
    isFeatured = true;
    createdAt = 1_700_000_000_000_000_000;
  });
  products.add({
    id = 8;
    name = "The Constance Wool Dress";
    description = "A column dress in boiled Merino wool with a discreet side zip and midi length. Worn from the boardroom to dinner, the Constance is the modern woman's power piece.";
    price = 89500; // $895
    category = "Dresses";
    images = [
      url("https://picsum.photos/seed/constance-1/800/1100"),
      url("https://picsum.photos/seed/constance-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L", "XL"];
    colors = ["Black", "Ivory", "Burgundy", "Navy"];
    material = "Boiled Merino wool";
    availability = true;
    isFeatured = false;
    createdAt = 1_700_000_000_000_000_000;
  });
  products.add({
    id = 9;
    name = "The Maison Silk Shirt";
    description = "Woven from 22-momme mulberry silk with mother-of-pearl buttons and a relaxed, draping fit. The Maison Silk Shirt is the quiet luxury staple that elevates any ensemble.";
    price = 42500; // $425
    category = "Tops";
    images = [
      url("https://picsum.photos/seed/silk-shirt-1/800/1100"),
      url("https://picsum.photos/seed/silk-shirt-2/800/1100"),
    ];
    sizes = ["XS", "S", "M", "L", "XL"];
    colors = ["Ivory White", "Blush Pink", "Slate Blue", "Champagne"];
    material = "22-momme mulberry silk, mother-of-pearl buttons";
    availability = true;
    isFeatured = false;
    createdAt = 1_700_000_000_000_000_000;
  });
  nextProductId := 10;

  // Lookbook Entries
  lookbookEntries.add({
    id = 0;
    title = "Autumn in Paris";
    description = "As the chestnuts turn gold along the Boulevard Saint-Germain, we find our muse wrapped in the Marlborough Overcoat, the cobblestones of the 6th arrondissement beneath her feet. This season is a study in the poetry of impermanence — beauty that burns brightest before it fades.";
    coverImage = url("https://picsum.photos/seed/paris-cover/1200/800");
    images = [
      url("https://picsum.photos/seed/paris-1/1200/800"),
      url("https://picsum.photos/seed/paris-2/1200/800"),
      url("https://picsum.photos/seed/paris-3/800/1100"),
      url("https://picsum.photos/seed/paris-4/800/1100"),
    ];
    publishedAt = 1_696_000_000_000_000_000;
    tags = ["Autumn", "Paris", "Coats", "Heritage"];
  });
  lookbookEntries.add({
    id = 1;
    title = "The Modern Aristocrat";
    description = "Power dressing reimagined for the twenty-first century. In the panelled halls of a Scottish estate, our new tailoring collection finds its natural home. The Pemberton suit, the Devonshire blazer — pieces built for those who inherit rooms and command them in equal measure.";
    coverImage = url("https://picsum.photos/seed/aristocrat-cover/1200/800");
    images = [
      url("https://picsum.photos/seed/aristocrat-1/1200/800"),
      url("https://picsum.photos/seed/aristocrat-2/800/1100"),
      url("https://picsum.photos/seed/aristocrat-3/1200/800"),
    ];
    publishedAt = 1_698_000_000_000_000_000;
    tags = ["Tailoring", "Suits", "Heritage", "Power Dressing"];
  });
  lookbookEntries.add({
    id = 2;
    title = "Golden Hour";
    description = "Shot at the Villa d'Este as the last light falls across Lake Como, Golden Hour is a meditation on evening dressing at its most transcendent. The Élise gown, the Lumière dress — worn not for an audience, but for the singular pleasure of inhabiting beauty.";
    coverImage = url("https://picsum.photos/seed/golden-hour-cover/1200/800");
    images = [
      url("https://picsum.photos/seed/golden-hour-1/1200/800"),
      url("https://picsum.photos/seed/golden-hour-2/800/1100"),
      url("https://picsum.photos/seed/golden-hour-3/1200/800"),
      url("https://picsum.photos/seed/golden-hour-4/800/1100"),
    ];
    publishedAt = 1_700_000_000_000_000_000;
    tags = ["Evening", "Gowns", "Lake Como", "Golden Hour"];
  });
  nextLookbookEntryId := 3;

  // Collaborations
  collaborations.add({
    id = 0;
    title = "The Margot Campaign";
    description = "When Margot Bellamy steps into a room, the room rearranges itself around her. The icon and the house share a singular vocabulary: restraint, precision, and an unwillingness to explain themselves. The Margot Campaign is what happens when two perfect things find each other.";
    celebrity = "Margot Bellamy";
    campaign = "Autumn/Winter 2024";
    coverImage = url("https://picsum.photos/seed/margot-cover/1200/800");
    images = [
      url("https://picsum.photos/seed/margot-1/1200/800"),
      url("https://picsum.photos/seed/margot-2/800/1100"),
      url("https://picsum.photos/seed/margot-3/1200/800"),
    ];
    publishedAt = 1_697_000_000_000_000_000;
    quote = "There are houses, and then there is Maison Élite. This is the one I wear when nothing else will do.";
  });
  collaborations.add({
    id = 1;
    title = "Isabella & Maison Élite";
    description = "Countess Isabella Vanthorpe has been the quiet face of European elegance for three decades. Her collaboration with Maison Élite is not a campaign — it is a conversation between equals. Shot across her ancestral estate in Tuscany, the images speak in whispers.";
    celebrity = "Countess Isabella Vanthorpe";
    campaign = "The Heritage Edit 2024";
    coverImage = url("https://picsum.photos/seed/isabella-cover/1200/800");
    images = [
      url("https://picsum.photos/seed/isabella-1/1200/800"),
      url("https://picsum.photos/seed/isabella-2/800/1100"),
      url("https://picsum.photos/seed/isabella-3/1200/800"),
      url("https://picsum.photos/seed/isabella-4/800/1100"),
    ];
    publishedAt = 1_699_000_000_000_000_000;
    quote = "The Heritage Collection is everything I believe clothing should be — permanent, considered, and entirely without apology.";
  });
  collaborations.add({
    id = 2;
    title = "The Royale Edit";
    description = "For the Royale Edit, we partnered with Dame Vivienne Ashworth — actress, philanthropist, and the woman Vogue once described as 'the last true style authority.' Together we interpreted the Evening Atelier collection through her singular lens: glamour not as performance, but as a private act of self-possession.";
    celebrity = "Dame Vivienne Ashworth";
    campaign = "Evening Atelier 2024";
    coverImage = url("https://picsum.photos/seed/royale-cover/1200/800");
    images = [
      url("https://picsum.photos/seed/royale-1/1200/800"),
      url("https://picsum.photos/seed/royale-2/800/1100"),
      url("https://picsum.photos/seed/royale-3/1200/800"),
    ];
    publishedAt = 1_701_000_000_000_000_000;
    quote = "I have worn couture since I was nineteen. Maison Élite understands something the others have forgotten — that the finest clothes make you feel invisible and extraordinary at once.";
  });
  nextCollaborationId := 3;

  // ── Mixin Composition ─────────────────────────────────────────────────────
  include MixinObjectStorage();
  include ProductCatalogApi(
    products,
    collections,
    lookbookEntries,
    collaborations,
    contactMessages,
    nextProductId,
    nextCollectionId,
    nextLookbookEntryId,
    nextCollaborationId,
    nextContactMessageId
  );
};
