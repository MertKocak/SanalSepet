import { Skeleton } from "@/components/ui/skeleton";

const ProductModalSkeleton = () => {
    return (
        <div className='w-full flex flex-row'>
            {/* Görsel Alanı */}
            <div>
                <Skeleton className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-lg" />
            </div>

            {/* Sağ Taraf */}
            <div className='ml-6 flex flex-col justify-between flex-1'>

                {/* Başlık, kategori, açıklama */}
                <div className="space-y-1">
                    <Skeleton className="h-6 w-3/4" /> {/* Ürün adı */}
                    <Skeleton className="h-4 w-1/3" /> {/* Kategori */}
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                </div>

                {/* İndirim ve fiyatlar */}
                <div className='flex gap-2 flex-row items-end text-end mt-4'>
                    <Skeleton className="w-11 h-11 md:w-12 md:h-12 rounded-md" /> {/* İndirim yüzdesi */}
                    <div className='flex flex-col items-start space-y-1'>
                        <Skeleton className="h-4 w-12" /> {/* Eski fiyat */}
                        <Skeleton className="h-5 w-16" /> {/* Yeni fiyat */}
                    </div>
                </div>

                {/* Sepete Ekle formu */}
                <div className="mt-4">
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default ProductModalSkeleton;
