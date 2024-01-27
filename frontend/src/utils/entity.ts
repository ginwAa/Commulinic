
export interface PageRes<T> {
    records: T[],
    total: number,
}

export const USER_CONSTANT = {
    GENDER_MALE: 1,
    GENDER_FEMALE: 2,
    ROLE_ADMIN: 1,
    ROLE_DOCTOR: 2,
    ROLE_NORMAL: 4,
    STATUS_ACTIVE: 1,
    STATUS_FROZEN: 2,
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

export const DOCTOR_CONSTANT = {
    STATUS_ACTIVE: 2,
    STATUS_ABSENT: 1,
    STATUS_ABORT: 4,
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

export const APPLICATION_CONSTANT = {
    STATUS_WAIT: 1,
    STATUS_PASS: 2,
    STATUS_REJECT: 4,
    STATUS_UNREAD: 8,
}

export interface Application {
    id?: number;
    userId?: number;
    departmentId: number;
    department: string;
    name: string;
    description: string;
    extra?: string;
    updateAt: number;
    status: number;
}

export const EMPTY_APPLICATION: Application = {
    departmentId: 0,
    department: '',
    name: '',
    description: '',
    updateAt: 0,
    status: 0
}

export interface Announcement {
    id?: number;
    title: string;
    content: string;
    updatedAt: number;
}

export const EMPTY_ANNOUNCEMENT: Announcement = {
    title: '',
    content: '',
    updatedAt: 0
}

export interface MedTip {
    id?: number;
    title: string;
    content: string;
    updatedAt: number;
}

export const EMPTY_MED_TIP: MedTip = {
    title: '',
    content: '',
    updatedAt: 0
}

export interface Register {
    id?: number;
    userId?: number;
    doctorId?: number;
    doctorName: string;
    userName: string;
    date: number;
    section: number;
    status: number;
    price: number;
    createTime: number;
}

export const EMPTY_REGISTER: Register = {
    userId: 0,
    doctorId: 0,
    doctorName: '',
    userName: '',
    date: 0,
    section: 0,
    status: 0,
    price: 0,
    createTime: 0
}

export const REGISTER_CONSTANT = {
    STATUS_UNPAID: 1,
    STATUS_PAID: 2,
    STATUS_FINISHED: 4,
    STATUS_ABORTED: 8,
}
export interface PageDTO<T> {
    size: number,
    offset: number,
    count: boolean,
    data: T,
}