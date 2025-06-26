import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
    return (
        <div className='w-full px-20 xl:px-48 flex lg:flex-row flex-col pt-4 md:pt-8 md:pb-12 pb-24'>
            {/* Sol görsel alanı */}
            <div className="flex justify-center">
                <Skeleton className="w-[320px] h-[300px] md:h-[400px] rounded-lg" />
            </div>

            {/* Sağ içerik alanı */}
            <div className='mt-6 ml-8 lg:mt-0 flex flex-col justify-between w-full'>

                {/* Başlık ve açıklamalar */}
                <div className="space-y-2">
                    <Skeleton className="h-8 w-3/4" /> {/* ürün ismi */}
                    <Skeleton className="h-5 w-1/3" /> {/* kategori ismi */}
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                </div>

                {/* Fiyat alanı */}
                <div className='flex gap-2 flex-row items-end text-end mt-6'>
                    <Skeleton className="w-14 h-14 md:h-16 md:w-16 rounded-md" />
                    <div className='flex flex-col items-start justify-center space-y-2'>
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-7 w-24" />
                    </div>
                </div>

                {/* Buton veya form alanı */}
                <div className="mt-6">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;
