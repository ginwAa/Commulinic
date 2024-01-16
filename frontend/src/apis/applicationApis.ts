import {post} from "../utils/request.ts";
import {Application, PageDTO, PageRes} from "../utils/entity.ts";


export const applicationAdd = async (application: Application) => {
    delete application.id;
    return post<number>('/application/add', application);
}

export const applicationUpdate = async (application: Application) => {
    return post<number>('/application/update', application);
}

export const applicationPage = async (application: Application, page: number, pageSize: number, count: boolean) => {
    const dto: PageDTO<Application> = {
        count: count,
        size: pageSize,
        offset: (page - 1) * pageSize,
        data: application,
    }
    return post<PageRes<Application>>('/application/page', dto);
}

export const applicationCount = async (application: Application) => {
    return post<number>('/application/count', application);
}