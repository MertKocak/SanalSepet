'use client';

import Logo from '@/components/Logo'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import Card from './Card'
import UserMenu from './UserMenu'
import { getCategories } from '@/actions/getCategories';
import Link from 'next/link';
import { Category } from '@/constans/type';
import NavSkeleton from '../Skeleton/NavSkeleton';
import MobileMenu from './MobileMenu';

const Navbar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [jwt, setJwt] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    // Kategorileri çek
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getCategories();
                setCategories(categories);
            } catch (error) {
                console.log("Kategoriler yüklenirken hata oluştu.", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    // localStorage'dan kullanıcı verilerini çek
    useEffect(() => {
        try {
            const jwtFromStorage = localStorage.getItem("jwt") ?? "";
            const userFromStorage = localStorage.getItem("user");

            setJwt(jwtFromStorage);

            if (userFromStorage) {
                const userObj = JSON.parse(userFromStorage);
                setUserId(userObj.id);
            }
        } catch (error) {
            console.log("localStorage erişim hatası:", error);
        }
    }, []);

    return (
        <>
            <header className='flex py-4 border-b text-gray-800'>
                <div className='flex items-center container justify-between mx-auto px-20 xl:px-40'>
                    <Logo />
                    <Search />
                    <div className='flex items-center space-x-4'>
                        <Card jwt={jwt} userId={userId} />
                        <UserMenu />
                        <div className='flex lg:hidden'>
                            <MobileMenu categories={categories} />
                        </div>
                    </div>
                </div>
            </header>
            <nav className='hidden lg:flex border-b py-1 text-gray-700 text-sm justify-center font-medium'>
                <div className='hidden lg:flex gap-8'>
                    {loading ? (
                        <div className='py-1'>
                            <NavSkeleton />
                        </div>
                    ) : (
                        categories.map((category) => (
                            <Link className='hover:bg-gray-100 py-2 px-3 rounded-md' key={category.id} href={`/search?category=${category.slug}`}>
                                {category.name}
                            </Link>
                        ))
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
