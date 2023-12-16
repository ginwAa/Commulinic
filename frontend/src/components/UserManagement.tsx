import {ColumnsType, ColumnType} from "antd/lib/table";
import {User} from "../utils/entity.ts";
import axios from "axios";
import {useState} from "react";
import {Button, Form, Input, Modal, Space, Table} from "antd";

const columns: ColumnsType<User> = [
    {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        render: (id: bigint) => id.toString(),
        width: '3rem',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: (gender: number) => gender === 1 ? '男' : '女',
        width: '4rem',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status: number) => status === 1 ? '正常' : '禁用',
        width: '4rem',
    },
    {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        render: (role: number) => role === 1 ? '管理员' : '普通用户',
        width: '5rem',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: '4rem',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        ellipsis: true,
    },
    {
        title: '紧急联系人',
        dataIndex: 'emergency',
        key: 'emergency',
    },
];

const fetchData = async (page: number, pageSize: number) => {
    return axios.get("http://localhost:5173/api/user/page", {
        params: {
            page: page,
            pageSize: pageSize,
        }
    });
};

interface ManagementProps {
    page: number;
    pageSize: number;
    total: number;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setTotal: (total: number) => void;
}

const UserManagement = (props: ManagementProps) => {
    // const [data, setData] = useState<User[]>([]);
    const data: User[] = [];
    for (let i = 0; i < 500; i++) {
        data.push({
            id: BigInt(i),
            name: 'user' + i,
            address: 'addressADDRESSaddress' + i,
            gender: 1,
            status: 1,
            role: 1,
            phone: '13456789' + i,
            age: 18,
            emergency: 'emergency' + i,
            password: '',
        });
    }

    const [editOpen, setEditOpen] = useState(false);
    let editInfo: User = data[0];
    const showEditModal = (user: User) => {
        editInfo = user;
        setEditOpen(true);
        console.log(editInfo);
    };
    const closeEditModal = (changed: boolean) => {
        if (changed) {
            // TODO send post request
        }
        setEditOpen(false);
    };
    const tableOps: ColumnType<User> = {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record: User) => {
            return (
                <>
                    <Space>
                        <Button type="primary" size="small" onClick={() => showEditModal(record)}
                                title={'编辑用户'}>编辑</Button>
                    </Space>
                </>

            );
        }
    };
    if (columns.length < 10) {
        columns.push(tableOps);
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
    return (
        <>
            <Table columns={columns} dataSource={data} scroll={{x: 'max-content', y: '80vh'}}
                   style={{paddingTop: '2vh'}}
                   pagination={{position: ['none'], pageSize: props.pageSize, current: props.page, total: props.total}}
                   size={"middle"}
            >
            </Table>
            <Modal open={editOpen} onCancel={() => closeEditModal(false)} onOk={() => closeEditModal(true)}
                   title={'编辑用户'}>
                <Form>
                    <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]}>
                        <Input value={editInfo.name}/>
                    </Form.Item>
                    <Form.Item label="地址" name="address" rules={[{required: true, message: '请输入地址'}]}>
                        <Input value={editInfo.address}/>
                    </Form.Item>
                    <Form.Item label="性别" name="gender" rules={[{required: true, message: '请输入性别'}]}>
                        <Input value={editInfo.gender}/>
                    </Form.Item>
                    <Form.Item label="状态" name="status" rules={[{required: true, message: '请输入状态'}]}>
                        <Input value={editInfo.status}/>
                    </Form.Item>
                    <Form.Item label="角色" name="role" rules={[{required: true, message: '请输入角色'}]}>
                        <Input value={editInfo.role}/>
                    </Form.Item>
                    <Form.Item label="手机号" name="phone" rules={[{required: true, message: '请输入手机号'}]}>
                        <Input value={editInfo.phone}/>
                    </Form.Item>
                    <Form.Item label="年龄" name="age" rules={[{required: true, message: '请输入年龄'}]}>
                        <Input value={editInfo.age}/>
                    </Form.Item>
                    <Form.Item label="紧急联系人" name="emergency"
                               rules={[{required: true, message: '请输入紧急联系人'}]}>
                        <Input value={editInfo.emergency}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
}

export default UserManagement;