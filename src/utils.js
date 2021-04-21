/**
 * Created by Chalo
 */
// export const fetcher = async (url) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`);
//     const data = await response.json();
//
//     console.log("data", data);
//
//     return data;
// };
import api from "@/lib/api";

/**
 * Created by Chalo
 */
export const fetcher = async (url) => {
    const response = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`);

    console.log("data", response);

    return response.data;
};