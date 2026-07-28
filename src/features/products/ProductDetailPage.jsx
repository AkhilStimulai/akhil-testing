import { useParams } from 'react-router-dom';
import { RouteDocument } from '@/components/common';
import { PRODUCT_DETAIL_FALLBACK_META, getProductBySlug } from './product.registry.js';
import { ProductsPage } from './ProductsPage.jsx';

export function ProductDetailPage() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);

  return (
    <RouteDocument meta={product?.seo ?? PRODUCT_DETAIL_FALLBACK_META}>
      <ProductsPage />
    </RouteDocument>
  );
}
