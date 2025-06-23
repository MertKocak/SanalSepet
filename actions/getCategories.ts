import { Category } from "@/constans/type";
import axios from "axios";

const Url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories?populate=*`;

export const getCategories = async (): Promise<Category[]> => {
    const res = await axios.get(Url);
    const data = res.data.data;
    return data;
}