'use client'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Product } from '@/constans/type';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductModal from './ProductModal';
import ProductImages from './ProductImages';
import { useRouter } from 'next/navigation';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // sadece client tarafında çalışır
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint = 768px
    };

    handleResize(); // ilk renderda çalışsın
    window.addEventListener('resize', handleResize); // ekran boyutu değişirse tekrar çalışsın

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      router.push(`/product/${product.slug}`);
    }
  };

  return (
    <div className='group border rounded-xl hover:shadow-md transition-all cursor-pointer flex flex-col justify-between h-full duration-300 '>
      <Link href={`/product/${product.slug}`} className=' flex flex-col items-center justify-center p-4 lg:p-6'>
        <ProductImages images={product.images} />
        <div>
          <p className='font-semibold text-sm md:text-lg text-gray-700 mt-2'>{product.name}</p>
          <p className='text-xs md:text-[14px] font-normal text-gray-400 mt-1 line-clamp-2'>{product.desc}</p>
          <div className='flex gap-2 flex-row items-end text-end mt-4 -mb-1'>
            <div style={{ backgroundColor: "#ff6700" }} className='rounded-md w-11 h-11 md:h-12 md:w-12 place-content-center text-center'>
              <p className='text-white text-md md:text-xl font-semibold'>%{Math.floor((100 * (product?.mrp - product.sellingPrice)) / product.mrp)}</p>
            </div>
            <div className='flex flex-col items-start'>
              <p className={product?.sellingPrice ? 'text-sm md:text-[16px] font-light text-end md:mb-1 line-through text-gray-400' : ''}>
                {product?.mrp}₺
              </p>
              {product?.sellingPrice &&
                <p className='text-md md:text-xl  md:-mt-2 font-semibold text-gray-700'>{product?.sellingPrice}₺</p>
              }
            </div>
          </div>
        </div>
      </Link>

      <div className='flex flex-col w-full pt-0 lg:pt-0 p-4 lg:p-6'>
        {isMobile ? (
          <Button
            onClick={handleClick}
            style={{ backgroundColor: "#ff6700" }}
            className='cursor-pointer w-full flex-1'
          >
            Sepete Ekle
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: "#ff6700" }} className='cursor-pointer w-full flex-1'>
                Sepete Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[900px] rounded-3xl'>
              <ProductModal product={product} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

export default ProductItem;
