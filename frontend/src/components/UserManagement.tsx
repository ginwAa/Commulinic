import {User} from "../utils/entity.ts";
import axios from "axios";
import {useState} from "react";
import {Button, Form, FormInstance, Input, InputNumber, message, Modal, Pagination, Radio, Space, Table,} from "antd";


const fetchData = async (page: number, pageSize: number) => {
    return axios.get("http://localhost:5173/api/user/page", {
        params: {
            page: page,
            pageSize: pageSize,
        }
    });
};


interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: User | null;
    adding: boolean;
    setAdding: (adding: boolean) => void;
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
        form.validateFields().then(() => {
            console.log(form.getFieldValue("name"));
            // TODO send post request
            props.setEditOpen(false);
            props.setAdding(false);
        }).catch(err => {
            console.log(err);
            messageApi.error("请检查用户信息");
        });
    };

    const SexualRadioGroup = (props) => {
        return (
            <Radio.Group value={props.value} onChange={props.onChange} optionType={'button'}>
                <Radio value={1} key={1}>男</Radio>
                <Radio value={2} key={2}>女</Radio>
            </Radio.Group>
        );
    };
    const StatusRadioGroup = (props) => {
        return (
            <Radio.Group value={props.value} onChange={props.onChange} optionType={'button'}>
                <Radio value={1} key={1}>正常</Radio>
                <Radio value={2} key={2}>冻结</Radio>
            </Radio.Group>
        );
    };
    const RoleRadioGroup = (props) => {
        return (
            <Radio.Group value={props.value} onChange={props.onChange} optionType={'button'}>
                <Radio value={1} key={1}>管理员</Radio>
                <Radio value={2} key={2}>医生</Radio>
                <Radio value={3} key={3}>普通用户</Radio>
            </Radio.Group>
        );
    }

    return (
        <>
            {contextHolder}
            <Modal open={props.editOpen} onCancel={() => closeEditModal(false)} onOk={() => closeEditModal(true)}
                   title={'编辑用户'} centered={true} destroyOnClose={true}>
                <Form initialValues={props.adding ? null : props.record} form={form} preserve={false} size={"small"}
                      layout={'horizontal'}>
                    <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="年龄" name="age" rules={[{required: true, message: '请输入年龄'}]}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item label="性别" name="gender" rules={[{required: true, message: '请输入性别'}]}>
                        <SexualRadioGroup/>
                    </Form.Item>
                    <Form.Item label="状态" name="status" rules={[{required: true, message: '请输入状态'}]}>
                        <StatusRadioGroup/>
                    </Form.Item>
                    <Form.Item label="角色" name="role" rules={[{required: true, message: '请输入角色'}]}>
                        <RoleRadioGroup/>
                    </Form.Item>
                    <Form.Item label="手机号" name="phone" rules={[{required: true, message: '请输入手机号'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="地址" name="address" rules={[{required: true, message: '请输入地址'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="紧急联系人" name="emergency"
                               rules={[{required: true, message: '请输入紧急联系人'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={[{required: props.adding, message: '请输入密码'}]}>
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};


const UserManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    // const [data, setData] = useState<User[]>([]);
    const data: User[] = [];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(500);
    for (let i = 0; i < 500; i++) {
        data.push({
            id: BigInt(i),
            name: 'user' + i,
            address: 'addressADDRESSaddress' + i,
            gender: (i % 2) + 1,
            status: 1,
            role: 1,
            phone: '13456789' + i,
            age: 18,
            emergency: 'emergency' + i,
            password: '',
        });
    }


    // useEffect(() => {
    //     fetchData(page, pageSize)
    //         .then(res => {
    //             setData(res.data.records);
    //         }).catch(err => {
    //         console.log(err);
    //     });
    // }, [page, pageSize]);
    // fetchData(page, pageSize)
    //     .then(res => {
    //         setData(res.data.records);
    //     }).catch(err => {
    //     console.log(err);
    // });
    const [editOpen, setEditOpen] = useState(false);
    const [editInfo, setEditInfo] = useState<User | null>(null);
    const [adding, setAdding] = useState(false);
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
            setEditInfo(selectedRows[0]);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };
    return (
        <>
            <Space direction={"horizontal"} style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button.Group>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setAdding(true);
                        setEditOpen(true);
                    }}>新增</Button>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setAdding(false);
                        setEditOpen(true);
                    }} disabled={editInfo === null}>编辑</Button>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        fetchData(page, pageSize).then(res => {
                            // setData(res.data.records);
                            // setTotal(res.data.total);
                        }).catch(err => {
                            console.log(err);
                            messageApi.error("刷新失败，请检查网络连接");
                        });
                    }}>刷新</Button>
                </Button.Group>
                <Pagination defaultCurrent={1} total={total} current={page} pageSize={pageSize} simple
                            style={{width: '50vw', textAlign: 'right'}} responsive={true}
                            onChange={(page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize)
                            }}/>
            </Space>
            <Table dataSource={data} scroll={{x: 'max-content', y: '80vh'}} size={"small"}
                   pagination={{position: ['none'], pageSize: pageSize, current: page, total: total}}
                   rowSelection={{type: 'radio', ...rowSelection}} rowKey={'id'} summary={() => {
                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={5}>总计{total}条</Table.Summary.Cell>
                    </Table.Summary.Row>
                );
            }}>
                <Table.Column title="ID" dataIndex="id" key="id" render={(id: bigint) => id.toString()}/>
                <Table.Column title="姓名" dataIndex="name" key="name"/>
                <Table.Column title="性别" dataIndex="gender" key="gender"
                              render={(gender: number) => gender === 1 ? '男' : '女'}
                              width={'5rem'} filters={[
                    {text: '男', value: 1},
                    {text: '女', value: 2},
                ]
                }/>
                <Table.Column title="状态" dataIndex="status" key="status"
                              render={(status: number) => status === 1 ? '正常' : '禁用'}
                              width={'5rem'} filters={
                    [
                        {text: '正常', value: 1},
                        {text: '禁用', value: 2},
                    ]
                }/>
                <Table.Column title="角色" dataIndex="role" key="role" width={'5rem'}
                              render={(role: number) => role === 1 ? '管理员' : (role === 2 ? '医生' : '普通用户')}
                              filters={
                                  [
                                      {text: '管理员', value: 1},
                                      {text: '医生', value: 2},
                                      {text: '普通用户', value: 3},
                                  ]
                              }/>
                <Table.Column title="地址" dataIndex="address" key="address"/>
                <Table.Column title="手机号" dataIndex="phone" key="phone"/>
                <Table.Column title="年龄" dataIndex="age" key="age" sorter={true} width={'5rem'}/>
                <Table.Column title="紧急联系人" dataIndex="emergency" key="emergency"/>
            </Table>
            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={editInfo} adding={adding}
                       setAdding={setAdding}/>
        </>

    );
}

export default UserManagement;