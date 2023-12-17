import {User} from "../utils/entity.ts";
import axios from "axios";
import {useState} from "react";
import {Button, Form, FormInstance, Input, InputNumber, Modal, Radio, Table} from "antd";


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

interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: User | null;
}

const EditModal = (props: EditProps) => {
    const [form] = Form.useForm<FormInstance>();

    form.setFieldsValue(props.record);
    const closeEditModal = (changed: boolean) => {
        if (!changed) {
            props.setEditOpen(false);
            return;
        }
        form.validateFields().then(() => {
            console.log(form.getFieldValue("name"));
            // TODO send post request
            props.setEditOpen(false);
        }).catch(err => {
            console.log(err);
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
        <Modal open={props.editOpen} onCancel={() => closeEditModal(false)} onOk={() => closeEditModal(true)}
               title={'编辑用户'} centered={true} destroyOnClose={true}>
            <Form initialValues={props.record} form={form} preserve={false} size={"small"} layout={'horizontal'}>
                <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]} labelAlign={''}>
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
                <Form.Item label="紧急联系人" name="emergency" rules={[{required: true, message: '请输入紧急联系人'}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label="密码" name="password">
                    <Input.Password/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const UserManagement = (props: ManagementProps) => {
    // const [data, setData] = useState<User[]>([]);
    const data: User[] = [];
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
    const showEditModal = (record: User) => {
        setEditInfo(record);
        setEditOpen(true);
    };
    return (
        <>
            <Table dataSource={data} scroll={{x: 'max-content', y: '82vh'}} style={{paddingTop: '2vh'}} size={"small"}
                   pagination={{position: ['none'], pageSize: props.pageSize, current: props.page, total: props.total}}
            >
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
                <Table.Column title="操作" width={'5rem'} dataIndex="operation" key="operation"
                              render={(_, record: User) => {
                                  return (
                                      <Button type="primary" size="small" onClick={() => showEditModal(record)}
                                              title={'编辑用户'}>编辑</Button>
                                  );
                              }}/>
            </Table>
            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={editInfo}/>
        </>

    );
}

export default UserManagement;