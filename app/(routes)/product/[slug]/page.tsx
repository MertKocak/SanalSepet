import { getProducts } from '@/actions/getProducts';
import { Product } from '@/constans/type';
import ProductDetail from '../../_components/Product/ProductDetail';
import ProductDetailSkeleton from '../../_components/Skeleton/ProductDetailSkeleton';

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const products: Product[] = await getProducts(`/products?filters[slug][$eq]=${params.slug}&populate=*`);

  return (
    <div className='px-20 xl:px-48'>
      {products.length === 0 ? (
        <ProductDetailSkeleton />
      ) : (
        products.map((product, index) => (
          <ProductDetail key={index} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductDetailPage;
