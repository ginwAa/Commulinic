import axios, {AxiosResponse} from "axios";

interface ApiResponse<T> {
    data: T,
    status: number,
    msg?: string,
}

export const get = async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    try {
        const res: AxiosResponse<T> = await axios.get<T>(url, {params});
        return {
            data: res.data,
            status: res.status,
        };
    } catch (err: any) {
        return {
            data: err.response?.data,
            status: err.response?.status || 500,
            msg: err.message,
        }
    }
}