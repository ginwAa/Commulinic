import {Avatar, Badge, Button, Drawer, Input, List, message} from "antd";
import {useEffect, useState} from "react";
import {Chat, ChatMessage, ChatReadDTO} from "../utils/entity.ts";
import {chatAll, chatList, chatRead, chatSend} from "../apis/chatAps.ts";
import Title from "antd/es/typography/Title";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const MessageCenter = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [chat, setChat] = useState<Chat | undefined>(undefined);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMsg, setInputMsg] = useState("");

    useEffect(() => {
        setLoading(true);
        chatList().then(res => {
            setData(res.data);
        }).catch(err => {
            messageApi.error("加载消息列表失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [props.open]);

    useEffect(() => {
        if (chat) {
            chatAll(chat).then(res => {
                res.data.reverse();
                setMessages(res.data);
            }).catch(err => {
                setChatOpen(false);
                messageApi.error("加载消息失败，请检查网络连接！" + err.message);
            });
        }
    }, [chatOpen]);


    const onChatOpen = (chat: Chat) => {
        chat.unreadCount = 0;
        const chatDTO: ChatReadDTO = {
            chatId: chat.id as number,
        }
        setChat(chat);
        setChatOpen(true);
        chatRead(chatDTO).then().catch(err => {
            messageApi.error("读取消息失败，请检查网络连接！" + err.message);
        });
    };

    const onSendMsg = () => {
        if (chat === undefined) {
            return;
        }
        const sendMsg: ChatMessage = {
            content: inputMsg,
            chatId: chat.revId as number,
            status: 2,
            byMe: 0,
        }
        chatSend(sendMsg).then(() => {
            setInputMsg("");
            messageApi.success("发送成功！");
            chat.lastMessage = sendMsg;
            setMessages([...messages, sendMsg]);
        }).catch(err => {
            messageApi.error("发送失败，请检查网络连接！" + err.message);
        });
    }

    return (
        <>
            {contextHolder}
            <Drawer open={props.open} placement={"right"} closable={true} title={"消息列表"}
                    onClose={() => props.setOpen(false)}>
                <List dataSource={data} loading={loading} itemLayout="horizontal" renderItem={item =>
                    <List.Item key={item.id} actions={[
                        <Badge count={item.unreadCount}><Button type={'primary'}
                                                                onClick={() => onChatOpen(item)}>打开</Button></Badge>,
                    ]}>
                        <List.Item.Meta
                            title={<Title level={3}>{item.senderName}</Title>}
                            description={
                                <div>
                                    <Title level={5}>
                                        {item?.lastMessage?.content}
                                    </Title>
                                </div>
                            }/>
                        {item?.lastMessage?.createTime}
                    </List.Item>
                }/>
                <Drawer open={chatOpen} placement={"right"} closable={true} title={chat?.senderName}
                        onClose={() => setChatOpen(false)} footer={
                    <Input value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} suffix={
                        <Button type="primary" onClick={onSendMsg}>发送</Button>
                    }/>
                }>
                    <List dataSource={messages} itemLayout="horizontal" renderItem={item =>
                        <List.Item key={item.id}>
                            <List.Item.Meta title={item.byMe ? "我" : "对方"}
                                            avatar={<Avatar size={"small"}>{item.byMe ? "我" : chat?.senderName.at(0)}
                                            </Avatar>}/>
                            {item.content}
                            <List.Item.Meta description={<div
                                style={{display: "flex", justifyContent: "flex-end"}}>{item.createTime}</div>}/>
                        </List.Item>
                    }/>
                </Drawer>
            </Drawer>
        </>
    )
}

export default MessageCenter;