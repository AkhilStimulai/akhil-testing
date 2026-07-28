import { createBrowserRouter } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/common';
import { ROUTE_SEGMENTS } from '@/constants';
import { RootLayout } from '@/layouts';
import { lazyNamed } from '@/utils';

const HomePage = lazyNamed(() => import('@/features/home'), 'HomePage');
const DomainsPage = lazyNamed(() => import('@/features/domains'), 'DomainsPage');
const DomainDetailPage = lazyNamed(() => import('@/features/domains'), 'DomainDetailPage');
const ProductsPage = lazyNamed(() => import('@/features/products'), 'ProductsPage');
const ProductDetailPage = lazyNamed(() => import('@/features/products'), 'ProductDetailPage');
const ContactPage = lazyNamed(() => import('@/features/contact'), 'ContactPage');
const GalleryPage = lazyNamed(() => import('@/features/gallery'), 'GalleryPage');
const ReviewsPage = lazyNamed(() => import('@/features/reviews'), 'ReviewsPage');
const NotFoundPage = lazyNamed(() => import('@/features/not-found'), 'NotFoundPage');

export const appRoutes = [
  {
    path: ROUTE_SEGMENTS.ROOT,
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },

      // Aliases for the home page
      { path: 'home', element: <HomePage /> },
      { path: 'gallery', element: <GalleryPage /> },
      { path: 'reviews', element: <ReviewsPage /> },

      { path: ROUTE_SEGMENTS.DOMAINS, element: <DomainsPage /> },
      { path: ROUTE_SEGMENTS.DOMAIN_DETAIL, element: <DomainDetailPage /> },
      { path: ROUTE_SEGMENTS.PRODUCTS, element: <ProductsPage /> },
      { path: ROUTE_SEGMENTS.PRODUCT_DETAIL, element: <ProductDetailPage /> },
      { path: ROUTE_SEGMENTS.CONTACT, element: <ContactPage /> },
      { path: ROUTE_SEGMENTS.NOT_FOUND, element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const router = createBrowserRouter(appRoutes, {
  basename: import.meta.env.BASE_URL,
});
