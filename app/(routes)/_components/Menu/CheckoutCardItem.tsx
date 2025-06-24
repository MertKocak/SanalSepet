/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

interface CardItemProps {
    item: any,
    deleteCardItem: (id: string) => void;
}

const CheckoutCardItem = ({ item, deleteCardItem }: CardItemProps) => {
    return (
        <div className='flex w-full justify-between items-center flex-row border p-2 rounded-2xl mt-2 mb-2'>
            <div className='flex flex-row items-center'>
                <div>
                    <Image
                        width={80}
                        alt='alt'
                        height={80}
                        unoptimized={true}
                        src={
                            process.env.NEXT_PUBLIC_BACKEND_URL + item.images}
                        className='rounded-xl object-contain sm:h-24 sm:w-24 h-20 w-20' />
                </div>
                <div className='flex flex-col ml-2  mr-2'>
                    <p className='sm:text-md text-sm text-gray-700 font-semibold mb-1'>{item.name}</p>
                    <p className='text-xs text-gray-700'>Ürün adedi: {item.quantity}</p>
                    <p className='text-xs text-gray-700'>{item.color ? "Renk: " + item.color + " - " : null} {item.size ? "Beden: " + item.size : null}</p>
                    <p style={{ color: "#ff6700" }} className='text-md font-bold mt-1'>{item.totalPrice}₺</p>
                </div>
            </div>
            <div onClick={() => deleteCardItem(item.id)} className=' sm:h-8 h-6 sm:w-8 w-6 mr-1 cursor-pointer hover:bg-gray-100 rounded-full flex justify-center items-center'>
                <Trash2Icon className='sm:h-5 h-4 sm:w-5 w-4 text-gray-600' />
            </div>
        </div>
    )
}

export default CheckoutCardItem