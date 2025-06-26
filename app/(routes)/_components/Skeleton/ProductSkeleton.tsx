"use client"

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const ProductSkeleton = () => {
    return (
        <div className='grid grid-cols-1 px-20 xl:px-40 justify-center mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex border border-gray-100 p-2 rounded-lg flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 mt-1 w-[120px]" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-8 mt-1 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductSkeleton