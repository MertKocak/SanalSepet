import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: { slug: string };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  return <ProductDetailClient slug={params.slug} />;
};

export default ProductDetailPage;
