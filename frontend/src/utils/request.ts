import axios from "axios";

const instance = axios.create({
    baseURL: '/api',
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
        if (res.status < 500) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    }, error => {
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
        if (res?.data?.code && res.data.code >= 500) {
            return Promise.reject({
                data: res.data.data,
                status: res.data.code,
                msg: res.data.msg,
            });
        } else {
            return Promise.resolve({
                data: res.data.data,
                status: res.data.code,
                msg: res.data.msg,
            });
        }
    }).catch(err => {
        return Promise.reject({
            data: err.response?.data,
            status: err.response?.status || 500,
            msg: err.message,
        });
    });
}

export const post = async <T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> => {
    return instance.post<Result<T>>(url, params).then(res => {
        if (res?.data?.code && res.data.code >= 500 || res.data.code === 0) {
            return Promise.reject({
                data: res.data.data,
                status: res.data.code,
                msg: res.data.msg,
            });
        } else {
            return Promise.resolve({
                data: res.data.data,
                status: res.data.code,
                msg: res.data.msg,
            });
        }
    }).catch(err => {
        return Promise.reject({
            data: err.response?.data,
            status: err.response?.status || 500,
            msg: err.message,
        });
    });
}

