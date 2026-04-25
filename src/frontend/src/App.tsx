import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import SplashScreen from "@/components/SplashScreen";
import { AboutPage } from "@/pages/AboutPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { CollaborationDetailPage } from "@/pages/CollaborationDetailPage";
import { CollaborationsPage } from "@/pages/CollaborationsPage";
import { CollectionDetailPage } from "@/pages/CollectionDetailPage";
import { CollectionsPage } from "@/pages/CollectionsPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { LookbookDetailPage } from "@/pages/LookbookDetailPage";
import { LookbookPage } from "@/pages/LookbookPage";
import { PoliciesPage } from "@/pages/PoliciesPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { SearchPage } from "@/pages/SearchPage";
import { SizeGuidePage } from "@/pages/SizeGuidePage";

const rootRoute = createRootRoute();

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const collectionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections",
  component: CollectionsPage,
});

const collectionDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collections/$id",
  component: CollectionDetailPage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const lookbookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lookbook",
  component: LookbookPage,
});

const lookbookDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lookbook/$id",
  component: LookbookDetailPage,
});

const collaborationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collaborations",
  component: CollaborationsPage,
});

const collaborationDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collaborations/$id",
  component: CollaborationDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const sizeGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/size-guide",
  component: SizeGuidePage,
});

const policiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/policies",
  component: PoliciesPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionsRoute,
  collectionDetailRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  lookbookRoute,
  lookbookDetailRoute,
  collaborationsRoute,
  collaborationDetailRoute,
  aboutRoute,
  contactRoute,
  searchRoute,
  sizeGuideRoute,
  policiesRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <SplashScreen />
      <RouterProvider router={router} />
    </>
  );
}
