import {Button, Drawer, List, message, Segmented} from "antd";
import React, {useEffect, useState} from "react";
import {EMPTY_REGISTER, Register} from "../utils/entity.ts";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";
import {registerPage, registerUpdate} from "../apis/registerApis.ts";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const MyWork = (props: Props) => {
    const [data, setData] = useState<Register[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [updated, setUpdated] = useState(0);
    const pageSize = 10;
    const [total, setTotal] = useState(0);
    const [tab, setTab] = useState(0);
    const [regStatus, setRegStatus] = useState(2);
    useEffect(() => {
        setLoading(true);
        const params: Register = {
            ...EMPTY_REGISTER,
            doctorId: Number(sessionStorage.getItem('doctorId')),
            status: regStatus,
            section: tab,
        }
        registerPage(page, pageSize, params, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            messageApi.error("加载预约列表失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [props.open, page, updated, tab, regStatus]);

    const onAccept = (item: Register) => {
        setLoading(true);
        const reg: Register = {
            ...item,
            status: 4,
        }
        registerUpdate(reg).then(() => {
            messageApi.success("操作成功");
            setUpdated(updated ^ 1);
        }).catch(err => {
            messageApi.error("操作失败，请检查网络连接 " + err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const renderRegisterActions = (item: Register) => {
        const ret: React.ReactNode[] = [];
        if (item.status !== 4) {
            ret.push(<Button onClick={() => onAccept(item)}
                             type={'primary'}>完成</Button>);
        }
        return ret;
    }

    return (
        <div>
            {contextHolder}
            <Drawer open={props.open} placement={"right"} closable={true} title={"接诊管理"}
                    onClose={() => props.setOpen(false)} style={{height: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Segmented options={[{label: "上午", value: 0}, {label: "下午", value: 1}]}
                               onChange={value => setTab(Number(value))} value={tab}/>
                    <Segmented options={[{label: "未处理", value: 2}, {label: "已处理", value: 4}]}
                               onChange={value => setRegStatus(Number(value))} value={regStatus}/>
                </div>
                <List dataSource={data} loading={loading} itemLayout="horizontal" style={{height: '100%'}}
                      pagination={{pageSize: pageSize, current: page, total: total, onChange: setPage, size: 'small'}}
                      renderItem={(item) =>
                          <List.Item key={item.id} actions={renderRegisterActions(item)}>
                              <List.Item.Meta
                                  title={<Title level={4}>{item.userName}</Title>}
                                  description={
                                      <div style={{width: 'max-content'}}>
                                          预约时间: {unixSecondToDate(item.date)} {item.section === 1 ? "上午" : "下午"}
                                      </div>
                                  }/>
                              创建时间： {unixSecondToDate(item.createTime)} 订单状态：
                              {
                                  item.status === 1 ? "未支付" :
                                      item.status === 2 ? "未处理" :
                                          item.status === 3 ? "已完成" : "已取消"
                              }
                          </List.Item>
                      }>
                </List>
            </Drawer>
        </div>
    )
}

export default MyWork;