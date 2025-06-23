import { Product } from '@/constans/type';
import React from 'react'
import ProductModalImages from './ProductModalImages';
import ProductDetailForm from './ProductDetailForm';
import RecentProducts from './RecentProducts';


interface ProductDetailProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
    return (
        <>
            <div className='w-full flex lg:flex-row flex-col  pt-4 md:pt-8 md:pb-12 pb-24'>
                <div>
                    <ProductModalImages images={product.images} />
                </div>
                <div className='mx-6 flex flex-col justify-between'>
                    <div>
                        <p style={{ color: "#ff6700" }} className='text-xl md:text-2xl mt-4 lg:mt-0 font-bold'>{product.name}</p>
                        <p className='text-md md:text-[16px] font-semibold rounded-lg text-gray-700 mt-1'>{product.category.name}</p>
                        <p className='text-md md:text-[16px] font-normal text-gray-400 mt-1'>{product.desc}</p>
                    </div>
                    <div className='flex gap-2 flex-row items-end text-end mt-4'>
                        <div style={{ backgroundColor: "#ff6700" }} className='rounded-md w-14 h-14 md:h-16 md:w-16 place-content-center text-center'>
                            <p className='text-white text-xl md:text-2xl font-semibold'>%{Math.floor((100 * (product?.mrp - product.sellingPrice)) / product.mrp)}
                            </p>
                        </div>
                        <div className='flex flex-col items-start justify-center'>
                            <p className={product?.sellingPrice ? 'text-lg md:text-xl font-light text-end line-through text-gray-400' : ''}>
                                {product?.mrp}₺
                            </p>
                            {product?.sellingPrice &&
                                <p className='text-2xl md:text-3xl text-gray-700 font-bold'>{product?.sellingPrice}₺</p>
                            }
                        </div>
                    </div>
                    <ProductDetailForm product={product} />
                </div>
            </div>
            <RecentProducts />
        </>
    )
}

export default ProductDetail