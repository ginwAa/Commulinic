import {User} from "../utils/entity.ts";
import {get, post} from "../utils/request.ts";

interface PageRes {
    records: User[];
    total: number;
}

interface PageDTO {
    page: number;
    pageSize: number;
    name: string;
    gender: Array<number> | null;
    status: Array<number> | null;
    role: Array<number> | null;
    phone: string;
    age: number;
}

export const userAdd = async (user: User) => {
    return post('/user/add', user);
};
export const userPage = async (user: PageDTO) => {
    return get<PageRes>('/user/page', user);
};

export const userUpdate = async (user: User) => {
    return post('/user/update', user);
};


