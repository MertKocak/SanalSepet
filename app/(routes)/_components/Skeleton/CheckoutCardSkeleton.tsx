import { Skeleton } from "@/components/ui/skeleton";

const CheckoutCardSkeleton = () => {
    return (
        <div className='flex w-full justify-between items-center flex-row border p-2 rounded-2xl mt-2 mb-2'>
            <div className='flex flex-row items-center'>
                {/* Görsel */}
                <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl" />

                {/* Ürün bilgileri */}
                <div className='flex flex-col ml-2 mr-2 space-y-1'>
                    <Skeleton className="h-4 w-36 sm:w-44" /> {/* Ürün adı */}
                    <Skeleton className="h-3 w-24" /> {/* Adet */}
                    <Skeleton className="h-3 w-28" /> {/* Renk / Beden */}
                    <Skeleton className="h-4 w-20" /> {/* Fiyat */}
                </div>
            </div>

            {/* Çöp Kutusu */}
            <Skeleton className="sm:h-8 h-6 sm:w-8 w-6 rounded-full" />
        </div>
    );
};

export default CheckoutCardSkeleton;
