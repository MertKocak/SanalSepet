'use client'

import { getProducts } from '@/actions/getProducts';
import { Product } from '@/constans/type';
import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem';

const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);

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
    }, [])

    return (
        <>
            <p className='font-semibold text-lg text-gray-700 mt-12 px-20 xl:px-40'>İndirimde Olan Ürünler</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 mb-12 px-20 xl:px-40'>
                {products.map((product, index) => (
                    <ProductItem
                        key={index}
                        product={product}
                    />
                ))
                }
            </div>
        </>
    )
}

export default ProductList