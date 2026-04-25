import { type Backend, createActor } from "@/backend";
import type {
  Collaboration,
  Collection,
  LookbookEntry,
  Product,
  ProductFilter,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery } from "@tanstack/react-query";

type BackendActor = Backend;

// ─── Products ────────────────────────────────────────────────────────────────

export function useProducts() {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { getProducts: () => Promise<Product[]> }
      ).getProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: bigint | undefined) {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (
        actor as unknown as {
          getProductById: (id: bigint) => Promise<Product | null>;
        }
      ).getProductById(id);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useProductsByCollection(collectionId: bigint | undefined) {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "collection", collectionId?.toString()],
    queryFn: async () => {
      if (!actor || collectionId === undefined) return [];
      return (
        actor as unknown as {
          getProductsByCollection: (id: bigint) => Promise<Product[]>;
        }
      ).getProductsByCollection(collectionId);
    },
    enabled: !!actor && !isFetching && collectionId !== undefined,
  });
}

export function useFeaturedProducts() {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { getFeaturedProducts: () => Promise<Product[]> }
      ).getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchProducts(searchQuery: string) {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "search", searchQuery],
    queryFn: async () => {
      if (!actor || !searchQuery.trim()) return [];
      return (
        actor as unknown as {
          searchProducts: (q: string) => Promise<Product[]>;
        }
      ).searchProducts(searchQuery);
    },
    enabled: !!actor && !isFetching && searchQuery.trim().length > 0,
  });
}

export function useFilterProducts(filter: ProductFilter) {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "filter", JSON.stringify(filter)],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as {
          filterProducts: (f: ProductFilter) => Promise<Product[]>;
        }
      ).filterProducts(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Collections ─────────────────────────────────────────────────────────────

export function useCollections() {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Collection[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { getCollections: () => Promise<Collection[]> }
      ).getCollections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCollection(id: bigint | undefined) {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Collection | null>({
    queryKey: ["collection", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (
        actor as unknown as {
          getCollectionById: (id: bigint) => Promise<Collection | null>;
        }
      ).getCollectionById(id);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

// ─── Lookbook ─────────────────────────────────────────────────────────────────

export function useLookbookEntries() {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<LookbookEntry[]>({
    queryKey: ["lookbook"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as {
          getLookbookEntries: () => Promise<LookbookEntry[]>;
        }
      ).getLookbookEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLookbookEntry(id: bigint | undefined) {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<LookbookEntry | null>({
    queryKey: ["lookbook", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (
        actor as unknown as {
          getLookbookEntryById: (id: bigint) => Promise<LookbookEntry | null>;
        }
      ).getLookbookEntryById(id);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

// ─── Collaborations ───────────────────────────────────────────────────────────

export function useCollaborations() {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Collaboration[]>({
    queryKey: ["collaborations"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as {
          getCollaborations: () => Promise<Collaboration[]>;
        }
      ).getCollaborations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCollaboration(id: bigint | undefined) {
  const { actor, isFetching } = useActor<BackendActor>(createActor);
  return useQuery<Collaboration | null>({
    queryKey: ["collaboration", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (
        actor as unknown as {
          getCollaborationById: (id: bigint) => Promise<Collaboration | null>;
        }
      ).getCollaborationById(id);
      return result ?? null;
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export function useSubmitContact() {
  const { actor } = useActor<BackendActor>(createActor);
  return useMutation<
    string,
    Error,
    { name: string; email: string; subject: string; message: string }
  >({
    mutationFn: async ({ name, email, subject, message }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await (
        actor as unknown as {
          submitContact: (
            name: string,
            email: string,
            subject: string,
            message: string,
          ) => Promise<{ Ok: string } | { Err: string }>;
        }
      ).submitContact(name, email, subject, message);
      if ("Err" in result) throw new Error(result.Err);
      return result.Ok;
    },
  });
}
