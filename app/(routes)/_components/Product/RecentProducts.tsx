'use client'

import { getProducts } from '@/actions/getProducts';
import { Product } from '@/constans/type';
import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';

const RecentProducts = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const categories = await getProducts("/products?sort[0]=id:asc&filters[recent]=true&pagination[start]=0&pagination[limit]=6&populate=*");
                setProducts(categories);

            } catch (error) {
                console.log("Ürünler yüklenirken hata oluştu.", error)
            }
        }
        fetchProducts();
    }, [])

    return (
        <>
            <p className='font-semibold text-lg text-gray-700 mt-6'>Popüler Ürünler</p>
            <div className='mt-4 mb-24 md:px-0 px-12'>
                <Carousel
                    opts={
                        {
                            loop: true,
                            align: "start"
                        }
                    }
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                >
                    <CarouselContent>
                        {products.map((product, index) => (
                            <CarouselItem className='basis-1/1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4' key={index}>
                                <ProductItem
                                    key={index}
                                    product={product}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>



            </div>
        </>
    )
}

export default RecentProducts