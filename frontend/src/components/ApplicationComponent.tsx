import {Button, Drawer, Input, List, message} from "antd";
import {useEffect, useState} from "react";
import {Application, APPLICATION_CONSTANT, EMPTY_APPLICATION} from "../utils/entity.ts";
import {applicationAccept, applicationPage, applicationUpdate} from "../apis/applicationApis.ts";
import {ModalWarning} from "./TableComponents.tsx";
import {unixSecondToDate} from "../utils/time.ts";

interface ApplyProps {
    applyOpen: boolean;
    setApplyOpen: (visible: boolean) => void;
    onChange: () => void;
}

const pageSize = 10;
const ApplicationComponent = (props: ApplyProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [editSuccess, setEditSuccess] = useState(false);
    const [data, setData] = useState<Application[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageProps, setPageProps] = useState<Application>({
        ...EMPTY_APPLICATION,
        status: APPLICATION_CONSTANT.STATUS_WAIT
    });
    const [refuseOpen, setRefuseOpen] = useState(false);
    const [acceptOpen, setAcceptOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Application>(EMPTY_APPLICATION);

    useEffect(() => {
        setLoading(true);
        applicationPage(pageProps, page, pageSize, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            messageApi.error("加载坐诊申请列表失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [editSuccess, pageProps, props.applyOpen])

    const onRefuse = (item: Application) => {
        setSelectedItem(item);
        setRefuseOpen(true);
    };
    const onRefuseOk = () => {
        const target: Application = {
            ...selectedItem,
            status: APPLICATION_CONSTANT.STATUS_REJECT,
        }
        applicationUpdate(target).then(res => {
            messageApi.success('操作成功！' + res);
        }).catch(err => {
            messageApi.error('操作失败！' + err.message);
        }).finally(() => {
            setEditSuccess(!editSuccess);
            setRefuseOpen(false);
        });
    }

    const onAccept = (item: Application) => {
        setSelectedItem(item);
        setAcceptOpen(true);
    }

    const onAcceptOk = () => {
        const target: Application = {
            ...selectedItem,
            status: APPLICATION_CONSTANT.STATUS_PASS,
        }
        applicationAccept(target).then(res => {
            messageApi.success('操作成功！' + res);
        }).catch(err => {
            messageApi.error('操作失败！' + err.message);
        }).finally(() => {
            setAcceptOpen(false);
            setEditSuccess(!editSuccess);
        })
    }

    return (
        <>
            {contextHolder}
            <Drawer title="坐诊申请" placement="left" open={props.applyOpen} onClose={() => props.setApplyOpen(false)}
                    size={'default'}>
                <Input placeholder={'搜索申请者'} value={pageProps.name}
                       onChange={(e) => setPageProps({...pageProps, name: e.target.value})}/>
                <List dataSource={data} loading={loading} itemLayout={'vertical'} renderItem={item =>
                    <List.Item key={item.id} actions={[
                        <Button type={'primary'} size={"small"} onClick={() => onAccept(item)}>同意</Button>,
                        <Button type={'primary'} danger size={"small"} onClick={() => onRefuse(item)}>拒绝</Button>,
                        // <Button size={"small"}>下载附件</Button> // TODO

                    ]}>
                        <List.Item.Meta
                            title={item.name}
                            description={
                                <p>申请部门：{item.department} 最后更新时间:{unixSecondToDate(item.updateAt)}</p>}
                        />
                        描述：{item.description}

                    </List.Item>

                }
                      pagination={{pageSize: pageSize, current: page, total: total, onChange: (page) => setPage(page), size: 'small'}}/>
                <ModalWarning actionName={'拒绝'} name={selectedItem.name} onOk={onRefuseOk} open={refuseOpen}
                              onCancel={() => setRefuseOpen(false)}/>
                <ModalWarning name={selectedItem.name} onOk={onAcceptOk} open={acceptOpen} actionName={'接受'}
                              onCancel={() => setAcceptOpen(false)}/>
            </Drawer>
        </>
    );
};

export default ApplicationComponent;