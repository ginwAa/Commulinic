import {
    Badge,
    Button,
    Descriptions,
    DescriptionsProps,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Spin,
    TreeSelect
} from "antd";
import {useEffect, useState} from "react";
import {
    Application,
    APPLICATION_CONSTANT,
    Department,
    DepartmentTreeNode,
    EMPTY_APPLICATION,
    EMPTY_DEPARTMENT
} from "../utils/entity.ts";
import {
    departmentAdd,
    departmentDelete,
    departmentGetById,
    departmentTree,
    departmentUpdate
} from "../apis/departmentApis.ts";
import {DataNode} from "antd/es/tree";
import DoctorComponent from "./DoctorComponent.tsx";
import {ModalWarning} from "./TableComponents.tsx";
import ApplicationComponent from "./ApplicationComponent.tsx";
import {applicationCount, applicationUpdate} from "../apis/applicationApis.ts";

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

interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: Department;
    adding: boolean;
    setAdding: (adding: boolean) => void;
    onSuccess: () => void;
}

const EditModal = (props: EditProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm<Department>();

    const closeEditModal = (changed: boolean) => {
        if (!changed) {
            props.setEditOpen(false);
            props.setAdding(false);
            return;
        }
        const formData: Department = form.getFieldsValue();
        if (!props.adding) {
            formData.id = props.record?.id;
            if (props.record?.parentId) {
                formData.parentId = props.record?.parentId;
            }
        }
        if (props.adding) {
            formData.parentId = props.record?.id;
        }
        form.validateFields().then(() => {
            console.log("valid ", formData);
            const func = props.adding ? departmentAdd : departmentUpdate;
            func(formData).then(() => {
                messageApi.success('操作成功');
                props.onSuccess();
                props.setEditOpen(false);
                props.setEditOpen(false);
            }).catch(err => {
                console.log(err);
                messageApi.error('请检查网络连接');
            });
        })
    };

    return (
        <>
            {contextHolder}
            <Modal open={props.editOpen} title="编辑部门" onOk={() => closeEditModal(true)}
                   onCancel={() => closeEditModal(false)} destroyOnClose={true} centered={true}>
                <Form form={form} initialValues={props.adding ? undefined : props.record} preserve={false}
                      size={"small"} layout={'horizontal'}>
                    <Form.Item name="name" label="部门名称" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="description" label="部门描述">
                        <Input.TextArea/>
                    </Form.Item>
                    <Form.Item name="type" label="部门类型" hidden={props.record.type === 0}>
                        <Select options={[{value: 1, label: '医辅部门'}, {value: 2, label: '医疗部门'}]}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}


const DepartmentManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<DepartmentTreeNode[]>([]);
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const [selectedNode, setSelectedNode] = useState<Department>(EMPTY_DEPARTMENT);
    const [editSuccess, setEditSuccess] = useState(false);
    const [adding, setAdding] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [applyOpen, setApplyOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [unread, setUnread] = useState(0);
    const getDescription = async (key: number) => {
        if (!key) {
            setSelectedKey(0);
            setDescription([]);
            setSelectedNode(EMPTY_DEPARTMENT);
            return;
        }
        console.log("get desc ", key);
        departmentGetById(key).then(res => {
            if (!res || !res.data) {
                setDescription([]);
                setSelectedNode(EMPTY_DEPARTMENT);
                return;
            }
            const node = res.data;
            setDescription([
                {
                    key: '1',
                    label: '部门名称',
                    children: node.name,
                },
                {
                    key: '2',
                    label: '部门描述',
                    children: node.description ? node.description : '',
                },
                {
                    key: '3',
                    label: '部门类型',
                    children: node.type === 1 ? '医辅部门' : '医疗部门',
                }
            ]);
            setSelectedNode(node);
        }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        });
    };
    const [description, setDescription] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        setLoading(true);
        departmentTree(0).then(res => {
            setData([res.data]);
            if (selectedKey === 0 && res.data.value) {
                setSelectedKey(res.data.value);
            }
            console.log(transform([res.data]));
        }).catch(err => {
            messageApi.error("部门结构信息加载失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
            console.log("tree");
        });

    }, [editSuccess, applyOpen]);
    useEffect(() => {
        setLoading(true);
        getDescription(selectedKey).catch(err => {
            messageApi.error("部门详细信息加载失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedKey]);
    useEffect(() => {
        applicationCount({
            ...EMPTY_APPLICATION,
            status: APPLICATION_CONSTANT.STATUS_UNREAD,
        }).then(res => {
            setUnread(res.data);
        }).catch(err => {
            messageApi.error("坐镇申请信息加载失败，请检查网络连接！" + err.message);
        })
    }, [editSuccess]);
    const onSelect = (value: number | null, node: DataNode) => {
        if (value) {
            setSelectedKey(value);
        }
        console.log("selected ", node);
    }

    const onDelete = (id: number | undefined) => {
        if (id) {
            setLoading(true);
            departmentDelete(id).then(() => {
                setSelectedKey(0);
                setEditSuccess(!editSuccess);
                messageApi.success("删除成功");
            }).catch(err => {
                console.log(err);
                messageApi.error("加载失败，请检查网络连接");
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    const onApplyOpen = () => {
        setApplyOpen(true);
        const params: Application = {
            ...EMPTY_APPLICATION,
            status: APPLICATION_CONSTANT.STATUS_UNREAD,
        }
        applicationUpdate().then(res => {

        })
    }

    return (
        <>
            {contextHolder}
            <Space direction={"horizontal"} style={{display: 'flex', justifyContent: 'space-between'}}>
                <TreeSelect treeData={transform(data)} disabled={!data || data.length === 0} treeDefaultExpandAll
                            dropdownStyle={{maxHeight: 400, overflow: 'auto', width: '10rem'}}
                            placement={"bottomRight"} onSelect={onSelect} value={selectedKey} size={"small"}/>
                <Badge count={unread} showZero={true} size={"small"}>
                    <Button size={'small'} type={'primary'} onClick={onApplyOpen}>查看坐诊申请</Button>
                </Badge>
                <Button.Group size={'small'}>

                    <Button type={'primary'} disabled={selectedKey === 0} onClick={() => {
                        setAdding(true);
                        setEditOpen(true);
                    }}>新增子部门</Button>
                    <Button type={'primary'} disabled={selectedKey === 0} onClick={() => {
                        setAdding(false);
                        setEditOpen(true);
                    }}>编辑</Button>
                    <Button type={'primary'} disabled={selectedKey === 0}
                            onClick={() => setDeleteOpen(true)}>删除</Button>
                    <Button type={'primary'} onClick={() => {
                        setEditSuccess(!editSuccess);
                    }}>刷新</Button>
                </Button.Group>
            </Space>
            <Spin spinning={loading}>
                <Descriptions items={selectedKey === 0 ? [] : description} title={'部门详情'} bordered={true}/>
                <DoctorComponent departmentId={selectedKey} treeData={selectedKey === 0 ? [] : transform(data)}
                                 parentChange={editSuccess}/>
            </Spin>

            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={selectedNode} adding={adding}
                       setAdding={setAdding} onSuccess={() => setEditSuccess(!editSuccess)}/>
            <ApplicationComponent applyOpen={applyOpen} setApplyOpen={setApplyOpen}
                                  onChange={() => setEditSuccess(!editSuccess)}/>
            <ModalWarning actionName={'删除'} name={selectedNode.name} onOk={() => {
                setDeleteOpen(false);
                onDelete(selectedNode.id);
            }}
                          open={deleteOpen} onCancel={() => setDeleteOpen(false)}/>
        </>
    );
}

export default DepartmentManagement;