export const ROUTE_SEGMENTS = Object.freeze({
  ROOT: '/',
  DOMAINS: 'domains',
  DOMAIN_DETAIL: 'domains/:domainSlug',
  PRODUCTS: 'rcx',
  PRODUCT_DETAIL: 'rcx/:productSlug',
  CONTACT: 'contact',
  GALLERY: 'gallery',
  REVIEWS: 'reviews',
  NOT_FOUND: '404',
});

export const ROUTES = Object.freeze({
  HOME: '/',
  DOMAINS: '/domains',
  DOMAIN_DETAIL: '/domains/:domainSlug',
  PRODUCTS: '/rcx',
  PRODUCT_DETAIL: '/rcx/:productSlug',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  REVIEWS: '/reviews',
  NOT_FOUND: '/404',
});

export function createRoutePath(routeTemplate, params = {}) {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, encodeURIComponent(value)),
    routeTemplate,
  );
}
