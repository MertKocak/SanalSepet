import axios from 'axios';

const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local/register`;

const registerUser = async (username: unknown, email: unknown, password: unknown) => {
    try {
        const response = await axios.post(Urls, {
            username: username,
            email: email,
            password: password
        })
        return response.data
    } catch (error) {
        console.log("error", error)
        throw error;
    }
}

export default registerUser;