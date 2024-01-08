import {
    Button,
    Card,
    Descriptions,
    DescriptionsProps,
    Drawer,
    Empty,
    Form,
    FormInstance,
    Input,
    List,
    message,
    Modal,
    Space,
    Spin,
    Table,
    TreeSelect
} from "antd";
import {useEffect, useState} from "react";
import {Department, DepartmentTreeNode} from "../utils/entity.ts";
import {
    departmentAdd,
    departmentDelete,
    departmentGetById,
    departmentTree,
    departmentUpdate
} from "../apis/departmentApis.ts";
import {DataNode} from "antd/es/tree";

// const transform = (data: DepartmentTreeNode[]): DataNode[] => {
//     return data.map((item) => {
//         return {
//             title: item.title,
//             value: item.key,
//             parentId: item.parentId,
//             description: item.description,
//             children: item.children ? transform(item.children) : [],
//             isLeaf: item.children === undefined || item.children.length === 0,
//         }
//     });
// };

interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: Department | null;
    adding: boolean;
    setAdding: (adding: boolean) => void;
    onSuccess: () => void;
}

const EditModal = (props: EditProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm<FormInstance>();

    const closeEditModal = (changed: boolean) => {
        if (!changed) {
            props.setEditOpen(false);
            props.setAdding(false);
            return;
        }
        const formData: Department = {
            name: form.getFieldValue('name'),
            description: form.getFieldValue('description'),
        };
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
                </Form>
            </Modal>
        </>
    );
}

interface ApplyProps {
    applyOpen: boolean;
    setApplyOpen: (visible: boolean) => void;
}

const ApplyDrawer = (props: ApplyProps) => {

    return (
        <>
            <Drawer title="坐诊申请" placement="left" open={props.applyOpen} onClose={() => props.setApplyOpen(false)}
                    size={'large'}>
                <List/>
            </Drawer>
        </>
    );
}
const DepartmentManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<DepartmentTreeNode[]>([]);
    const [selectedKey, setSelectedKey] = useState<number | null>(null);
    const [selectedNode, setSelectedNode] = useState<Department | null>(null);
    const [editSuccess, setEditSuccess] = useState(false);
    const [adding, setAdding] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [applyOpen, setApplyOpen] = useState(false);
    const getDescription = async (key: number | null) => {
        if (!key) {
            setDescription([]);
            setSelectedNode(null);
            return;
        }
        departmentGetById(key).then(res => {
            if (!res || !res.data) {
                setDescription([]);
                setSelectedNode(null);
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
            ]);
            setSelectedNode(node);
        }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        });
    };
    const [description, setDescription] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        console.log("tree");
        setLoading(true);
        departmentTree().then(res => {
            setData([res.data]);
            if (selectedKey === null && res.data.value) {
                setSelectedKey(res.data.value);
            }
        }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        }).finally(() => {
            setLoading(false);
        });
    }, [editSuccess]);

    useEffect(() => {
        console.log("get desc");
        setLoading(true);
        getDescription(selectedKey).catch(err => {
            throw new Error(err);
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedKey]);
    const onSelect = (value: number, node: DataNode) => {
        setSelectedKey(value);
        console.log("selected ", node);
    }

    const onDelete = (id: number) => {
        setLoading(true);
        departmentDelete(id).then(() => {
            setSelectedKey(null);
            setEditSuccess(!editSuccess);
            messageApi.success("删除成功");
        }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
            {contextHolder}
            <Space direction={"horizontal"} style={{display: 'flex', justifyContent: 'space-between'}}>
                <TreeSelect treeData={data} disabled={!data || data.length === 0} placeholder={'选择部门'}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto', width: 'max-content'}}
                            placement={"bottomLeft"} onSelect={onSelect} value={selectedKey}/>
                <Button.Group>
                    <Button type={'primary'} onClick={() => setApplyOpen(true)}>查看坐诊申请</Button>
                    <Button type={'primary'} disabled={selectedNode === null} onClick={() => {
                        setAdding(true);
                        setEditOpen(true);
                    }}>新增子部门</Button>
                    <Button type={'primary'} disabled={selectedNode === null} onClick={() => {
                        setAdding(false);
                        setEditOpen(true);
                    }}>编辑</Button>
                    <Button type={'primary'} disabled={selectedNode === null}
                            onClick={() => onDelete(selectedNode.id)}>删除</Button>
                    <Button type={'primary'} onClick={() => {
                        setEditSuccess(!editSuccess);
                    }}>刷新</Button>
                </Button.Group>
            </Space>
            <Spin spinning={loading}>
                <Card size={'small'} title={'部门信息'}>
                    {
                        description === undefined || description.length === 0 ?
                            <Empty/> :
                            <Descriptions items={description} size={"small"}/>
                    }
                </Card>
                <Card size={'small'} title={'部门成员'}>
                    <Table size={"small"} showHeader={false}/>
                </Card>
            </Spin>

            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={selectedNode} adding={adding}
                       setAdding={setAdding} onSuccess={() => setEditSuccess(!editSuccess)}/>
            <ApplyDrawer applyOpen={applyOpen} setApplyOpen={setApplyOpen}/>
        </>
    );
}

export default DepartmentManagement;