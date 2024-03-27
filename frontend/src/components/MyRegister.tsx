import {Button, Drawer, List, message} from "antd";
import {useEffect, useState} from "react";
import {EMPTY_REGISTER, Register} from "../utils/entity.ts";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";
import {registerPage, registerUpdate} from "../apis/registerApis.ts";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const MyRegister = (props: Props) => {
    const [data, setData] = useState<Register[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [updated, setUpdated] = useState(0);
    const pageSize = 10;
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setLoading(true);
        const params: Register = {
            ...EMPTY_REGISTER,
            userId: Number(sessionStorage.getItem("userId")),
        }
        registerPage(page, pageSize, params, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            message.error("加载预约列表失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [props.open, page, updated]);

    const onPay = (item: Register) => {
        setLoading(true);
        const reg: Register = {
            ...item,
            status: 2,
        };
        registerUpdate(reg).then(() => {
            messageApi.success("支付成功");
            setUpdated(updated ^ 1);
        }).catch(err => {
            messageApi.error("支付失败，请检查网络连接 " + err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const onAbort = (item: Register) => {
        setLoading(true);
        const reg: Register = {
            ...item,
            status: 8,
        }
        registerUpdate(reg).then(() => {
            messageApi.success("取消成功");
            setUpdated(updated ^ 1);
        }).catch(err => {
            messageApi.error("取消失败，请检查网络连接 " + err);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            {contextHolder}
            <Drawer open={props.open} placement={"right"} closable={true} title={"我的预约"}
                    onClose={() => props.setOpen(false)} style={{height: '100%'}}>
                <List dataSource={data} loading={loading} itemLayout="horizontal" style={{height: '100%'}}
                      pagination={{pageSize: pageSize, current: page, total: total, onChange: setPage, size: 'small'}}
                      renderItem={(item) =>
                          <List.Item key={item.id} actions={[
                              <Button hidden={item.status !== 1} onClick={() => onPay(item)}
                                      type={'primary'}>支付</Button>,
                              <Button hidden={item.status !== 2} onClick={() => onAbort(item)}
                                      type={'primary'}>取消</Button>,
                    ]}>
                        <List.Item.Meta
                            title={<Title level={4}>{item.doctorName}</Title>}
                            description={
                                <div style={{width: 'max-content'}}>
                                    预约时间: {unixSecondToDate(item.date)} {item.section === 1 ? "上午" : "下午"}
                                </div>
                            }/>
                              创建时间： {unixSecondToDate(item.createTime)} 订单状态：
                        {
                            item.status === 1 ? "未支付" :
                                item.status === 2 ? "已支付" :
                                    item.status === 3 ? "已完成" : "已取消"
                        }
                    </List.Item>
                      }>
                </List>
            </Drawer>
        </div>
    )
}

export default MyRegister;