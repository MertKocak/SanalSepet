'use client'

import { getProducts } from '@/actions/getProducts';
import { Product } from '@/constans/type';
import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem';
import ProductSkeleton from '../Skeleton/ProductSkeleton';
export const revalidate = 60;

const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getProducts("/products?sort[0]=id:asc&filters[isTop]=true&pagination[start]=0&pagination[limit]=12&populate=*");
                setProducts(products);

            } catch (error) {
                console.log("Ürünler yüklenirken hata oluştu.", error)
            }
        }

        fetchProducts();
        setLoading(false)
    }, [])

    return (
        <>
            <p className='font-semibold text-lg text-gray-700 mt-12 px-4 md:px-20 xl:px-40'>İndirimde Olan Ürünler</p>
            {loading ? <ProductSkeleton />
                :
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 mt-4 mb-12 px-4 md:px-20 xl:px-40'>
                    {products.map((product, index) => (
                        <ProductItem
                            key={index}
                            product={product}
                        />
                    ))
                    }
                </div>}
        </>
    )
}

export default ProductList