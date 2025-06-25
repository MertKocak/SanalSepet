/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const deleteCart = async (id: string, jwt: string | null) => {

  console.log("gelen id:" + id)

  if (!jwt) {
    console.error("JWT token yok!");
    return;
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts/${id}`;

  try {
    const response = await axios.delete(url, {
      /* params: { id: id }, */
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Silme işlemi sırasında hata:", error?.response?.data || error.message);
    return null;
  }
};
