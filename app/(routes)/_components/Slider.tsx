'use client'

import { getSliders } from '@/actions/getSliders';
import type { Slider } from '@/constans/type';
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from 'next/link';
import Image from 'next/image';

const Slider = () => {

    const [sliders, setSliders] = useState<Slider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSliders = async () => {
            try {
                const sliders = await getSliders();
                setSliders(sliders);

            } catch (error) {
                console.log("Kategoriler yüklenirken hata oluştu.", error)
            } finally {
                setLoading(false);
            }
        }
        fetchSliders();
    }, [])

    return (
        <div>
            {loading ? <div className=' bg-gray-200 rounded-2xl h-[396px] w-[1190px] place-self-center'></div> : 
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
                    {sliders.map((slider) => (
                        <CarouselItem className='xl:px-44 px-20 mt-0' key={slider.url}>
                            <Link href={"/"}>
                                <Image
                                    alt='slider'
                                    unoptimized={true}
                                    src={process.env.NEXT_PUBLIC_BACKEND_URL + slider?.image?.url}
                                    width={1890}
                                    height={630}
                                    className='w-full ml-1.5 h-auto object-cover rounded-xl'
                                />

                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='xl:left-44 left-20' />
                <CarouselNext className='xl:right-48 right-24' />
            </Carousel>}

        </div>
    )
}

export default Slider