import {get, post} from "../utils/request.ts";
import {SystemDict} from "../utils/entity.ts";

export const dictAdd = async (dict: SystemDict) => {
    return post<number>('/systemDict/add', dict);
}

export const dictUpdate = async (dict: SystemDict) => {
    return post<number>('/systemDict/update', dict);
}

export const doctorGetById = async (id: string) => {
    return get<SystemDict>(`/systemDict/getById/${id}`);
}