import {
    Button,
    Card,
    Checkbox,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Layout,
    message,
    Segmented,
    Select,
    Space,
} from "antd";
import {useState} from "react";
import {AlertOutlined, HomeOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout";

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [tab, setTab] = useState<number>(1);
    return (
        <Layout style={{width: '100vw', minHeight: '100vh', alignItems: 'center'}}>
            <Content>
                {contextHolder}
                <Card style={{minWidth: '60vw', maxWidth: '90vw', textAlign: 'center', marginTop: '5vh'}}>
                    <Segmented options={[{label: '登录', value: 1}, {label: '注册', value: 2}]} block size={'large'}
                               value={tab} onChange={value => setTab(Number(value))}
                               style={{width: '100%'}}/>
                    <Space direction={"vertical"} style={{marginTop: '2rem'}} align={"center"}>
                        {tab === 1 ? <LoginTab/> : <RegisterTab/>}
                    </Space>
                </Card>
            </Content>
        </Layout>


    )
}

const LoginTab = () => {
    const [form] = Form.useForm<FormInstance>();

    return (
        <Form form={form}>
            <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]}>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码'}]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Space>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Form.Item name="forgot">
                    <a>忘记密码</a>
                </Form.Item>
            </Space>

            <Form.Item>
                <Button type="primary" htmlType="submit" size={'middle'} onClick={}>登录</Button>
            </Form.Item>
        </Form>

    )
}

const RegisterTab = () => {
    const [form] = Form.useForm<FormInstance>();
    return (
        <Form form={form} labelCol={{span: 7}}>
            <Form.Item label="姓名" name="name" rules={[{required: true, message: '请输入姓名'}]}>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{required: true, message: '请输入密码'}]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="确认密码" name="confirm" dependencies={['password']}
                       rules={[{required: true, message: '请再次输入密码'}]}>
                <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{required: true, message: '请输入邮箱', type: 'email'}]}>
                <Input prefix={<MailOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="验证码" name="code" rules={[{required: true, message: '请输入验证码'}]}>
                <Input suffix={<Button size={'small'} type={'primary'}>发送验证码</Button>}/>
            </Form.Item>
            <Form.Item label="手机号" name="phone" rules={[{required: true, message: '请输入手机号'}]}>
                <Input prefix={<PhoneOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="紧急联系人" name="emergency" rules={[{required: true, message: '请输入紧急联系人'}]}>
                <Input prefix={<AlertOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="地址" name="address" rules={[{required: true, message: '请输入地址'}]}>
                <Input prefix={<HomeOutlined className="site-form-item-icon"/>}/>
            </Form.Item>
            <Form.Item label="性别" name="role" rules={[{required: true, message: '请输入性别'}]}>
                <Select options={[{value: 1, label: '男'}, {value: 2, label: '女'}]}/>
            </Form.Item>
            <Form.Item label="年龄" name="status"
                       rules={[{required: true, message: '请检查年龄', type: 'number', min: 1}]}>
                <InputNumber/>
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked"
                       rules={[{
                           validator: (_, value) =>
                               value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                       }]}
            >
                <Checkbox> I have read the <a href="">agreement</a> </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={'middle'}>注册</Button>
            </Form.Item>
        </Form>
    )
}

const ForgetTab = () => {
    return (
        <></>
    );
}

export default Login;