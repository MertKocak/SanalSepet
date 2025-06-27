/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import useCartStore from '@/hooks/useCartStore';
import { Button } from "@/components/ui/button";
import { deleteCart } from '@/actions/cart/deleteCart';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/actions/cart/createOrder';
import { LoaderCircle } from 'lucide-react';

interface ChechoutPageProps {
    subtotal: number,
    userId: string,
    jwt: any,
}

export const formSchema = z.object({
    isim: z.string().min(2, {
        message: "İsim en az 2 karakter olmalıdır.",
    }),

    telefon: z
        .string()
        .min(10, { message: "Telefon numarası en az 10 haneli olmalıdır." })
        .regex(/^[0-9]+$/, { message: "Telefon sadece rakamlardan oluşmalıdır." }),

    adres: z.string().min(10, {
        message: "Adres en az 10 karakter olmalıdır.",
    }),

    kartSahibi: z.string().min(2, {
        message: "Kart sahibi adı en az 2 karakter olmalıdır.",
    }),

    kartNumarasi: z
        .string()
        .length(16, { message: "Kart numarası 16 haneli olmalıdır." })
        .regex(/^[0-9]+$/, { message: "Kart numarası sadece rakamlardan oluşmalıdır." }),

    ay: z
        .string()
        .min(2, { message: "Ay bilgisi eksik." })
        .max(2, { message: "Ay en fazla 2 haneli olmalıdır." })
        .regex(/^(0[1-9]|1[0-2])$/, { message: "Ay 01 ile 12 arasında olmalıdır." }),

    yil: z
        .string()
        .length(2, { message: "Yıl 2 haneli olmalıdır (örnek: 25)." })
        .regex(/^[0-9]+$/, { message: "Yıl sadece rakamlardan oluşmalıdır." }),

    cvc: z
        .string()
        .length(3, { message: "CVC kodu 3 haneli olmalıdır." })
        .regex(/^[0-9]+$/, { message: "CVC sadece rakamlardan oluşmalıdır." }),
});

const CheckoutForm = ({ subtotal, userId, jwt }: ChechoutPageProps) => {
    const [response, setResponse] = useState(null);
    const { items, fetchItems } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isim: "mert kocak",
            telefon: "5060532870",
            adres: "sivas merkez",
            kartSahibi: "mert kocak",
            kartNumarasi: "5890040000000016",
            ay: "04",
            yil: "29",
            cvc: "159",
        },
    });

    const onSubmit = async (data: any) => {
        const paymentCard = {
            cardHolderName: data.kartSahibi,
            cardNumber: data.kartNumarasi,
            expireMonth: data.ay,
            expireYear: data.yil,
            cvc: data.cvc,
            registerCard: '0'
        };

        const buyer = {
            id: 'BY789',
            name: data.isim,
            surname: 'Soyad',
            gsmNumber: data.telefon,
            email: 'john.doe@example.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: data.adres,
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        };

        const shippingAddress = {
            contactName: data.isim,
            city: 'Istanbul',
            country: 'Turkey',
            address: data.adres,
            zipCode: '34742'
        };

        const billingAddress = {
            contactName: data.isim,
            city: 'Istanbul',
            country: 'Turkey',
            address: data.adres,
            zipCode: '34742'
        };

        const basketItems = items.map(item => ({
            id: item.id,
            name: item.name,
            category1: 'Collectibles',
            category2: 'Accessories',
            itemType: 'PHYSICAL',
            price: item.totalPrice

        }));

        const paymentData = {
            price: subtotal,
            paidPrice: subtotal,
            currency: 'TRY',
            basketId: 'B67832',
            paymentCard: paymentCard,
            buyer: buyer,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            basketItems: basketItems
        };

        try {
            const response = await axios.post(
                process.env.SANALPOS as string,
                paymentData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );


            setResponse(response.data);

            if (response.data.status === "success") {

                const cleanedItems = items.map(item => ({
                    product: item.productsdocID,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                    color: item.color,
                    size: item.size,
                }));

                const payload = {
                    data: {
                        name: data.isim,
                        address: data.adres,
                        phone: data.telefon,
                        userId: userId,
                        subtotal: subtotal,
                        paymentText: "Iyzico",
                        OrderedProducts: cleanedItems
                    }
                }

                await createOrder(payload, jwt)

                items.forEach((item, index) => {
                    deleteCart(item.id, jwt).then(resp => {
                    })
                })

                setLoading(true);

                toast.success("Ödeme başarılı bir şekilde tamamlandı!");

                fetchItems(userId, jwt)

                router.push("/my-orders")
            }
            else {
                toast.error("Ödeme tamamlanamadı!")

            }
        } catch (error) {
            toast.error("Ödeme tamamlanamadı!")
            console.error('Error:', error);
        }
    }


    return (
        <div className='p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <p style={{ color: "#ff6700" }} className='mb-1 text-lg font-semibold'>
                        Kişisel Bilgiler
                        <hr className='mt-2 mb-6' />
                    </p>

                    <div className='flex flex-row gap-4 items-start'>
                        <FormField
                            control={form.control}
                            name="isim"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>İsim Soyisim</FormLabel>
                                    <FormControl>
                                        <Input className='text-sm sm:text-md' placeholder="İsim Soyisim" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs -mt-1' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="telefon"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Telefon</FormLabel>
                                    <FormControl>
                                        <Input type='number' className='text-sm sm:text-md' placeholder="5XXXXXXXXX" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs -mt-1' />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="adres"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adres</FormLabel>
                                <FormControl>
                                    <Textarea className='h-20 text-sm sm:text-md' placeholder="Teslimat adresi" {...field} />
                                </FormControl>
                                <FormMessage className='text-xs -mt-1' />
                            </FormItem>
                        )}
                    />

                    <p style={{ color: "#ff6700" }} className='mb-1 text-lg font-semibold'>
                        Kart Bilgileri
                        <hr className='mt-2 mb-6' />
                    </p>
                    <div className='flex flex-row gap-4 items-start'>
                        <FormField
                            control={form.control}
                            name="kartSahibi"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Kart Sahibi</FormLabel>
                                    <FormControl>
                                        <Input className='text-sm sm:text-md' placeholder="Kart Üzerindeki İsim" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs -mt-1' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="kartNumarasi"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel>Kart Numarası</FormLabel>
                                    <FormControl>
                                        <Input type='number' className='text-sm sm:text-md' placeholder="1234 5678 9012 3456" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs -mt-1' />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-4 items-start">
                        <FormField
                            control={form.control}
                            name="ay"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>Ay</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className='w-full'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Ay" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem value="01">01</SelectItem>
                                            <SelectItem value="02">02</SelectItem>
                                            <SelectItem value="03">03</SelectItem>
                                            <SelectItem value="04">04</SelectItem>
                                            <SelectItem value="05">05</SelectItem>
                                            <SelectItem value="06">06</SelectItem>
                                            <SelectItem value="07">07</SelectItem>
                                            <SelectItem value="08">08</SelectItem>
                                            <SelectItem value="09">09</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="11">11</SelectItem>
                                            <SelectItem value="12">12</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs -mt-1" />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="yil"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>Yıl</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className='w-full'>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Yıl" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="25">25</SelectItem>
                                            <SelectItem value="26">26</SelectItem>
                                            <SelectItem value="27">27</SelectItem>
                                            <SelectItem value="28">28</SelectItem>
                                            <SelectItem value="29">29</SelectItem>
                                            <SelectItem value="30">30</SelectItem>
                                            <SelectItem value="31">31</SelectItem>
                                            <SelectItem value="32">32</SelectItem>
                                            <SelectItem value="33">33</SelectItem>
                                            <SelectItem value="34">34</SelectItem>
                                            <SelectItem value="35">35</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-xs -mt-1" />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                        <Input type='number' className='text-sm sm:text-md' placeholder="123" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs -mt-1' />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button style={{ backgroundColor: "#ff6700" }} type="submit" className="w-full cursor-pointer">
                        {loading ? <LoaderCircle className='animate-spin' /> : "Ödemeyi Tamamla"}
                    </Button>

                </form>
            </Form>
        </div>
    )
}

export default CheckoutForm