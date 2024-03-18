import {Drawer, List, message} from "antd";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const MessageCenter = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();


    return (
        <>
            {contextHolder}
            <Drawer open={props.open} placement={"right"} closable={true} title={"消息列表"}
                    onClose={() => props.setOpen(false)}>
                <List>

                </List>
            </Drawer>
        </>
    )
}

export default MessageCenter;