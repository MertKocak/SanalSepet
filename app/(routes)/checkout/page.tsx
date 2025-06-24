/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { deleteCart } from '@/actions/cart/deleteCart';
import useCartStore from '@/hooks/useCartStore';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CheckoutCardItem from '../_components/Menu/CheckoutCardItem';
import { Button } from '@/components/ui/button';
import CheckoutForm from '../_components/CheckoutForm';

const ChechoutPage = () => {

    const { items, fetchItems } = useCartStore();
    const [subTotal, setSubTotal] = useState(0);
    const router = useRouter();

    let jwt: string | null = "";
    let user: string | null = "";
    let userId = "";

    try {
        jwt = localStorage.getItem("jwt");
        user = localStorage.getItem("user")
        if (user) {
            const userObj = JSON.parse(user)
            userId = userObj.id
        }
    } catch (error) {
        console.log(error)
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

    const deleteCardItem = async (id: any) => {
        await deleteCart(id, jwt);
        fetchItems(userId, jwt);
        toast('Ürün sepetinizden kaldırıldı!', { icon: <Trash2Icon className='w-5 h-5  text-orange-500' />, })
    }

    return (
        <div className='px-16 xl:px-40 my-8'>
            <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-3 gap-4'>
                <div className='col-span-1 md:col-span-2 xl:col-span-2 border rounded-2xl py-1.5 px-3 h-fit' >
                    <CheckoutForm subtotal={subTotal} />
                </div>
                <div className='col-span-1 md:col-span-2 xl:col-span-1 border justify-center items-center rounded-2xl h-fit px-2'>
                    <div className='px-4 bottom-0 flex flex-col w-full rounded-2xl border py-4 mt-2 items-start'>
                        {items.length > 0 ? (
                            <div className='w-full'>
                                <p className='font-bold text-lg mb-2 text-orange-500'>Sipariş Özeti</p>

                                <div className='flex flex-row justify-between w-full mb-1'>
                                    <p className='font-normal text-sm text-gray-700'>Ürün Toplamı</p>
                                    <p className='font-normal text-sm text-gray-700'>{subTotal}₺</p>
                                </div>

                                <div className='flex flex-row justify-between w-full mb-1'>
                                    <p className='font-normal text-sm text-gray-700'>Kargo Ücreti</p>
                                    <p className='font-normal text-sm text-gray-700'>50₺</p>
                                </div>
                                <div className='flex flex-row justify-between w-full mb-3'>
                                    <p className='font-normal text-sm text-gray-700'>250₺ ve Üzeri Kargo Bedava!</p>
                                    <p className='font-normal text-sm text-orange-500 text-right'>-50₺</p>
                                </div>
                                <hr />
                                <div className='flex flex-row justify-between w-full mt-2'>
                                    <p className='font-semibold text-md text-gray-700'>Toplam</p>
                                    <p className='font-semibold text-md text-gray-700'>{subTotal}₺</p>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    {
                        items.map((item) => (
                            <CheckoutCardItem key={item.id} item={item} deleteCardItem={() => deleteCardItem(item.id)} />
                        ))
                    }


                </div>
            </div>
        </div>
    )
}

export default ChechoutPage