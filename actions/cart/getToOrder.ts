/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getToOrder = async (userId: unknown, jwt: unknown) => {
    const Url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders?filters[userId][$eq]=${userId}&populate[OrderedProducts][populate][product][populate]=images`;

    try {
        const response = await axios.get(Url, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })

        const data: any = response.data.data;
        const orderList = data.map((item: any) => (
            {
                id: item.id,
                subtotal: item.subtotal,
                paymentText: item.paymentText,
                userId: item.userId,
                OrderedProducts: item.OrderedProducts,
                createdAt: item.createdAt
            }
        ))
        return orderList

    } catch (error) {
        console.log(error)
    }
}