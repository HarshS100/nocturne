import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type ProductColor = string;
export type ProductCategory = string;
export interface LookbookEntry {
    id: LookbookEntryId;
    title: string;
    tags: Array<string>;
    publishedAt: bigint;
    description: string;
    coverImage: ExternalBlob;
    images: Array<ExternalBlob>;
}
export interface Collaboration {
    id: CollaborationId;
    title: string;
    campaign: string;
    publishedAt: bigint;
    quote: string;
    description: string;
    coverImage: ExternalBlob;
    celebrity: string;
    images: Array<ExternalBlob>;
}
export interface ProductFilter {
    color?: ProductColor;
    size?: ProductSize;
    maxPrice?: bigint;
    category?: ProductCategory;
    minPrice?: bigint;
}
export type ProductSize = string;
export interface Collection {
    id: CollectionId;
    productIds: Array<ProductId>;
    name: string;
    description: string;
    coverImage: ExternalBlob;
}
export type CollaborationId = bigint;
export type ProductId = bigint;
export type LookbookEntryId = bigint;
export interface Product {
    id: ProductId;
    name: string;
    createdAt: bigint;
    description: string;
    sizes: Array<ProductSize>;
    availability: boolean;
    isFeatured: boolean;
    category: ProductCategory;
    colors: Array<ProductColor>;
    price: bigint;
    material: string;
    images: Array<ExternalBlob>;
}
export type CollectionId = bigint;
export interface backendInterface {
    filterProducts(filter: ProductFilter): Promise<Array<Product>>;
    getCollaborationById(id: CollaborationId): Promise<Collaboration | null>;
    getCollaborations(): Promise<Array<Collaboration>>;
    getCollectionById(id: CollectionId): Promise<Collection | null>;
    getCollections(): Promise<Array<Collection>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getLookbookEntries(): Promise<Array<LookbookEntry>>;
    getLookbookEntryById(id: LookbookEntryId): Promise<LookbookEntry | null>;
    getProductById(id: ProductId): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCollection(collectionId: CollectionId): Promise<Array<Product>>;
    searchProducts(searchQuery: string): Promise<Array<Product>>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
