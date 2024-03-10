import {Department, DepartmentTreeNode} from "../utils/entity.ts";
import {get, post} from "../utils/request.ts";


export const departmentGetById = async (id: number) => {
    return get<Department>(`/department/getById/${id}`);
}

export const departmentDelete = async (id: number) => {
    return post<number>(`/department/delete/${id}`);
}

export const departmentAdd = async (department: Department) => {
    delete department.id;
    return post<number>('/department/add', department);
};

export const departmentUpdate = async (department: Department) => {
    return post<number>('/department/update', department);
};

export const departmentTree = async (type: number) => {
    return get<DepartmentTreeNode>(`/department/tree/${type}`);
};

export const departmentTreeReg = async () => {
    return get<DepartmentTreeNode>('/department/tree/register');
};

