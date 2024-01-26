import {MedTip, PageDTO, PageRes} from "../utils/entity.ts";
import {post} from "../utils/request.ts";

export const medTipPage = async (page: number, pageSize: number, medTip: MedTip, count: boolean) => {
    delete medTip.id;
    const dto: PageDTO<MedTip> = {
        count: count,
        size: pageSize,
        offset: (page - 1) * pageSize,
        data: medTip,
    }
    return post<PageRes<MedTip>>('/medTip/page', dto);
}

export const medTipAdd = async (medTip: MedTip) => {
    delete medTip.id;
    return post<number>('/medTip/add', medTip);
}

export const medTipUpdate = async (medTip: MedTip) => {
    return post<number>('/medTip/update', medTip);
}