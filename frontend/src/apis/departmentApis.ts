import {Department, DepartmentTreeNode, PageRes} from "../utils/entity.ts";
import {get, post} from "../utils/request.ts";

interface PageDTO {
    page: number;
    pageSize: number;
    name: string;
    description: string;
    parentId: number;
}

export const departmentGetById = async (id: number) => {
    return get<Department>(`/department/getById/${id}`);
}

export const departmentDelete = async (id: number) => {
    return post<number>(`/department/delete/${id}`);
}

export const departmentPage = async (department: PageDTO) => {
    return get<PageRes<Department>>('/department/page', department);
};

export const departmentAdd = async (department: Department) => {
    return post<number>('/department/add', department);
};

export const departmentUpdate = async (department: Department) => {
    return post<number>('/department/update', department);
};

export const departmentTree = async () => {
    return get<DepartmentTreeNode>('/department/tree');
};

