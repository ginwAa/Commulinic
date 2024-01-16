import {Button, Drawer, Input, List, message} from "antd";
import {useEffect, useState} from "react";
import {Application, EMPTY_APPLICATION} from "../utils/entity.ts";
import {applicationPage} from "../apis/applicationApis.ts";

interface ApplyProps {
    applyOpen: boolean;
    setApplyOpen: (visible: boolean) => void;
}

const EditModal = () => {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <>
            {contextHolder}
        </>
    )
}
const ApplicationComponent = (props: ApplyProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [editOpen, setEditOpen] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [data, setData] = useState<Application[]>([EMPTY_APPLICATION]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageProps, setPageProps] = useState<Application>(EMPTY_APPLICATION)

    useEffect(() => {
        setLoading(true);
        applicationPage(pageProps, page, pageSize, true).then(res => {
            setData(res.data.records);
        }).catch(err => {
            messageApi.error(err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [editSuccess])

    return (
        <>
            {contextHolder}
            <Drawer title="坐诊申请" placement="left" open={props.applyOpen} onClose={() => props.setApplyOpen(false)}
                    size={'default'}>
                <Input placeholder={'搜索申请者'}/>
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
                        描述：{item.description}
                    </List.Item>
                }/>
            </Drawer>
        </>
    );
};

export default ApplicationComponent;