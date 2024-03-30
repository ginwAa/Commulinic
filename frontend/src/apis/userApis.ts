import {PageDTO, PageRes, User} from "../utils/entity.ts";
import {get, post} from "../utils/request.ts";

export const userAdd = async (user: User) => {
    delete user.id;
    return post<number>('/user/add', user);
};
export const userPage = async (user: User, page: number, pageSize: number, count: boolean) => {
    delete user.password;
    const dto: PageDTO<User> = {
        count: count,
        size: pageSize,
        offset: (page - 1) * pageSize,
        data: user,
    }
    return post<PageRes<User>>('/user/page', dto);
};

export const userUpdate = async (user: User) => {
    return post<number>('/user/update', user);
};


export const userGetById = async (id: number) => {
    return get<User>(`/user/${id}`);
}

export const userMe = async () => {
    return post<User>('/user/me');
}