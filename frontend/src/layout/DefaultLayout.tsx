import React, {useState} from "react";
import {CopyrightOutlined, MessageOutlined, UserOutlined} from "@ant-design/icons";
import {Button, Layout, Menu, MenuProps, message, Space, theme} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {Link} from "react-router-dom";
import {authLogout} from "../apis/authApis.ts";
import {Content} from "antd/es/layout/layout";
import MessageCenter from "../components/MessageCenter.tsx";

const {Header, Footer} = Layout;
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
    getItem(<Link to={"/"}>网站首页</Link>, 1),
    getItem(<Link to={"/about"}>医院简介</Link>, 2),
    getItem(<Link to={"/news"}>新闻动态</Link>, 3),
    getItem(<Link to={"/health"}>健康园地</Link>, 4),
    getItem(<Link to={"/dept"}>科室简介</Link>, 5),
    getItem(<Link to={"/registration"}>预约挂号</Link>, 6),
];

interface MainContentProps {
    component: React.FC;
    tabKey: number;
    breadcrumbItems: {
        title: string;
    }[];
}

const DefaultLayout = (props: MainContentProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const themeToken = theme.useToken();
    const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
    // const handleWindowResize = () => {
    //     setWindowWidth(window.innerWidth);
    // };

    const onLogout = () => {
        authLogout().then(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('role');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }).catch(err => {
            console.log(err);
            messageApi.error("退出登录失败 + " + err.message);
        });
    };

    return (
        <Layout style={{width: '100vw', alignItems: 'center', display: 'flex', minHeight: '100vh'}}>
            {contextHolder}
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', alignItems: 'center', display: 'flex'}}>
                <div className="logo" style={{alignItems: 'center'}}>
                    <CopyrightOutlined
                        style={{fontSize: '1.5rem', color: themeToken.theme.id === 0 ? "black" : "white"}}/>
                </div>
                <Menu mode="horizontal" defaultSelectedKeys={[props.tabKey.toString()]} items={items}
                      style={{width: '100%'}}/>
                <Space>
                    <ButtonGroup>
                        <Link to={'/login'} hidden={sessionStorage.getItem('token') !== null}>
                            <Button type={'primary'}>登录 注册</Button>
                        </Link>
                        <div hidden={sessionStorage.getItem('token') === null} style={{width: 'max-content'}}>
                            <Button type={'text'} icon={<MessageOutlined/>} style={{border: 'none'}}
                                    onClick={() => setChatDrawerOpen(true)}/>
                            <Button type={'text'} icon={<UserOutlined/>} style={{border: 'none'}}/>
                            <Button type={'primary'} onClick={onLogout}>注销</Button>
                        </div>
                    </ButtonGroup>
                </Space>
            </Header>
            <Content style={{padding: '0 2rem', marginTop: 64, width: '90%'}}>
                <props.component/>
            </Content>
            <Footer style={{textAlign: 'center', height: '1rem', width: '100%'}}>
                社区医院 ©2023 Created by Communlinic
            </Footer>
            {
                sessionStorage.getItem('token') === null ? <></> :
                    <MessageCenter open={chatDrawerOpen} setOpen={setChatDrawerOpen}/>
            }
        </Layout>
    );
}


export default DefaultLayout;