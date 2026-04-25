import List "mo:core/List";
import Text "mo:core/Text";
import Types "../types/product-catalog";

module {
  // ── Products ──────────────────────────────────────────────────────────────

  public func getProducts(
    products : List.List<Types.Product>
  ) : [Types.Product] {
    products.toArray()
  };

  public func getProductById(
    products : List.List<Types.Product>,
    id : Types.ProductId
  ) : ?Types.Product {
    products.find(func(p) { p.id == id })
  };

  public func getProductsByCollection(
    products : List.List<Types.Product>,
    collections : List.List<Types.Collection>,
    collectionId : Types.CollectionId
  ) : [Types.Product] {
    let col = collections.find(func(c) { c.id == collectionId });
    switch (col) {
      case null { [] };
      case (?c) {
        products.filter(func(p) {
          let ids = c.productIds;
          ids.find(func(pid) { pid == p.id }) != null
        }).toArray()
      };
    }
  };

  public func getFeaturedProducts(
    products : List.List<Types.Product>
  ) : [Types.Product] {
    products.filter(func(p) { p.isFeatured }).toArray()
  };

  public func searchProducts(
    products : List.List<Types.Product>,
    searchQuery : Text
  ) : [Types.Product] {
    let q = searchQuery.toLower();
    products.filter(func(p) {
      p.name.toLower().contains(#text q) or
      p.description.toLower().contains(#text q) or
      p.category.toLower().contains(#text q) or
      p.material.toLower().contains(#text q)
    }).toArray()
  };

  public func filterProducts(
    products : List.List<Types.Product>,
    filter : Types.ProductFilter
  ) : [Types.Product] {
    products.filter(func(p) {
      let categoryMatch = switch (filter.category) {
        case null { true };
        case (?cat) { p.category == cat };
      };
      let minPriceMatch = switch (filter.minPrice) {
        case null { true };
        case (?min) { p.price >= min };
      };
      let maxPriceMatch = switch (filter.maxPrice) {
        case null { true };
        case (?max) { p.price <= max };
      };
      let sizeMatch = switch (filter.size) {
        case null { true };
        case (?sz) { p.sizes.find(func(s) { s == sz }) != null };
      };
      let colorMatch = switch (filter.color) {
        case null { true };
        case (?col) { p.colors.find(func(c) { c == col }) != null };
      };
      categoryMatch and minPriceMatch and maxPriceMatch and sizeMatch and colorMatch
    }).toArray()
  };

  // ── Collections ───────────────────────────────────────────────────────────

  public func getCollections(
    collections : List.List<Types.Collection>
  ) : [Types.Collection] {
    collections.toArray()
  };

  public func getCollectionById(
    collections : List.List<Types.Collection>,
    id : Types.CollectionId
  ) : ?Types.Collection {
    collections.find(func(c) { c.id == id })
  };

  // ── Lookbook ──────────────────────────────────────────────────────────────

  public func getLookbookEntries(
    entries : List.List<Types.LookbookEntry>
  ) : [Types.LookbookEntry] {
    entries.toArray()
  };

  public func getLookbookEntryById(
    entries : List.List<Types.LookbookEntry>,
    id : Types.LookbookEntryId
  ) : ?Types.LookbookEntry {
    entries.find(func(e) { e.id == id })
  };

  // ── Collaborations ────────────────────────────────────────────────────────

  public func getCollaborations(
    collaborations : List.List<Types.Collaboration>
  ) : [Types.Collaboration] {
    collaborations.toArray()
  };

  public func getCollaborationById(
    collaborations : List.List<Types.Collaboration>,
    id : Types.CollaborationId
  ) : ?Types.Collaboration {
    collaborations.find(func(c) { c.id == id })
  };

  // ── Contact ───────────────────────────────────────────────────────────────

  public func submitContact(
    messages : List.List<Types.ContactMessage>,
    nextId : Nat,
    name : Text,
    email : Text,
    subject : Text,
    message : Text
  ) : { #ok : Text; #err : Text } {
    if (name.size() == 0) {
      return #err("Name is required");
    };
    if (email.size() == 0) {
      return #err("Email is required");
    };
    if (message.size() == 0) {
      return #err("Message is required");
    };
    let entry : Types.ContactMessage = {
      id = nextId;
      name;
      email;
      subject;
      message;
      createdAt = 0;
    };
    messages.add(entry);
    #ok("Message received. We will be in touch shortly.")
  };
};
