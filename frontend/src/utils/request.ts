import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5173/api',
});
instance.defaults.timeout = 5000;

instance.interceptors.request.use(function (config) {
    for (const key in config.params) {
        if (Array.isArray(config.params[key])) {
            config.params[key] = config.params[key].join(',');
        }
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance.interceptors.response.use(
    (response) => {
        return response;
    }, function (error) {
        return Promise.reject(error);
    }
)
interface ApiResponse<T> {
    data: T,
    status: number,
    msg?: string,
}

export const get = async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    try {
        const res: AxiosResponse<T> = await instance.get<T>(url, {params});
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

export const post = async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    try {
        const res: AxiosResponse<T> = await instance.post<T>(url, params);
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

