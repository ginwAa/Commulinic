export interface User {
    id: bigint,
    name: string,
    password: string,
    address: string,
    gender: number,
    status: number,
    role: number,
    phone: string,
    age: number,
    emergency: string,
}

export interface PageQueryRes<T> {
    data: T[],
    total: number,
}