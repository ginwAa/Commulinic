import {EMPTY_USER, User} from "../utils/entity.ts";
import React, {useEffect, useState} from "react";
import {
    Button,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Pagination,
    Select,
    Space,
    Table,
    TablePaginationConfig,
} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {SorterResult} from "antd/es/table/interface";
import {userAdd, userPage, userUpdate} from "../apis/userApis.ts";
import {FilterSearch} from "./TableComponents.tsx";

const fetchData = userPage;
interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: User; //Record<string, any> = User
    adding: boolean;
    onSuccess: () => void;
}

const EditModal = (props: EditProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm<User>();

    const closeEditModal = (changed: boolean) => {
        console.log("里面 ", props.record);
        if (!changed) {
            props.setEditOpen(false);
            return;
        }
        const formData: User = {
            id: props.record?.id ? props.record.id : -1,
            name: form.getFieldValue("name"),
            password: form.getFieldValue("password"),
            role: form.getFieldValue("role"),
            status: form.getFieldValue("status"),
            gender: form.getFieldValue("gender"),
            phone: form.getFieldValue("phone"),
            age: form.getFieldValue("age"),
            address: form.getFieldValue("address"),
            emergency: form.getFieldValue("emergency"),
            email: form.getFieldValue("email"),
        }
        form.validateFields().then(() => {
            const func = props.adding ? userAdd : userUpdate;
            func(formData).then(() => {
                messageApi.success("操作成功!");
                props.onSuccess();
                props.setEditOpen(false);
                props.setEditOpen(false);
            }).catch(err => {
                console.log(err);
                messageApi.error("请检查网络连接");
            });
        }).catch(() => {
            messageApi.error("请检查用户信息");
        });
    };
    return (
        <>
            {contextHolder}
            <Modal open={props.editOpen} onCancel={() => closeEditModal(false)} onOk={() => closeEditModal(true)}
                   title={'编辑用户'} centered={true} destroyOnClose={true}>
                <Form initialValues={props.adding ? undefined : props.record} form={form} preserve={false}
                      size={"small"} layout={'horizontal'}>
                    <Space direction={"horizontal"}>
                        <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="年龄" name="age" rules={[{required: true, message: '请输入年龄'}]}>
                            <InputNumber/>
                        </Form.Item>
                    </Space>
                    <Space direction={'horizontal'}>
                        <Form.Item label="性别" name="gender" rules={[{required: true, message: '请输入性别'}]}>
                            <Select options={[{value: 1, label: '男'}, {value: 2, label: '女'}]}/>
                        </Form.Item>
                        <Form.Item label="状态" name="status" rules={[{required: true, message: '请输入状态'}]}>
                            <Select options={[{value: 1, label: '正常'}, {value: 2, label: '冻结'}]}/>
                        </Form.Item>
                    </Space>
                    <Space direction={'horizontal'}>
                        <Form.Item label="角色" name="role" rules={[{required: true, message: '请输入角色'}]}>
                            <Select options={[{value: 1, label: '管理员'}, {value: 2, label: '医生'}, {
                                value: 3,
                                label: '普通用户'
                            }]} style={{width: '6rem'}}/>
                        </Form.Item>
                        <Form.Item label="邮箱" name="email"
                                   rules={[{required: true, message: '请输入邮箱', type: 'email'}]}>
                            <Input/>
                        </Form.Item>
                    </Space>
                    <Space direction={'horizontal'}>
                        <Form.Item label="手机号" name="phone" rules={[{required: true, message: '请输入手机号'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="紧急联系人" name="emergency"
                                   rules={[{required: true, message: '请输入紧急联系人'}]}>
                            <Input/>
                        </Form.Item>
                    </Space>
                    <Form.Item label="地址" name="address" rules={[{required: true, message: '请输入地址'}]}>
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
    const [data, setData] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [pageProps, setPageProps] = useState<User>(EMPTY_USER);
    useEffect(() => {
        setTableLoading(true);
        setSelectedRow(EMPTY_USER);
        setSelectedKey(0);
        fetchData(pageProps, page, pageSize, true)
            .then(res => {
                setData(res.data.records);
                setTotal(res.data.total);
            }).catch(err => {
            messageApi.error("加载用户失败，请检查网络连接", err.message);
        }).finally(() => {
            setTableLoading(false);
        });
    }, [page, pageSize, pageProps, editSuccess]);

    const [selectedRow, setSelectedRow] = useState<User>(EMPTY_USER);
    const [adding, setAdding] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const rowSelection = {
        selectedRowKeys: [selectedKey],
        onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
            setSelectedKey(selectedRowKeys[0] as number);
            setSelectedRow(selectedRows[0]);
            console.log("row ", selectedRows[0]);
        },
    };

    return (
        <>
            {contextHolder}
            <Space direction={"horizontal"} style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button.Group>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setAdding(true);
                        setEditOpen(true);
                    }}>新增</Button>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setAdding(false);
                        setEditOpen(true);
                    }} disabled={selectedKey === 0}>编辑</Button>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setEditSuccess(!editSuccess)
                    }}>刷新</Button>
                </Button.Group>
                <Pagination defaultCurrent={1} total={total} current={page} pageSize={pageSize} simple responsive={true}
                            style={{width: '50vw', textAlign: 'right'}} disabled={tableLoading || total === 0}
                            onChange={(page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }} showSizeChanger/>
            </Space>
            <Table dataSource={data} scroll={{x: 'max-content', y: '80vh'}} style={{minHeight: '80vh'}} size={"small"}
                   loading={tableLoading} pagination={false} rowSelection={{type: 'radio', ...rowSelection}}
                   rowKey={'id'} summary={() => {
                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={5}>总计{total}条</Table.Summary.Cell>
                    </Table.Summary.Row>
                );
            }}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                   onChange={(pagination: TablePaginationConfig, filters: Record<string, number[]>, sorter: SorterResult<User> | SorterResult<User>[]) => {
                       console.log('params', filters, sorter, pagination);

                       setPageProps({
                           ...pageProps,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           age: sorter?.order ? sorter?.order === 'ascend' ? 1 : 2 : 0,
                           gender: filters?.gender ? filters.gender.reduce((pre, v) => pre | v, 0) : 0,
                           role: filters?.role ? filters.role.reduce((pre, v) => pre | v, 0) : 0,
                           status: filters?.status ? filters.status.reduce((pre, v) => pre | v, 0) : 0,
                       });
                   }}
            >
                <Table.Column title="ID" dataIndex="id" key="id" width={'4rem'}/>
                <Table.Column title="姓名" dataIndex="name" key="name" filterIcon={<SearchOutlined/>} width={'7rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.name, onSearch:
                                      (value: string) => setPageProps({...pageProps, name: value})
                              })}/>
                <Table.Column title="性别" dataIndex="gender" key="gender" width={'5rem'}
                              render={(gender: number) => gender === 1 ? '男' : '女'}
                              filters={
                                  [
                                      {text: '男', value: 1},
                                      {text: '女', value: 2},
                                  ]
                }/>
                <Table.Column title="状态" dataIndex="status" key="status" width={'5rem'}
                              render={(status: number) => status === 1 ? '正常' : '禁用'}
                              filters={
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
                                      {text: '普通用户', value: 4},
                                  ]
                              }/>
                <Table.Column title="地址" dataIndex="address" key="address" width={'10rem'}/>
                <Table.Column title="手机号" dataIndex="phone" key="phone" filterIcon={<SearchOutlined/>} width={'8rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.phone, onSearch:
                                      (value: string) => setPageProps({...pageProps, phone: value})
                              })}/>
                <Table.Column title="年龄" dataIndex="age" key="age" sorter={true} width={'5rem'}/>
                <Table.Column title="紧急联系人" dataIndex="emergency" key="emergency" width={'8rem'}/>
                <Table.Column title="邮箱" dataIndex="email" key="email" filterIcon={<SearchOutlined/>} width={'8rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.email, onSearch:
                                      (value: string) => setPageProps({...pageProps, email: value})
                              })}/>
            </Table>
            {
                editOpen ? <EditModal editOpen={true} setEditOpen={setEditOpen} record={selectedRow} adding={adding}
                                      onSuccess={() => setEditSuccess(!editSuccess)}/>
                    : <></>
            }

        </>
    );
}

export default UserManagement;