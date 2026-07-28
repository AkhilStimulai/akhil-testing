import { ROUTES } from '@/constants';

export const PRIMARY_NAV_ITEMS = Object.freeze([
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Domains', to: ROUTES.DOMAINS },
  { label: 'RCX', to: ROUTES.PRODUCTS },
  { label: 'Gallery', to: ROUTES.GALLERY },
  { label: 'Reviews', to: ROUTES.REVIEWS },
  { label: 'Contact', to: ROUTES.CONTACT },
]);

export const FOOTER_NAV_ITEMS = Object.freeze([
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Products', to: ROUTES.PRODUCTS },
  { label: 'Contact', to: ROUTES.CONTACT },
]);
