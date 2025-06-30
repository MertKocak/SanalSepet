'use client';

import { Product } from '@/constans/type';
import ProductDetail from '../../_components/Product/ProductDetail';
import ProductDetailSkeleton from '../../_components/Skeleton/ProductDetailSkeleton';

interface ProductDetailClientProps {
  products: Product[];
}

const ProductDetailClient = ({ products }: ProductDetailClientProps) => {
  if (!products || products.length === 0) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="px-4 md:px-20 xl:px-48">
      {products.map((product, index) => (
        <ProductDetail key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductDetailClient;
