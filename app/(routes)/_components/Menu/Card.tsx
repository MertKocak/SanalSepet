/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBasket, Trash2Icon } from 'lucide-react'
import useCartStore from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import CardItem from './CardItem';
import { deleteCart } from '@/actions/cart/deleteCart';
import toast from 'react-hot-toast';

interface CardProps {
    jwt: string;
    userId: string;
}

const Card = ({ jwt, userId }: CardProps) => {

    const { items, fetchItems } = useCartStore();
    const [subTotal, setSubTotal] = useState(0);
    const router = useRouter();

    const deleteCardItem = async (id: any) => {
        await deleteCart(id, jwt);
        fetchItems(userId, jwt);
        toast('Ürün sepetinizden kaldırıldı!', { icon: <Trash2Icon style={{ color: "#ff6700" }} className='w-5 h-5' />, })
    }

    useEffect(() => {
        if (userId && jwt) {
            fetchItems(userId, jwt);
        }
    }, [userId, jwt, fetchItems]);

    useEffect(() => {
        let total = 0;
        items.forEach(element => {
            total = total + element.totalPrice
        });
        setSubTotal(Math.floor(total))
    }, [items]);

    return (
        <Sheet>
            <SheetTrigger>
                <div className='relative cursor-pointer'>
                    <span style={{ backgroundColor: "#ff6700" }} className='absolute text-white text-xs font-semibold -right-2.5 -top-2 w-4 h-4 rounded-lg items-center justify-center text-center'>{items.length ? items.length : "0"}</span>
                    <ShoppingBasket className='text-gray-700' />
                </div>
            </SheetTrigger>
            <SheetContent className='text-gray-700'>
                <SheetHeader>
                    <SheetTitle style={{ color: "#ff6700" }} className='font-bold text-lg'>Sepetim</SheetTitle>
                </SheetHeader>
                <div className='overflow-y-auto max-h-[56vh]'>
                    {items.length === 0 ? <p className='px-4 text-md text-gray-700'>Sepetiniz boş!</p>
                        :
                        <div className='px-4 -mt-2 text-gray-700'>
                            {
                                items.map((item) => (
                                    <CardItem key={item.id} item={item} deleteCardItem={() => deleteCardItem(item.id)} />
                                ))
                            }
                        </div>
                    }
                </div>
                <SheetClose asChild>
                    <div className='absolute px-4 bottom-0 flex flex-col rounded-2xl border mx-4 mb-4 py-4 items-start'>
                        {items.length > 0 ?
                            <div className=''>
                                <p className='font-bold text-lg mb-2 text-orange-500'>Sipariş Özeti</p>
                                <div className=' flex flex-row w-[317px] justify-between'>
                                    <p className='font-normal text-sm text-gray-700'>Ürün Toplamı</p>
                                    <p className='font-normal text-sm text-gray-700'>{subTotal}₺</p>
                                </div>
                                <div className='flex flex-row w-[317px] justify-between'>
                                    <p className='font-normal text-sm text-gray-700'>Kargo Ücreti</p>
                                    <p className='font-normal text-sm text-gray-700 text-right'>50₺</p>
                                </div>
                                <div className='flex flex-row w-[317px] justify-between'>
                                    <p className='font-normal text-sm text-gray-700'>250₺ ve Üzeri Kargo Bedava!</p>
                                    <p className='font-normal text-sm text-orange-500 text-right'>-50₺</p>
                                </div>
                                <div className='flex flex-row w-[317px] justify-between'>
                                    <p className='font-semibold text-lg mt-2 mb-2 text-gray-700'>Toplam</p>
                                    <p className='font-semibold text-lg mt-2 mb-2 text-gray-700'>{subTotal}₺</p>
                                </div>
                            </div>
                            : null}
                        <div className='w-full'>
                            {items.length > 0 ? <Button disabled={items.length == 0} onClick={() => router.push(jwt ? "/checkout" : "/login")} style={{ backgroundColor: "#ff6700" }} className='cursor-pointer w-full flex-1'>
                                Sepeti Onayla
                            </Button> : null}
                        </div>
                    </div>

                </SheetClose>
            </SheetContent>
        </Sheet>
    )
}

export default Card