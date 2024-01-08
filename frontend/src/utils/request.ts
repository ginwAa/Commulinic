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
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
instance.interceptors.response.use(
    (response) => {
        return Promise.resolve(response);
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
    return instance.get<T>(url, {params}).then(res => {
        if (res.status < 400) {
            return Promise.resolve({
                data: res.data,
                status: res.status,
            });
        } else {
            return Promise.reject({
                data: res.data,
                status: res.status,
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
    return instance.post<T>(url, params).then(res => {
        if (res.status < 400) {
            return Promise.resolve({
                data: res.data,
                status: res.status,
            });
        } else {
            return Promise.reject({
                data: res.data,
                status: res.status,
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

