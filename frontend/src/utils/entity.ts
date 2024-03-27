
export interface PageRes<T> {
    records: T[],
    total: number,
}

export const EMPTY_PAGE: PageRes<any> = {
    records: [],
    total: 0,
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
    type?: number,
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
    type?: number,
    children: DepartmentTreeNode[],
}

export const DOCTOR_CONSTANT = {
    STATUS_ACTIVE: 2,
    STATUS_ABSENT: 1,
    STATUS_ABORTED: 4,
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
    seniority?: number,
    position: string,
    status: number,
    name: string,
    gender: number,
    phone: string,
    email: string,
    amStd?: number,
    pmStd?: number,
    stock?: number,
    desc: string,
}

export const EMPTY_DOCTOR: Doctor = {
    departmentId: 0,
    position: '',
    status: 0,
}

export const EMPTY_DOCTOR_VO: DoctorVO = {
    userId: 0,
    departmentId: 0,
    position: '',
    status: 0,
    name: '',
    gender: 0,
    phone: '',
    email: '',
    desc: '',
}

export interface DoctorRegisterDTO {
    departmentId: number;
    name: string;
    gender: number;
    section: number;
    beginDate: number,
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
    updatedAt: number;
    status: number;
}

export const EMPTY_APPLICATION: Application = {
    departmentId: 0,
    department: '',
    name: '',
    description: '',
    updatedAt: 0,
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
    createTime?: number;
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
}

export const REGISTER_CONSTANT = {
    STATUS_UNPAID: 1,
    STATUS_PAID: 2,
    STATUS_FINISHED: 4,
    STATUS_ABORTED: 8,
    SECTION_MORNING: 1,
    SECTION_AFTERNOON: 2,
}
export interface PageDTO<T> {
    size: number,
    offset: number,
    count: boolean,
    data: T,
}

export interface AboutInfo {
    description: string
}

export interface authenticationRequest {
    username: string,
    password: string
}

export interface authenticationResponse {
    token: string,
    userId: number,
    userName: string,
    role: number,
}

export interface SystemDict {
    key: string,
    value: string,
}

export const EMPTY_SYSTEM_DICT: SystemDict = {
    key: '',
    value: '',
}

export interface ChatMessage {
    id?: number,
    chatId: number,
    content: string,
    status: number,
    createTime?: string,
    byMe: number,
}

export const EMPTY_CHAT_MESSAGE: ChatMessage = {
    chatId: 0,
    content: '',
    status: 0,
    createTime: '',
    byMe: 0
}

export interface Chat {
    id?: number,
    receiverId: number,
    senderId: number,
    senderName: string,
    revId: number,
    unreadCount: number,
    lastMessage: ChatMessage
}

export const EMPTY_CHAT: Chat = {
    receiverId: 0,
    senderId: 0,
    senderName: '',
    revId: 0,
    unreadCount: 0,
    lastMessage: EMPTY_CHAT_MESSAGE
}

export interface ChatReadDTO {
    chatId: number,
    readTime: string
}