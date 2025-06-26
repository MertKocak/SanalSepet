import { Product } from '@/constans/type'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

interface ProductImagesProps {
    images: Product["images"]
}

const ProductImages = ({ images }: ProductImagesProps) => {
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
                    delay: 2000,
                }),
            ]}
        >
            <CarouselContent>
                {images?.map((image, index) => (

                    <CarouselItem className='' key={index}>
                        <Image
                            width={500}
                            alt='alt'
                            height={200}
                            unoptimized={true}
                            priority
                            src={
                                process.env.NEXT_PUBLIC_BACKEND_URL + image.url}
                            className='rounded-lg h-[200px] object-contain scale-95 w-full group-hover:scale-100 transition-all duration-700' />
                    </CarouselItem>

                ))}
            </CarouselContent>
        </Carousel>


    )
}

export default ProductImages

{/* <Carousel
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
                   
                    <CarouselItem className='' key={index}>
                        <Image
                            width={500}
                            alt='alt'
                            height={200}
                            unoptimized={true}
                            src={
                                process.env.NEXT_PUBLIC_BACKEND_URL + image.image.url}
                            className='rounded-3xl scale-95 w-full group-hover:scale-100 transition-all duration-700' />
                    </CarouselItem>
                    
                ))}
            </CarouselContent>
            <CarouselPrevious className='xl:left-44 left-20' />
            <CarouselNext className='xl:right-48 right-24' />
        </Carousel> */}