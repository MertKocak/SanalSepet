/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import useAuthStore from '@/hooks/useAuth'
import React, { useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const UserMenu = () => {

    const { jwt, setJwt } = useAuthStore();
    const router = useRouter()

    useEffect(() => {
        if (typeof window != "undefined") {
            const jwt = localStorage.getItem("jwt");
            const user = localStorage.getItem("user");
            if (jwt && user) {
                const userObj = JSON.parse(user);
                setJwt(jwt)
            }
        }
    }, []);

    const signOut = () => {
        if (typeof window != "undefined") {
            localStorage.removeItem("jwt");
            localStorage.removeItem("user");
            setJwt("");
            router.push("/login")
        }
    }

    return (
        <>
            {jwt ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className='cursor-pointer'>
                        <UserCircle2 className='text-gray-800' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='text-gray-800'>
                        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={'/my-orders'}>
                            <DropdownMenuItem className='cursor-pointer'>Siparişlerim</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className='cursor-pointer' onClick={signOut}>Çıkış</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href={"/login"}>
                    <UserCircle2 className='text-gray-700'></UserCircle2>
                </Link>
            )}
        </>
    )
}

export default UserMenu