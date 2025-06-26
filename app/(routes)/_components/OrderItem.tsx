/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react'

interface MyOrderItemProps {
    orderItem: any;
}

const MyorderItem = ({ orderItem }: MyOrderItemProps) => {
    console.log("gelen url: " + process.env.NEXT_PUBLIC_BACKEND_URL + orderItem.product.images[0].url)
    return (
        <div style={{ backgroundColor: "#f9f9f9" }} className='rounded-sm -mt-2'>
            <div className='mt-2 flex flex-row items-center gap-4 border-b rounded-sm py-2 lg:px-8 px-2 justify-center lg:justify-between'>
                <div className='flex flex-row w-full gap-2'>
                    <div className='items-center  justify-start'>
                        <Image
                            width={80}
                            alt='alt'
                            height={80}
                            unoptimized={true}
                            src={
                                process.env.NEXT_PUBLIC_BACKEND_URL + orderItem.product.images[0].url}
                            className='rounded-md object-contain h-14 w-14' />

                    </div>
                    <div className=' w-full content-center'>
                        <div className='text-gray-700 text-xs md:text-[15px] font-semibold'><p>{orderItem.product.name}</p></div>
                        <div className='flex flex-row gap-6 text-start mt-1'>
                            <div className='text-gray-700 font-normal text-xs'><p>Ürün Adedi: {orderItem.quantity}</p></div>
                            {orderItem.color ? <div className='text-gray-700 font-normal text-xs'><p>Renk: {orderItem.color}</p></div> : null}
                            {orderItem.size ? <div className='text-gray-700 font-normal text-xs'><p>Beden: {orderItem.size}</p></div> : null}
                        </div>
                    </div>
                </div>

                <div className='text-orange-500 font-semibold text-xs md:text-[15px]'><p>{orderItem.totalPrice}₺</p></div>
            </div>
        </div>
    )
}

export default MyorderItem