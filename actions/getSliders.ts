import { Slider } from "@/constans/type";
import axios from "axios";

const Url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sliders?populate=*`;

export const getSliders = async (): Promise<Slider[]> => {
    const res = await axios.get(Url);
    const data = res.data.data;
    return data;
}