import {Button, Col, Layout, Menu, MenuProps, message, Row, Space, theme} from 'antd';
import {CopyrightOutlined, MessageOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import ButtonGroup from "antd/es/button/button-group";
import {Link} from "react-router-dom";
import NoticeBoard from "../components/NoticeBoard.tsx";
import {authLogout} from "../apis/authApis.ts";
import MedTipBoard from "../components/MedTipBoard.tsx";

const {Header, Content, Footer} = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
): MenuItem {
    return {
        key,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('首页', 1),
    getItem('医生团队', 2),
    getItem('科室导航', 3),
    getItem('预约挂号', 4),
    // getItem('学习知识', 5),
    getItem('联系我们', 6),
];

const Index = () => {
    const [messageApi, contextHolder] = message.useMessage();
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const themeToken = theme.useToken();
    // const handleWindowResize = () => {
    //     setWindowWidth(window.innerWidth);
    // };

    const onLogout = () => {
        authLogout().then(() => {
            sessionStorage.removeItem('token');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }).catch(err => {
            console.log(err);
            messageApi.error("退出登录失败 + " + err.message);
        });
    };

    return (
        <Layout style={{width: '100vw'}}>
            {contextHolder}
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', alignItems: 'center', display: 'flex'}}>
                <div className="logo" style={{alignItems: 'center', padding: '0 0.5rem'}}>
                    <CopyrightOutlined
                        style={{fontSize: '1.5rem', color: themeToken.theme.id === 0 ? "black" : "white"}}/>
                </div>
                <Menu mode="horizontal" defaultSelectedKeys={['1']} items={items}/>
                <Space>
                    <ButtonGroup>
                        <Link to={'/login'} hidden={sessionStorage.getItem('token') !== null}>
                            <Button type={'primary'}>登录 注册</Button>
                        </Link>
                        <div hidden={sessionStorage.getItem('token') === null}>
                            <Button type={'text'} icon={<MessageOutlined/>} style={{border: 'none'}}></Button>
                            <Button type={'text'} icon={<UserOutlined/>} style={{border: 'none'}}></Button>
                            <Button type={'primary'} onClick={onLogout}>注销</Button>
                        </div>
                    </ButtonGroup>
                </Space>
            </Header>
            <Content style={{padding: '0 2rem', marginTop: 64, width: 'max-content', minHeight: '90vh'}}>
                <div className="site-layout-background" style={{padding: 24}}>
                    <Row gutter={[16, 16]}>
                        <Col span={'auto'}>
                            <NoticeBoard/>
                        </Col>
                        <Col span={'auto'}>
                            <MedTipBoard/>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{textAlign: 'center', height: '1rem'}}>社区医院 ©2023 Created by Communlinic</Footer>
        </Layout>
    );
};
export default Index;
