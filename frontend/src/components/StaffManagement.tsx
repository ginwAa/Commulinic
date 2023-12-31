import {User} from "../utils/entity.ts";
import React, {useEffect, useState} from "react";
import {
    Button,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Menu,
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

interface PageProps {
    name: string;
    gender: Array<number> | null;
    status: Array<number> | null;
    role: Array<number> | null;
    phone: string;
    age: number;
    email: string;
}

const fetchData = async (page: number, pageSize: number, props: PageProps) => {
    return userPage({
        page: page,
        pageSize: pageSize,
        ...props,
    });
};


interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: User | null;
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
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-expect-error*/}
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

interface FilterSearchProps {
    searchText: string;
    onSearch: (value: string) => void;
}

const FilterSearch = (props: FilterSearchProps) => {
    const [text, setText] = useState(props.searchText);
    return (
        <Menu>
            <Input size={"small"} value={text} onChange={e => setText(e.target.value)}></Input>
            <Button.Group style={{justifyContent: "right", display: "flex"}}>
                <Button size={"small"} type="primary" onClick={() => props.onSearch(text)}>搜索</Button>
                <Button size={"small"} type="primary" onClick={() => {
                    props.onSearch('');
                    setText('');
                }}>重置</Button>
            </Button.Group>
        </Menu>
    );
}


const StaffManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [pageProps, setPageProps] = useState<PageProps>({
        name: '',
        phone: '',
        gender: null,
        status: null,
        role: null,
        age: 0,
        email: '',
    });
    useEffect(() => {
        setTableLoading(true);
        setSelectedRow(null);
        setSelectedRowKeys([]);
        fetchData(page, pageSize, pageProps)
            .then(res => {
                setData(res.data.records);
                setTotal(res.data.total);
            }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        }).finally(() => {
            setTableLoading(false);
        });
    }, [page, pageSize, pageProps, editSuccess]);
    const [selectedRow, setSelectedRow] = useState<User | null>(null);
    const [adding, setAdding] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: User[]) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRow(selectedRows[0]);
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
                    }} disabled={selectedRow === null}>编辑</Button>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setSelectedRow(null);
                        setSelectedRowKeys([]);
                        fetchData(page, pageSize, pageProps).then(res => {
                            setData(res.data.records);
                            setTotal(res.data.total);
                        }).catch(err => {
                            console.log(err);
                            messageApi.error("刷新失败，请检查网络连接");
                        });
                    }}>刷新</Button>
                </Button.Group>
                <></>
                <Pagination defaultCurrent={1} total={total} current={page} pageSize={pageSize} simple
                            style={{width: '50vw', textAlign: 'right'}} responsive={true}
                            disabled={tableLoading || total === 0}
                            onChange={(page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize)
                            }}/>
            </Space>
            <Table dataSource={data} scroll={{x: 'max-content', y: '80vh'}} style={{minHeight: '80vh'}} size={"small"}
                   loading={tableLoading}
                   pagination={{position: ['none'], pageSize: pageSize, current: page, total: total}}
                   rowSelection={{type: 'radio', ...rowSelection}} rowKey={'id'} summary={() => {
                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={5}>总计{total}条</Table.Summary.Cell>
                    </Table.Summary.Row>
                );
            }}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                   onChange={(pagination: TablePaginationConfig, filters: Record<string, number>, sorter: SorterResult<User> | SorterResult<User>[]) => {
                       console.log('params', filters, sorter, pagination);

                       setPageProps({
                           ...pageProps,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           age: sorter?.order !== undefined ? sorter.order === 'ascend' ? 1 : 2 : 0,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           gender: filters?.gender ? filters?.gender : null,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           role: filters?.role ? filters?.role : null,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           status: filters?.status ? filters?.status : null,
                       });
                   }}
            >
                <Table.Column title="ID" dataIndex="id" key="id" width={'4rem'}/>
                <Table.Column title="姓名" dataIndex="name" key="name" filterIcon={<SearchOutlined/>} width={'7rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.name, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, name: value});
                                      }
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
                                      {text: '普通用户', value: 3},
                                  ]
                              }/>
                <Table.Column title="地址" dataIndex="address" key="address" width={'10rem'}/>
                <Table.Column title="手机号" dataIndex="phone" key="phone" filterIcon={<SearchOutlined/>} width={'8rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.phone, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, phone: value});
                                      }
                              })}/>
                <Table.Column title="年龄" dataIndex="age" key="age" sorter={true} width={'5rem'}/>
                <Table.Column title="紧急联系人" dataIndex="emergency" key="emergency" width={'8rem'}/>
                <Table.Column title="邮箱" dataIndex="email" key="email" filterIcon={<SearchOutlined/>} width={'8rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.email, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, email: value});
                                      }
                              })}/>
            </Table>
            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={selectedRow} adding={adding}
                       setAdding={setAdding} onSuccess={() => setEditSuccess(!editSuccess)}/>
        </>

    );
}

export default StaffManagement;