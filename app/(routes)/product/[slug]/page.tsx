import { getProducts } from '@/actions/getProducts';
import ProductDetailClient from './ProductDetailClient'; // client component

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const products = await getProducts(`/products?filters[slug][$eq]=${params.slug}&populate=*`);

  return (
    <ProductDetailClient products={products} />
  );
};

export default ProductDetailPage;
