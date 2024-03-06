import axios from "axios";

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
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance.interceptors.response.use(
    res => {
        console.log("111ac", res);
        if (res.status < 400) {
            console.log('here 200');
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    }, error => {
        console.log("111er", error);
        if (error.response.status === 401) {
            console.log('here 401');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)
interface ApiResponse<T> {
    data: T,
    status: number,
    msg?: string,
}

interface Result<T> {
    data: T,
    msg?: string,
    code: number,
}

export const get = async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    return instance.get<Result<T>>(url, {params}).then(res => {
        if (res?.data?.code && res.data.code >= 400) {
            return Promise.reject({
                data: res.data.data,
                status: res.data.code,
                message: res.data.msg,
            });
        } else {
            return Promise.resolve({
                data: res.data.data,
                status: res.data.code,
                message: res.data.msg,
            });
        }
    }).catch(err => {
        return Promise.reject({
            data: err.response?.data,
            status: err.response?.status || 500,
            message: err.message,
        });
    });
}

export const post = async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    return instance.post<Result<T>>(url, params).then(res => {
        if (res?.data?.code && res.data.code >= 400) {
            return Promise.reject({
                data: res.data.data,
                status: res.data.code,
                message: res.data.msg,
            });
        } else {
            return Promise.resolve({
                data: res.data.data,
                status: res.data.code,
                message: res.data.msg,
            });
        }
    }).catch(err => {
        return Promise.reject({
            data: err.response?.data,
            status: err.response?.status || 500,
            message: err.message,
        });
    });
}

