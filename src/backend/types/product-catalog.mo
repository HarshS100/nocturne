import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ProductId = Nat;
  public type CollectionId = Nat;
  public type LookbookEntryId = Nat;
  public type CollaborationId = Nat;
  public type ContactMessageId = Nat;

  public type ProductCategory = Text;
  public type ProductSize = Text;
  public type ProductColor = Text;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Nat; // in cents
    category : ProductCategory;
    images : [Storage.ExternalBlob];
    sizes : [ProductSize];
    colors : [ProductColor];
    material : Text;
    availability : Bool;
    isFeatured : Bool;
    createdAt : Int;
  };

  public type Collection = {
    id : CollectionId;
    name : Text;
    description : Text;
    coverImage : Storage.ExternalBlob;
    productIds : [ProductId];
  };

  public type LookbookEntry = {
    id : LookbookEntryId;
    title : Text;
    description : Text;
    coverImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
    publishedAt : Int;
    tags : [Text];
  };

  public type Collaboration = {
    id : CollaborationId;
    title : Text;
    description : Text;
    celebrity : Text;
    campaign : Text;
    coverImage : Storage.ExternalBlob;
    images : [Storage.ExternalBlob];
    publishedAt : Int;
    quote : Text;
  };

  public type ContactMessage = {
    id : ContactMessageId;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    createdAt : Int;
  };

  public type ProductFilter = {
    category : ?ProductCategory;
    minPrice : ?Nat;
    maxPrice : ?Nat;
    size : ?ProductSize;
    color : ?ProductColor;
  };
};
