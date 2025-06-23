'use client';

import { getProducts } from '@/actions/getProducts';
import { Product } from '@/constans/type';
import React, { useEffect, useState } from 'react'
import ProductDetail from '../../_components/Product/ProductDetail';

interface ProductDetailPageProps {
  params: {
    slug: string;
  }
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {

  const [productDetail, setProductDetail] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = await getProducts(`/products?filters[slug][$eq]=${params.slug}&populate=*`);
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
        <div>

        </div>
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