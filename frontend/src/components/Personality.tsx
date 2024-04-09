import {App, Button, Drawer, Form, Input, InputNumber, Select} from "antd";
import {useEffect, useState} from "react";
import {DoctorVO, User} from "../utils/entity.ts";
import {userMe, userUpdate} from "../apis/userApis.ts";
import {doctorMe, doctorUpdate} from "../apis/doctorApis.ts";

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const Inner = (props: Props) => {
    const {message, modal} = App.useApp();
    const [data, setData] = useState<User>();
    const [docData, setDocData] = useState<DoctorVO>();
    const [updated, setUpdated] = useState(false);
    const [form] = Form.useForm<User>();
    const [docForm] = Form.useForm<DoctorVO>();


    useEffect(() => {
        userMe().then(res => {
            setData(res.data);
        }).catch(err => {
            message.error(err.message);
        });
        if (sessionStorage.getItem('role') !== '4') {
            doctorMe().then(res => {
                setDocData(res.data);
            }).catch(err => {
                message.error(err.message);
            })
        }
    }, [updated]);

    const onUpdateClick = () => {
        modal.warning({
            title: '警告',
            content: '确定要更新吗？',
            onOk: () => {
                form.validateFields().then(values => {
                    values.id = data?.id;
                    if (values.password === '') {
                        delete values.password;
                    }
                    userUpdate(values).then(() => {
                        setUpdated(!updated);
                        props.setOpen(false);
                    }).catch(err => {
                        message.error(err.message);
                        return;
                    })
                    if (sessionStorage.getItem('role') !== '4') {
                        docForm.validateFields().then(async values1 => {
                            values1.id = docData?.id;
                            await doctorUpdate(values1).then(() => {
                                setUpdated(!updated);
                            }).catch(err => {
                                message.error(err.message);
                                return;
                            })
                        })
                    }
                    message.success('修改成功');
                })

            }
        })
    }

    return (
        <>
            <Drawer open={props.open} placement={"right"} closable={true} title={"个人资料"}
                    onClose={() => props.setOpen(false)} style={{height: '100%'}}>
                <Form form={form} preserve={false} size={"small"} initialValues={data}>
                    <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="年龄" name="age" rules={[{required: true, message: '请输入年龄'}]}>
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item label="性别" name="gender" rules={[{required: true, message: '请输入性别'}]}>
                        <Select options={[{value: 1, label: '男'}, {value: 2, label: '女'}]}/>
                    </Form.Item>
                    <Form.Item label="邮箱" name="email"
                               rules={[{required: true, message: '请输入邮箱', type: 'email'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="手机号" name="phone" rules={[{required: true, message: '请输入手机号'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="紧急联系人" name="emergency"
                               rules={[{required: true, message: '请输入紧急联系人'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="地址" name="address" rules={[{required: true, message: '请输入地址'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="密码" name="password" rules={[]}>
                        <Input.Password placeholder="如不需要修改可不填"/>
                    </Form.Item>
                </Form>
                {
                    sessionStorage.getItem('role') === '4' ? <></> :
                        <Form form={docForm} preserve={false} size={"small"} initialValues={docData}>
                            <Form.Item label="就诊室" name="position"
                                       rules={[{required: true, message: '请输入就诊室'}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label="上午最大接诊数" name="amStd"
                                       rules={[{required: true, message: '请输入上午最大接诊数'}]}>
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item label="下午最大接诊数" name="pmStd"
                                       rules={[{required: true, message: '请输入下午最大接诊数'}]}>
                                <InputNumber/>
                            </Form.Item>
                            <Form.Item label="个人简介" name="description"
                                       rules={[{required: true, message: '请输入个人简介'}]}>
                                <Input/>
                            </Form.Item>
                        </Form>
                }
                <Button type={"primary"} htmlType={"submit"} onClick={onUpdateClick}>提交</Button>
            </Drawer>
        </>
    )
}

const Personality = (props: Props) => {
    return (
        <App>
            <Inner open={props.open} setOpen={props.setOpen}/>
        </App>
    )
}

export default Personality;