import {List, message, Segmented} from "antd";
import {useState} from "react";

const CommunityManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [seg, setSeg] = useState(1)
    return (
        <>
            {contextHolder}
            <Segmented options={[{label: '公告', value: 1}, {label: '医学知识', value: 2}]} value={seg} block
                       onChange={(v) => setSeg(Number(v))}/>
            <List/>
        </>
    )
}

export default CommunityManagement;