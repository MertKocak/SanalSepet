/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

interface CardItemProps {
    item: any,
    deleteCardItem: (id: string) => void;
}

const CardItem = ({ item, deleteCardItem }: CardItemProps) => {
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
                        className='rounded-xl object-contain h-24 w-24' />
                </div>
                <div className='flex flex-col ml-2'>
                    <p className='text-md text-gray-700 font-semibold mb-1'>{item.name}</p>
                    <p className='text-xs text-gray-700'>Ürün adedi: {item.quantity}</p>
                    <p className='text-xs text-gray-700'>{item.color ? "Renk: " + item.color + "   " : null} {item.size ? "Beden: " + item.size : null}</p>
                    <p style={{ color: "#ff6700" }} className='text-lg font-bold mt-1'>{item.totalPrice}₺</p>
                </div>
            </div>
            <div onClick={() => deleteCardItem(item.id)} className=' h-8 w-8 mr-1 cursor-pointer hover:bg-gray-100 rounded-full flex justify-center items-center'>
                <Trash2Icon className='h-5 w-5 text-gray-600' />
            </div>
        </div>
    )
}

export default CardItem