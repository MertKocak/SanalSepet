/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Product } from '@/constans/type';
import { useProductFormStore } from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { LoaderCircle, Minus, Plus } from 'lucide-react';
import { addToCart } from '@/actions/cart/addToCart';
import toast from 'react-hot-toast'
import useCartStore from '@/hooks/useCartStore';
import { useRouter } from 'next/navigation';

interface ProductForm {
    product: Product;
    btnVisible?: boolean;
}

const ProductForm = ({ product }: ProductForm) => {

    const { decrementQuantity, incrementQuantity, quantity, reset, selectedColor, selectedSize, setColor, setSize } = useProductFormStore();
    const isThereColor = product.colors.length > 1;
    const isThereSize = product.sizes.length > 1;
    const totalPrice = (quantity * product.sellingPrice).toFixed(2);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const fetchItems = useCartStore((state)=>state.fetchItems)

    let jwt: string | null = "";
    let user: string | null = "";
    let userId = "";

    const idMap: Record<number, number> = {
        168: 152,
        174: 144,
        169: 150,
        170: 148,
        157: 146,
        178: 126,
        159: 128,
        160: 130,
        161: 132,
        175: 134,
        180: 136,
        179: 138,
        165: 142,
        177: 140,
    };


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

    const onAddCart = async () => {
        if(!userId){
            router.push("/login")
            toast.error('Sepete ürün eklemek için lütfen önce giriş yapınız.')
            return;
        }

        if (isThereColor && !selectedColor || isThereSize && !selectedSize) {
            toast.error('Lütfen renk/beden bilgilerini eksiksiz tamamlayınız.')
            return;
        }

        const actualId = idMap[product.id] || product.id;
        try {
            setLoading(true)
            const data = {
                data: {
                    quantity: quantity,
                    totalPrice: totalPrice,
                    size: selectedSize,
                    color: selectedColor,
                    products: actualId,
                    users_permissions_user: userId,
                    userId: userId,
                }
            }
            await addToCart(data, jwt);
            fetchItems(userId,jwt);
            toast.success('Ürün sepete eklendi!')
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        reset();
    }, [product]);

    const handleColorChange = (color: string) => {
        setColor(color);
    }

    const handleSizeChange = (size: string) => {
        setSize(size);
    }

    return (
        <>
            <div className='flex flex-row gap-4 mt-4'>
                {isThereColor ? <Select onValueChange={handleColorChange}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Renk" />
                    </SelectTrigger>
                    <SelectContent>

                        {product?.colors.map((color) => (
                            <SelectItem key={color.id} value={color.name}>{color.name}</SelectItem>
                        ))}


                    </SelectContent>
                </Select> : null}
                {isThereSize ? <Select onValueChange={handleSizeChange}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Beden" />
                    </SelectTrigger>
                    <SelectContent>

                        {product?.sizes.map((size) => (
                            <SelectItem key={size.id} value={size.name}>{size.name}</SelectItem>
                        ))}


                    </SelectContent>
                </Select> : null}
                <div className='flex flex-row items-center gap-4 border px-3 h-[36px] shadow-xs rounded-md'>
                    <Button style={{ backgroundColor: "#ff6700" }} size="xs" disabled={quantity === 1} onClick={decrementQuantity}>
                        <Minus />
                    </Button>
                    <h2 className='mb-0.5 text-gray-600'>{quantity}</h2>
                    <Button style={{ backgroundColor: "#ff6700" }} size="xs" onClick={incrementQuantity}>
                        <Plus />
                    </Button>
                    <div className='text-gray-600 font-normal mb-0.5'>
                        {totalPrice}₺
                    </div>
                </div>

            </div >
            <div className='flex flex-row mt-4'>
                <Button onClick={onAddCart} style={{ backgroundColor: "#ff6700" }} className='flex-1 cursor-pointer'>
                    {loading ? <LoaderCircle className='animate-spin' /> : "Sepete Ekle"}
                </Button>
            </div>
        </>
    )
}

export default ProductForm