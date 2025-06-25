/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getToCart = async (userId: unknown, jwt: unknown) => {
    const Url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?filters[userId][$eq]=${userId}&populate[products][populate]=images`;

    try {
        const response = await axios.get(Url, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })

        const data: any = response.data.data;
        const cartItemList = data.map((item: any) => (
            {
                name: item.products[0].name,
                quantity: item.quantity,
                totalPrice: item.totalPrice,
                id: item.documentId,
                color: item.color,
                size: item.size,
                products: item.products[0].id,
                images: item.products[0].images[0].url,
                productsdocID: item.products[0].documentId,
            }
        ))
        return cartItemList

    } catch (error) {
        console.log(error)
    }
}