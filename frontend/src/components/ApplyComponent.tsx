import {Button, Drawer, Input, List, message} from "antd";
import {useEffect, useState} from "react";
import {DoctorVO, EMPTY_DOCTOR_VO} from "../utils/entity.ts";


interface ApplyProps {
    applyOpen: boolean;
    setApplyOpen: (visible: boolean) => void;
}

const ApplyComponent = (props: ApplyProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [editOpen, setEditOpen] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [data, setData] = useState<DoctorVO[]>([
        {
            ...EMPTY_DOCTOR_VO,
            name: '张三',
            department: '内科',
            position: 'test test',
        },
        {
            ...EMPTY_DOCTOR_VO,
            name: '李四',
            department: '外科',
            position: 'test test',
        },
        {
            ...EMPTY_DOCTOR_VO,
            name: '李四',
            department: '外科',
            position: 'test test',
        },
        {
            ...EMPTY_DOCTOR_VO,
            name: '李四',
            department: '外科',
            position: 'test test',
        },
        {
            ...EMPTY_DOCTOR_VO,
            name: '李四',
            department: '外科',
            position: 'test test',
        },
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // setLoading(true);
    }, [editSuccess])

    return (
        <>
            {contextHolder}
            <Drawer title="坐诊申请" placement="left" open={props.applyOpen} onClose={() => props.setApplyOpen(false)}
                    size={'default'}>
                <Input placeholder={'搜索医生'}/>
                <List dataSource={data} loading={loading} itemLayout={'vertical'} renderItem={item =>
                    <List.Item key={item.id} actions={[
                        <Button type={'primary'} size={"small"}>同意</Button>,
                        <Button type={'primary'} danger size={"small"}>拒绝</Button>,
                        <Button size={"small"}>下载附件</Button>
                    ]}>
                        <List.Item.Meta
                            title={item.name}
                            description={<p>申请部门：{item.department}</p>}
                        />
                        描述：{item.position}
                    </List.Item>
                }/>
            </Drawer>
        </>
    );
};

export default ApplyComponent;