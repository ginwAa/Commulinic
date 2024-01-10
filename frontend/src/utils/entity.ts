
export interface PageRes<T> {
    records: T[],
    total: number,
}

export interface User {
    id?: number,
    name: string,
    password?: string,
    address: string,
    gender: number,
    status: number,
    role: number,
    phone: string,
    age: number,
    emergency: string,
    email: string,
}

export const EMPTY_USER: User = {
    name: '',
    phone: '',
    gender: 0,
    status: 0,
    role: 0,
    age: 0,
    email: '',
    emergency: '',
    address: '',
}

export interface Department {
    id?: number,
    parentId?: number,
    name: string,
    description: string,
}

export const EMPTY_DEPARTMENT = {
    name: '',
    description: '',
}

export interface DepartmentTreeNode {
    value: number,
    parentId?: number | null,
    title: string,
    description: string,
    children: DepartmentTreeNode[],
}

export interface Doctor {
    id?: number,
    userId?: number,
    departmentId: number,
    seniority?: number,
    position: string,
    status: number,
}

export interface DoctorVO {
    id?: number,
    userId: number,
    departmentId: number,
    department?: string,
    seniority: number,
    position: string,
    status: number,
    name: string,
    gender: number,
    phone: string,
    email: string,
}

export const EMPTY_DOCTOR: Doctor = {
    departmentId: 0,
    position: '',
    status: 0,
}

export const EMPTY_DOCTOR_VO: DoctorVO = {
    userId: 0,
    departmentId: 0,
    seniority: 0,
    position: '',
    status: 0,
    name: '',
    gender: 0,
    phone: '',
    email: '',
}

export interface PageDTO<T> {
    size: number,
    offset: number,
    count: boolean,
    data: T,
}