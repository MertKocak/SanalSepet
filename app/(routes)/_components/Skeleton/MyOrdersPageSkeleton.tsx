import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const MyOrdersPageSkeleton = () => {
    return (
        <div className='px-4 md:px-20 xl:px-48 my-6'>
            <div className=' bg-gray-100 rounded-lg h-8 w-24'>
            </div>
            <hr className='mt-2 mb-4 ' />
            <div className='gap-4 flex flex-col'>
                <Skeleton className='w-full h-16 bg-gray-100 rounded-md'></Skeleton>
                <Skeleton className='w-full h-16 bg-gray-100 rounded-md'></Skeleton>
                <Skeleton className='w-full h-16 bg-gray-100 rounded-md'></Skeleton>
                <Skeleton className='w-full h-16 bg-gray-100 rounded-md'></Skeleton>
            </div>
        </div>
    )
}

export default MyOrdersPageSkeleton