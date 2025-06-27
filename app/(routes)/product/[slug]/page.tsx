// page.tsx
import { getProducts } from '@/actions/getProducts';
import ProductDetail from '../../_components/Product/ProductDetail';
/* import ProductDetailSkeleton from '../../_components/Skeleton/ProductDetailSkeleton'; */

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  // Direkt sunucu tarafında fetch et
  const products = await getProducts(`/products?filters[slug][$eq]=${params.slug}&populate=*`);

  if (!products || products.length === 0) {
    return <div>Ürün bulunamadı</div>;
  }

  return (
    <div className="px-20 xl:px-48">
      {products.map((product, index) => (
        <ProductDetail key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductDetailPage;
