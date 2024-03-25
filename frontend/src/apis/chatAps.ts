import {get, post} from "../utils/request.ts";
import {Chat, ChatMessage, ChatReadDTO} from "../utils/entity.ts";

export const chatSend = async (msg: ChatMessage) => {
    delete msg.id;
    return post<number>('/chat/send', msg);
}

export const chatList = async () => {
    return get<Chat[]>('/chat/list');
}

export const chatAddChat = async (chat: Chat) => {
    delete chat.id;
    return post<number>('/chat/add/chat', chat);
}

export const chatUpdateChat = async (chat: Chat) => {
    return post<number>('/chat/update/chat', chat);
}

export const chatRead = async (chat: ChatReadDTO) => {
    return post<number>('/chat/read', chat);
}

export const chatAll = async (chat: Chat) => {
    return post<ChatMessage[]>('/chat/all', chat);
}