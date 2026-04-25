export interface ExternalBlob {
  url: string;
  contentType: string;
}

export interface Product {
  id: bigint;
  name: string;
  description: string;
  price: bigint;
  category: string;
  images: ExternalBlob[];
  sizes: string[];
  colors: string[];
  material: string;
  availability: boolean;
  isFeatured: boolean;
  createdAt: bigint;
}

export interface Collection {
  id: bigint;
  name: string;
  description: string;
  coverImage: ExternalBlob;
  productIds: bigint[];
}

export interface LookbookEntry {
  id: bigint;
  title: string;
  description: string;
  coverImage: ExternalBlob;
  images: ExternalBlob[];
  publishedAt: bigint;
  tags: string[];
}

export interface Collaboration {
  id: bigint;
  title: string;
  description: string;
  celebrity: string;
  campaign: string;
  coverImage: ExternalBlob;
  images: ExternalBlob[];
  publishedAt: bigint;
  quote: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: bigint;
  maxPrice?: bigint;
  availability?: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: bigint;
  productName: string;
  productImage: string;
  price: bigint;
  size: string;
  color: string;
  quantity: number;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}
