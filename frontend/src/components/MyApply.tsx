import {App, Button, Drawer, Input, List, TreeSelect} from "antd";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";
import {Application, Department, DepartmentTreeNode, EMPTY_APPLICATION, EMPTY_DEPARTMENT} from "../utils/entity.ts";
import {useEffect, useState} from "react";
import {applicationAdd, applicationCancel, applicationPage} from "../apis/applicationApis.ts";
import {departmentTree} from "../apis/departmentApis.ts";
import {DataNode} from "antd/es/tree";

const transform = (data: DepartmentTreeNode[]): DataNode[] => {
    return data.map((item) => {
        return {
            key: item.value,
            title: item.title,
            value: item.value,
            type: item.type == 0 ? '医院' : item.type == 1 ? '医辅部门' : '医疗部门',
            parentId: item.parentId,
            description: item.description,
            children: item.children ? transform(item.children) : [],
            isLeaf: item.children === undefined || item.children.length === 0,
        }
    });
};

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const Inner = (props: Props) => {
    const {message, notification, modal} = App.useApp();
    const [data, setData] = useState<Application[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const [total, setTotal] = useState(0);
    const [updated, setUpdated] = useState(0);
    const [applyOpen, setApplyOpen] = useState(false);
    const [applyDesc, setApplyDesc] = useState("");
    const [depts, setDepts] = useState<DepartmentTreeNode[]>([]);
    const [selectedNode, setSelectedNode] = useState<Department>(EMPTY_DEPARTMENT);
    const [selectedKey, setSelectedKey] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        departmentTree(0).then(res => {
            setDepts([res.data]);
            if (selectedKey === 0 && res.data.value) {
                setSelectedKey(res.data.value);
            }
            console.log(transform([res.data]));
        }).catch(err => {
            message.error("部门结构信息加载失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
            console.log("tree");
        });

    }, [updated, applyOpen]);
    useEffect(() => {
        setLoading(true);
        const params: Application = {
            ...EMPTY_APPLICATION,
            userId: Number(sessionStorage.getItem("userId")),
        }
        applicationPage(params, page, pageSize, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            message.error("加载预约列表失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [props.open, page, updated]);

    const onAbort = (item: Application) => {
        modal.confirm({
            title: '撤销申请坐诊',
            content: '是否撤销申请坐诊',
            onOk: () => {
                setLoading(true);
                const app: Application = {
                    ...item,
                    status: 16,
                }
                applicationCancel(app).then(() => {
                    message.success("撤销成功");
                    setUpdated(updated ^ 1);
                }).catch(err => {
                    message.error("撤销失败，请检查网络连接 " + err);
                }).finally(() => {
                    setLoading(false);
                });
            }
        });
    }


    const onApprove = () => {
        modal.confirm({
            title: '申请坐诊',
            content: '是否申请坐诊',
            onOk: () => {
                if (!selectedNode.id) {
                    message.warning("请选择所属医疗机构");
                    return;
                }
                setLoading(true);
                const app: Application = {
                    userId: Number(sessionStorage.getItem("userId")),
                    description: applyDesc,
                    departmentId: selectedNode.id,
                    status: 8,
                    department: selectedNode.name,
                    updatedAt: new Date().getTime() / 1000,
                    name: sessionStorage.getItem("userName") as string,
                }
                applicationAdd(app).then(() => {
                    message.success("申请成功");
                    setApplyOpen(false);
                    setUpdated(updated ^ 1);
                }).catch(err => {
                    message.error("申请失败，请检查网络连接 " + err);
                }).finally(() => {
                    setLoading(false);
                });
            }
        })
    }

    const onSelect = (value: number | null, node: DataNode) => {
        if (value) {
            setSelectedKey(value);
            const dept: Department = {
                ...EMPTY_DEPARTMENT,
                id: value,
                name: node.title as string,
            }
            setSelectedNode(dept);
        }
    }

    return (
        <>
            <Drawer open={props.open} placement={"right"} closable={true} title={"我的坐诊申请"}
                    onClose={() => props.setOpen(false)} style={{height: '100%'}}>
                {
                    data.length === 0 || (data[0].status !== 1 && data[0].status !== 8) ?
                        <Button onClick={() => setApplyOpen(true)} type={'primary'}>发起申请</Button> : <></>
                }
                <Drawer open={applyOpen} title={"申请坐诊"} onClose={() => setApplyOpen(false)}>
                    <div style={{height: '100%', justifyContent: 'start', display: 'flex', flexDirection: 'column'}}>
                        <Title level={5}>申请部门</Title>
                        <TreeSelect treeData={transform(depts)} disabled={!depts || depts.length === 0}
                                    treeDefaultExpandAll
                                    dropdownStyle={{maxHeight: 400, overflow: 'auto', width: '10rem'}}
                                    placement={"bottomRight"} onSelect={onSelect} value={selectedKey} size={"small"}/>
                        <Title level={5}>申请理由</Title>
                        <Input.TextArea value={applyDesc} onChange={e => setApplyDesc(e.target.value)}/>
                        <p></p>
                        <Button onClick={onApprove} type={'primary'}>申请</Button>
                    </div>
                </Drawer>
                <List dataSource={data} loading={loading} itemLayout="horizontal" style={{height: '100%'}}
                      pagination={{pageSize: pageSize, current: page, total: total, onChange: setPage, size: 'small'}}
                      renderItem={(item) =>
                          <List.Item key={item.id} actions={[
                              <Button hidden={item.status !== 2 && item.status !== 3} onClick={() => onAbort(item)}
                                      type={'primary'}>撤销</Button>,
                          ]}>
                              <List.Item.Meta
                                  title={<Title
                                      level={4}>{item.status === 2 ? "已通过" : item.status == 3 ? "已拒绝" : item.status === 16 ? "已撤销" : "审核中"}</Title>}
                                  description={
                                      <div style={{width: 'max-content'}}>
                                          申请理由：{item.description}
                                      </div>
                                  }/>
                              更新时间： {unixSecondToDate(item.updatedAt)}
                          </List.Item>
                      }>
                </List>
            </Drawer>
        </>
    )
}

const MyApply = (props: Props) => {
    return (
        <App>
            <Inner open={props.open} setOpen={props.setOpen}/>
        </App>
    )

}

export default MyApply;