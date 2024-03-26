import {Button, Drawer, List, message} from "antd";
import {useEffect, useState} from "react";
import {Chat} from "../utils/entity.ts";
import {chatList} from "../apis/chatAps.ts";
import Title from "antd/es/typography/Title";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const MessageCenter = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);

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
    return (
        <>
            {contextHolder}
            <Drawer open={props.open} placement={"right"} closable={true} title={"消息列表"}
                    onClose={() => props.setOpen(false)}>
                <List dataSource={data} loading={loading} itemLayout="horizontal" renderItem={item =>
                    <List.Item key={item.id} actions={[
                        <Button type={'primary'}>打开</Button>,
                    ]}>
                        <List.Item.Meta
                            title={<Title level={4}>{item.senderName}</Title>}
                            description={
                                <div>
                                    <Title level={5}>
                                        {item.lastMessage.content}
                                    </Title>
                                </div>
                            }/>
                        {item.lastMessage.createTime}
                    </List.Item>
                }/>
            </Drawer>
        </>
    )
}

export default MessageCenter;