import axios from "axios";

const Url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts`;

export const addToCart = async (data: unknown, jwt: unknown) => {
    try {
        const response = await axios.post(Url, data, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })

        return response.data
        
    } catch (error) {
        console.log(error)
    }
}