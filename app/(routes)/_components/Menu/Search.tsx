'use client';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Search = () => {

    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleInput = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuery(event.target.value);
    }

    const handleSearch = () => {
        if(query.trim()){
            router.push(`/search?q=${query}`)
        }
    }

    return (
        <div className='relative hidden w-full xl:max-w-xl lg:max-w-lg lg:flex text-gray-800'>
            <Input onChange={handleInput} />
            <Button onClick={handleSearch} variant="ghost" className="h-9 cursor-pointer absolute right-0 top-0 text-lg">
                <SearchIcon />
            </Button>
        </div>
    )
}

export default Search