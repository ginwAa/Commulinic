import {authenticationResponse, User} from "../utils/entity.ts";
import {post} from "../utils/request.ts";

export const authRegister = async (user: User) => {
    delete user.id;
    return post<authenticationResponse>('/auth/register', user);
};

export const authLogin = async (user: User) => {
    return post<authenticationResponse>('/auth/login', user);
};

export const authLogout = async () => {
    return post('/auth/logout');
}