import {Announcement, EMPTY_ANNOUNCEMENT, PageDTO, PageRes} from "../utils/entity.ts";
import {post} from "../utils/request.ts";

export const announcementPage = async (page: number, pageSize: number, announcement: Announcement, count: boolean) => {
    delete announcement.id;
    const dto: PageDTO<Announcement> = {
        count: count,
        size: pageSize,
        offset: (page - 1) * pageSize,
        data: announcement,
    }
    return post<PageRes<Announcement>>('/announcement/page', dto);
}

export const announcementAdd = async (announcement: Announcement) => {
    delete announcement.id;
    return post<number>('/announcement/add', announcement);
}

export const announcementUpdate = async (announcement: Announcement) => {
    return post<number>('/announcement/update', announcement);
}

export const announcementDelete = async (id: number) => {
    const announcement = {
        ...EMPTY_ANNOUNCEMENT,
        id: id
    }
    return post<number>('/announcement/delete', announcement);
}
