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
    head: string,
    headId: number,
    description: string,
}