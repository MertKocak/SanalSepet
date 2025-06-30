import axios from 'axios';

const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local/register`;


const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    try {
        const response = await axios.post(Urls, {
            username,
            email,
            password,
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const errorMsg =
                error.response?.data?.error?.message || "Kayıt işlemi başarısız oldu.";
            throw new Error(errorMsg);
        } else {
            throw new Error("Bilinmeyen bir hata oluştu.");
        }
    }
};

export default registerUser;