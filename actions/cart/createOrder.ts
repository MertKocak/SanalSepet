import axios from "axios";

const Url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders`;

export const createOrder = async (data: unknown, jwt: unknown) => {


    console.log(data)

    try {
        const response = await axios.post(Url, data, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        })

        return response.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Strapi Hatası:", error.response?.data);
        } else {
            console.log("Bilinmeyen hata:", error);
        }
    }
}