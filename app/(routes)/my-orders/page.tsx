/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import useCartStore from '@/hooks/useCartStore';
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useRouter } from 'next/navigation';
import { getToOrder } from '@/actions/cart/getToOrder';
import moment from 'moment';
import { CheckIcon, ChevronDown } from 'lucide-react';
import OrderItem from '../_components/OrderItem';
import MyOrdersPageSkeleton from '../_components/Skeleton/MyOrdersPageSkeleton';

type OrderItem = {
    name: string,
    address: string,
    phone: string,
    userId: number,
    subtotal: number,
    paymentText: string,
    createdAt: string,
    OrderedProducts: {
        product: string,
        quantity: number,
        totalPrice: number,
        color: string,
        size: string,
    }[];
};

const MyOrdersPage = () => {

    const { items, fetchItems } = useCartStore();
    const [fetchTrigger, setFetchrigger] = useState(false)
    const [orderList, setOrderList] = useState<OrderItem[]>([])
    const [loading, setLoading] = useState(true)

    const router = useRouter();

    const [jwt, setJwt] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>("");

    // localStorage erişimi burada
    useEffect(() => {
        try {
            const storedJwt = localStorage.getItem("jwt");
            const storedUser = localStorage.getItem("user");

            if (storedJwt) setJwt(storedJwt);

            if (storedUser) {
                const userObj = JSON.parse(storedUser);
                setUserId(userObj.id);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    // Sepet verilerini fetch et
    useEffect(() => {
        if (userId && jwt) {
            fetchItems(userId, jwt);
        }
    }, [userId, jwt, fetchItems, fetchTrigger]);

    // Siparişleri çek
    const getOrder = async () => {
        if (!userId || !jwt) return;
        const orderList_ = await getToOrder(userId, jwt);
        setOrderList(orderList_);
    };

    useEffect(() => {
        if (!jwt) {
            /* router.push("/"); */
        }
        getOrder()
        setLoading(false);

    }, [jwt])

    return (
        loading ?
            <MyOrdersPageSkeleton /> :
            <div className='px-4 md:px-20 xl:px-48 my-6'>
                <p style={{ color: "#ff6700" }} className='text-lg md:mt-0 -mt-8 font-semibold'>
                    <span>Siparişlerim</span>
                    <hr className='mt-2 mb-4' />
                </p>
                {orderList.length === 0 ? (
                    <p className='text-gray-700 text-sm mt-8 text-center'>
                        Henüz hiçbir siparişiniz yok.
                    </p>
                ) : (
                    <div className=''>
                        {orderList.map((item, index) => (
                            <Collapsible key={index}>
                                <CollapsibleTrigger className='flex w-full mt-4 items-center border cursor-pointer py-2 px-4 content-center justify-between rounded-sm gap-4 md:gap-8'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 w-full'>
                                        <p className='text-gray-700 text-xs lg:text-sm w-full text-start'>
                                            <span className='font-semibold text-xs lg:text-sm'>Sipariş Tarihi:</span> {moment(item?.createdAt).format('DD/MMM/yyyy')}
                                        </p>
                                        <p className='text-gray-700 text-xs lg:text-sm w-full text-start'>
                                            <span className='font-semibold text-xs lg:text-sm'>Ödeme Yöntemi:</span> {item?.paymentText}
                                        </p>
                                        <div className='flex flex-row items-start w-full'>
                                            <p className='font-semibold text-xs text-gray-700 lg:text-sm mr-2'>
                                                Sipariş Durumu:
                                            </p>
                                            <div className='flex flex-row items-center'>
                                                <CheckIcon className='text-green-600 h-4 w-4 mr-0.5' />
                                                <p className='text-green-600 text-xs lg:text-sm'>Teslim Edildi</p>
                                            </div>
                                        </div>
                                        <p className='text-gray-700 text-xs lg:text-sm w-full text-start'>
                                            <span className='font-semibold text-xs lg:text-sm'>Toplam Tutar:</span> {item?.subtotal}₺
                                        </p>
                                    </div>

                                    <p className='col-span-2 '> <span className='font-bold'> <ChevronDown className='ml-auto text-gray-700' /> </span></p>

                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    {item.OrderedProducts && item.OrderedProducts.map((order, index_) => (
                                        <OrderItem key={index_} orderItem={order} />
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>

                        ))}
                    </div>
                )}
            </div>

    )
}

export default MyOrdersPage