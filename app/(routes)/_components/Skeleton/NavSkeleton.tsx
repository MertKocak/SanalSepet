import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const NavSkeleton = () => {
    return (
        <div className='hidden lg:flex gap-12'>
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className='h-8 w-24 bg-gray-100 rounded-sm' />
            ))}
        </div>
    )
}

export default NavSkeleton
