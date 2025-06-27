'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/actions/getProducts';
import { Product } from '@/constans/type';
import ProductDetail from '../../_components/Product/ProductDetail';
import ProductDetailSkeleton from '../../_components/Skeleton/ProductDetailSkeleton';

export default function ProductClient({ slug }: { slug: string }) {
  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProducts(`/products?filters[slug][$eq]=${slug}&populate=*`);
        setProductDetail(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [slug]);

  if (loading) return <ProductDetailSkeleton />;

  return (
    <div className='px-20 xl:px-48'>
      {productDetail.map((product, index) => (
        <ProductDetail key={index} product={product} />
      ))}
    </div>
  );
}
