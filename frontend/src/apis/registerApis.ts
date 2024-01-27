import {post} from "../utils/request.ts";
import {PageDTO, PageRes, Register} from "../utils/entity.ts";

export const registerPage = async (page: number, pageSize: number, register: Register, count: boolean) => {
    delete register.id;
    delete register.userId;
    delete register.doctorId;
    const dto: PageDTO<Register> = {
        count: count,
        size: pageSize,
        offset: (page - 1) * pageSize,
        data: register,
    }
    return post<PageRes<Register>>('/register/page', dto);
}

export const registerAdd = async (register: Register) => {
    delete register.id;
    return post<number>('/register/add', register);
}

export const registerUpdate = async (register: Register) => {
    return post<number>('/register/update', register);
}