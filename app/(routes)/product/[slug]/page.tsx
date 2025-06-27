import ProductDetailClient from "./ProductDetailClient";

type PageProps = {
  params: {
    slug: string;
  };
};

const ProductDetailPage = ({ params }: PageProps) => {
  return <ProductDetailClient slug={params.slug} />;
};

export default ProductDetailPage;
