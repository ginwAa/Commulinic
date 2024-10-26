import {get, post} from "../utils/request.ts";
import {Doctor, DoctorRegisterDTO, DoctorVO, PageDTO, PageRes} from "../utils/entity.ts";

export const doctorAdd = async (doctor: Doctor) => {
    delete doctor.id;
    return post<number>('/doctor/add', doctor);
}

export const doctorPage = async (page: number, pageSize: number, doctor: DoctorVO, count: boolean) => {
    delete doctor.department;
    const dto: PageDTO<DoctorVO> = {
        count: count,
        size: pageSize,
        offset: (page - 1) * pageSize,
        data: doctor,
    };
    return post<PageRes<DoctorVO>>('/doctor/page', dto);
}

export const doctorUpdate = async (doctor: Doctor) => {
    console.log("update api", doctor);
    return post<number>('/doctor/update', doctor);
}

export const doctorGetById = async (id: number) => {
    return get<DoctorVO>(`/doctor/getById/${id}`);
}

export const doctorPageReg = async (page: number, pageSize: number, doctor: DoctorRegisterDTO, count: boolean) => {
    const dto: PageDTO<DoctorRegisterDTO> = {
        count: count,
        size: pageSize,
        offset: (page - 1) * pageSize,
        data: doctor,
    };
    return post<PageRes<DoctorVO>>('/doctor/page/register', dto);
}

export const doctorMe = async () => {
    return get<DoctorVO>('/doctor/entity/me');
}
