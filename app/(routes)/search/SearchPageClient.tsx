/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductItem from "../_components/Product/ProductItem";
import { Category, Color, Size } from "@/constans/type";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import SearchSkeleton from "../_components/Skeleton/SearchSkeleton";

const SearchPageClient = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState(searchParams.get('q') || '');
    const [color, setColor] = useState(searchParams.get('color') || 'all');
    const [size, setSize] = useState(searchParams.get('size') || 'all');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');

    const [colors, setColors] = useState<Color[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const [query, setQuery] = useState("");

    const [page, setPage] = useState(
        parseInt(searchParams.get('page') ?? '1')
    );
    const [pageSize, setPageSize] = useState(8);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        fetchColorsSizesCategories();
        fetchProducts({
            search: searchParams.get('q') ?? undefined,
            color: searchParams.get('color') ?? undefined,
            category: searchParams.get('category') ?? undefined,
            size: searchParams.get('size') ?? undefined,
            page: parseInt(searchParams.get('page') ?? '1'),
        });
    }, [searchParams.toString()]);


    const fetchColorsSizesCategories = async () => {
        try {

            const colorsResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/colors`);
            setColors(colorsResponse.data.data);

            const sizesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sizes`);
            setSizes(sizesResponse.data.data);

            const categoriesResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`);
            setCategories(categoriesResponse.data.data);



        } catch (error) {
            console.log(error)

        }
    }

    type Filters = {
        search?: string;
        category?: string;
        color?: string;
        size?: string;
        page?: number;
    };

    const fetchProducts = async (filters: Filters = {}) => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (filters.search) {
                params.append('filters[name][$contains]', filters.search);
            }
            if (filters.category && filters.category !== "all") {
                params.append('filters[category][slug][$eq]', filters.category);
            }
            if (filters.color && filters.color !== "all") {
                params.append('filters[colors][name][$eq]', filters.color);
            }
            if (filters.size && filters.size !== "all") {
                params.append('filters[sizes][name][$eq]', filters.size);
            }

            params.append('pagination[page]', String(filters.page || 1));
            params.append('pagination[pageSize]', String(pageSize));

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products?populate=*&${params.toString()}`);
            setProducts(response.data.data);
            setTotalPage(response.data.meta.pagination.pageCount);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateURL = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);

        if (value && value !== 'all') {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        if (key !== 'page') {
            const currentPage = searchParams.get('page');
            if (currentPage !== '1') {
                newParams.set('page', '1');
            }
        }

        const newQuery = newParams.toString();
        const currentQuery = searchParams.toString();

        if (newQuery !== currentQuery) {
            router.push(`/search?${newQuery}`);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const currentQuery = searchParams.get('q') || '';
            if (search !== currentQuery) {
                updateURL("q", search)
            }
        }, 1000)

        return () => clearTimeout(delayDebounceFn);
    }, [search])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleColorChange = (value: string) => {
        setColor(value);
        updateURL("color", value)
    }

    const handleSizeChange = (value: string) => {
        setSize(value);
        updateURL("size", value)
    }

    const handleCategoryChange = (value: string) => {
        setCategory(value);
        updateURL("category", value)
    }

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPage) return;
        setPage(newPage);
        updateURL("page", newPage.toString());
    };

    const handleSearchDelete = () => {
        // Stateleri sıfırla
        setSearch('');
        setColor('all');
        setSize('all');
        setCategory('all');
        setPage(1);

        // URL parametrelerini temizle
        const newParams = new URLSearchParams();
        newParams.set('page', '1'); // sayfayı başa al
        router.push(`/search?${newParams.toString()}`);
    };

    return (

        <div className='mt-8 px-20 xl:px-40 justify-center mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4 mb-8 '>
                <Input value={search} className='w-full' placeholder='Ara...' onChange={handleSearchChange} />
                <Select value={color} onValueChange={handleColorChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tüm Renkler" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tüm Renkler</SelectItem>
                        {colors.map((color) => (
                            <SelectItem key={color.id} value={color.name}> {color.name} </ SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={size} onValueChange={handleSizeChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tüm Bedenler" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tüm Bedenler</SelectItem>
                        {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.name}> {size.name} </ SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tüm Kategoriler" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tüm Kategoriler</SelectItem>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.slug}> {category.name} </ SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleSearchDelete} className='bg-gray-700 text-white cursor-pointer'>
                    <div className="flex flex-row justify-center items-center">
                        <XIcon className="h-8 mr-2" />
                        <p>Aramayı Temizle</p>
                    </div>
                </Button>
            </div>
            <div>
                {loading ?
                    (
                        <SearchSkeleton />
                    )
                    :
                    (
                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                                {products.map((product, index) => (
                                    <ProductItem
                                        key={index}
                                        product={product}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-center items-center mt-8">
                                <Pagination>
                                    <PaginationContent>
                                        {[...Array(totalPage)].map((_, i) => (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    href="#"
                                                    onClick={() => handlePageChange(i + 1)}
                                                    className={i + 1 === page ? 'border' : ''}>{i + 1}
                                                </PaginationLink>
                                            </PaginationItem>))}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    )}
            </div>

        </div >
    )
}

export default SearchPageClient