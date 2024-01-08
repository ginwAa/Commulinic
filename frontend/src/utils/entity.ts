
export interface PageRes<T> {
    records: T[],
    total: number,
}

export interface User {
    id?: number,
    name: string,
    password: string,
    address: string,
    gender: number,
    status: number,
    role: number,
    phone: string,
    age: number,
    emergency: string,
    email: string,
}

export interface Department {
    id?: number,
    parentId?: number,
    name: string,
    description: string,
}

export interface DepartmentTreeNode {
    value?: number,
    parentId?: number | null,
    title: string,
    description: string,
    children: DepartmentTreeNode[],
}

export interface Doctor {
    id?: number,
    userId: number,
    departmentId: number,
    seniority: number,
    position: string,
    status: number,
}