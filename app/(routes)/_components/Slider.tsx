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
import { Skeleton } from '@/components/ui/skeleton';
export const revalidate = 60;

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
            {loading ? <div className='px-4 xl:px-40'>
                <Skeleton className=' bg-gray-100 w-full rounded-2xl h-[200px] lg:h-[360px] justify-center place-self-center' />
            </div> :
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
                            <CarouselItem className='xl:px-44 md:px-20 px-4 mt-0' key={slider.url}>
                                <Link href={"/"}>
                                    <Image
                                        alt='slider'
                                        unoptimized={true}
                                        src={process.env.NEXT_PUBLIC_BACKEND_URL + slider?.image?.url}
                                        width={1890}
                                        height={630}
                                        priority
                                        className='w-full ml-1.5 h-auto object-cover rounded-xl'
                                    />

                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='xl:left-44 md:left-20 left-4' />
                    <CarouselNext className='xl:right-48 md:right-24 right-4' />
                </Carousel>}

        </div>
    )
}

export default Slider