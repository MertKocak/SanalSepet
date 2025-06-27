'use client';

import { getProducts } from '@/actions/getProducts';
import { Product } from '@/constans/type';
import React, { useEffect, useState } from 'react'
import ProductDetail from '../../_components/Product/ProductDetail';
import ProductDetailSkeleton from '../../_components/Skeleton/ProductDetailSkeleton';

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {

  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = params;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = await getProducts(`/products?filters[slug][$eq]=${slug}&populate=*`);
        setProductDetail(categories);

      } catch (error) {
        console.log("Ürünler yüklenirken hata oluştu.", error)
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])

  return (
    <>
      {loading ?
        <ProductDetailSkeleton />
        :
        <div className='px-20 xl:px-48'>
          {productDetail.map((product, index) => (
            <ProductDetail
              key={index}
              product={product}
            />
          ))}
        </div>}
    </>
  )
}

export default ProductDetailPage