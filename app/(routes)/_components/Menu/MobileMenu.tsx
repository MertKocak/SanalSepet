import { Category } from '@/constans/type'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

interface MobileMenuProps {
    categories: Category[];
}

const MobileMenu = ({ categories }: MobileMenuProps) => {
    return (
        <Sheet>
            <SheetTrigger>
                <div className='relative cursor-pointer'>
                    <MenuIcon />
                </div>
            </SheetTrigger>
            <SheetContent className='bg-gray-100 pl-4 pt-12'>
                {categories.map((category) => (
                    <Link className='hover:bg-gray-200 text-gray-800 py-2 px-2 -mt-2 rounded-md' key={category.id} href={`/search?category=` + category.slug}>
                        {category.name}
                    </Link>
                ))}

            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu