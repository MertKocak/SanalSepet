import { getProducts } from '@/actions/getProducts';
import ProductDetailClient from './ProductDetailClient';


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const products = await getProducts(`/products?filters[slug][$eq]=${slug}&populate=*`);

  return <ProductDetailClient products={products} />;
}
