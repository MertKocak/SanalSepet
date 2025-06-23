import { Product } from '@/constans/type'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

interface ProductModalImagesProps {
    images: Product["images"]
}

const ProductModalImages = ({ images }: ProductModalImagesProps) => {

    const isMultiple = images.length > 1;

    return (

        <Carousel
            opts={
                {
                    loop: true,
                    align: "start"
                }
            }
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
        >
            <CarouselContent>
                {images?.map((image, index) => (

                    <CarouselItem className={isMultiple ? 'w-[100px] md:w-[200px] place-items-center' : 'w-[200px] md:w-[400px] place-items-center'} key={index}>
                        <Image
                            width={500}
                            alt='alt'
                            height={200}
                            unoptimized={true}
                            src={
                                process.env.NEXT_PUBLIC_BACKEND_URL + image.url}
                            className='rounded-lg h-auto sm:h-[386px] w-auto object-contain' />
                    </CarouselItem>

                ))}
            </CarouselContent>
        </Carousel>


    )
}

export default ProductModalImages