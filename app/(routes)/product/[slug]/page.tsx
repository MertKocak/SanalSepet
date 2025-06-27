import ProductDetailClient from "./ProductDetailClient";

type Props = {
  params: {
    slug: string;
  };
};

const ProductDetailPage = ({ params }: Props) => {
  return <ProductDetailClient slug={params.slug} />;
};

export default ProductDetailPage;
