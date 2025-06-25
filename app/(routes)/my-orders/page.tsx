/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import useCartStore from '@/hooks/useCartStore';
import React, { useEffect, useState } from 'react'

const MyOrdersPage = () => {

    const { items, fetchItems } = useCartStore();
    const [fetchTrigger, setFetchrigger] = useState(false)

    let jwt: string | null = "";
    let user: string | null = "";
    let userId = "";

    try {
        jwt = localStorage.getItem("jwt");
        user = localStorage.getItem("user")
        if (user) {
            const userObj = JSON.parse(user)
            userId = userObj.id
        }
    } catch (error) {
        console.log(error)
    }

    useEffect(()=>{
        fetchItems(userId, jwt);
    },[userId, jwt, fetchItems, fetchTrigger])

    return (
        <div>MyOrdersPage</div>
    )
}

export default MyOrdersPage