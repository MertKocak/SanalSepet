import axios from 'axios';

const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local`;

const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(Urls, {
      identifier: email,
      password: password,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data?.error?.message || 'Giriş işlemi başarısız oldu';
      throw new Error(errorMsg);
    } else {
      throw new Error('Bilinmeyen bir hata oluştu.');
    }
  }
};

export default loginUser;