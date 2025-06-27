import ProductClient from './ProductClient';

export default async function ProductPage(props: { params: { slug: string } }) {
  const { slug } = await props.params;

  return <ProductClient slug={slug} />;
}
