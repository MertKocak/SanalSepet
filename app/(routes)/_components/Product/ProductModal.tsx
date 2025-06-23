import { Product } from '@/constans/type';
import React from 'react'
import ProductModalImages from './ProductModalImages';
import ProductForm from './ProductForm';


interface ProductModalProps {
  product: Product;
}


const ProductModal = ({ product }: ProductModalProps) => {
  return (
    <div className='w-full flex flex-row'>
      <div>
        <ProductModalImages images={product.images} />
      </div>
      <div className='ml-6 flex flex-col justify-between'>
        <div>
          <p style={{ color: "#ff6700" }} className='text-lg md:text-2xl font-bold'>{product.name}</p>
          <p className='text-sm md:text-md font-semibold rounded-lg text-gray-700 mt-1'>{product.category.name}</p>
          <p className='text-xs md:text-[14px] font-normal text-gray-400 mt-1'>{product.desc}</p>
        </div>
        <div className='flex gap-2 flex-row items-end text-end mt-4'>
          <div style={{ backgroundColor: "#ff6700" }} className='rounded-md w-11 h-11 md:h-12 md:w-12  place-content-center text-center'>
            <p className='text-white text-md md:text-xl font-semibold'>%{Math.floor((100 * (product?.mrp - product.sellingPrice)) / product.mrp)}
            </p>
          </div>
          <div className='flex flex-col items-start'>
            <p className={product?.sellingPrice ? 'text-sm md:text-lg font-light text-end md:-mt-1.5 line-through text-gray-400' : 'text-lg font-light text-end -mt-1.5 line-through text-gray-400'}>
              {product?.mrp}₺
            </p>
            {product?.sellingPrice &&
              <p className='text-md md:text-xl text-gray-700 md:-mt-2 font-semibold'>{product?.sellingPrice}₺</p>
            }
          </div>
        </div>
        <ProductForm product={product} />
      </div>
    </div>
  )
}

export default ProductModal