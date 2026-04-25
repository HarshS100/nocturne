import List "mo:core/List";
import Types "../types/product-catalog";
import ProductCatalogLib "../lib/product-catalog";

mixin (
  products : List.List<Types.Product>,
  collections : List.List<Types.Collection>,
  lookbookEntries : List.List<Types.LookbookEntry>,
  collaborations : List.List<Types.Collaboration>,
  contactMessages : List.List<Types.ContactMessage>,
  nextProductId : Nat,
  nextCollectionId : Nat,
  nextLookbookEntryId : Nat,
  nextCollaborationId : Nat,
  nextContactMessageId : Nat
) {
  // ── Products ──────────────────────────────────────────────────────────────

  public query func getProducts() : async [Types.Product] {
    ProductCatalogLib.getProducts(products)
  };

  public query func getProductById(id : Types.ProductId) : async ?Types.Product {
    ProductCatalogLib.getProductById(products, id)
  };

  public query func getProductsByCollection(collectionId : Types.CollectionId) : async [Types.Product] {
    ProductCatalogLib.getProductsByCollection(products, collections, collectionId)
  };

  public query func getFeaturedProducts() : async [Types.Product] {
    ProductCatalogLib.getFeaturedProducts(products)
  };

  public query func searchProducts(searchQuery : Text) : async [Types.Product] {
    ProductCatalogLib.searchProducts(products, searchQuery)
  };

  public query func filterProducts(filter : Types.ProductFilter) : async [Types.Product] {
    ProductCatalogLib.filterProducts(products, filter)
  };

  // ── Collections ───────────────────────────────────────────────────────────

  public query func getCollections() : async [Types.Collection] {
    ProductCatalogLib.getCollections(collections)
  };

  public query func getCollectionById(id : Types.CollectionId) : async ?Types.Collection {
    ProductCatalogLib.getCollectionById(collections, id)
  };

  // ── Lookbook ──────────────────────────────────────────────────────────────

  public query func getLookbookEntries() : async [Types.LookbookEntry] {
    ProductCatalogLib.getLookbookEntries(lookbookEntries)
  };

  public query func getLookbookEntryById(id : Types.LookbookEntryId) : async ?Types.LookbookEntry {
    ProductCatalogLib.getLookbookEntryById(lookbookEntries, id)
  };

  // ── Collaborations ────────────────────────────────────────────────────────

  public query func getCollaborations() : async [Types.Collaboration] {
    ProductCatalogLib.getCollaborations(collaborations)
  };

  public query func getCollaborationById(id : Types.CollaborationId) : async ?Types.Collaboration {
    ProductCatalogLib.getCollaborationById(collaborations, id)
  };

  // ── Contact ───────────────────────────────────────────────────────────────

  public shared func submitContact(
    name : Text,
    email : Text,
    subject : Text,
    message : Text
  ) : async { #ok : Text; #err : Text } {
    let result = ProductCatalogLib.submitContact(
      contactMessages,
      nextContactMessageId,
      name,
      email,
      subject,
      message
    );
    result
  };
};
