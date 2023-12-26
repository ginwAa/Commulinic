import {PageRes, User} from "../utils/entity.ts";
import {get, post} from "../utils/request.ts";


interface PageDTO {
    page: number;
    pageSize: number;
    name: string;
    gender: Array<number> | null;
    status: Array<number> | null;
    role: Array<number> | null;
    phone: string;
    age: number;
    email: string;
}

export const userAdd = async (user: User) => {
    return post<number>('/user/add', user);
};
export const userPage = async (user: PageDTO) => {
    return get<PageRes<User>>('/user/page', user);
};

export const userUpdate = async (user: User) => {
    return post<number>('/user/update', user);
};

export const userRegister = async (user: User) => {
    return post<number>('/user/register', user);
}

