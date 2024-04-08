import React, {useEffect, useState} from "react";
import {CopyrightOutlined, MessageOutlined, UserOutlined} from "@ant-design/icons";
import {Badge, Button, Layout, Menu, MenuProps, message, Space, theme} from "antd";
import ButtonGroup from "antd/es/button/button-group";
import {Link} from "react-router-dom";
import {authLogout} from "../apis/authApis.ts";
import {Content} from "antd/es/layout/layout";
import MessageCenter from "../components/MessageCenter.tsx";
import Personality from "../components/Personality.tsx";
import {doctorMe} from "../apis/doctorApis.ts";
import {userMe} from "../apis/userApis.ts";
import {chatList} from "../apis/chatAps.ts";

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
    // getItem(<Link to={"/about"}>医院简介</Link>, 2),
    getItem(<Link to={"/news"}>新闻动态</Link>, 3),
    getItem(<Link to={"/health"}>健康园地</Link>, 4),
    // getItem(<Link to={"/dept"}>科室简介</Link>, 5),
    getItem(<Link to={"/registration"}>预约问诊</Link>, 6),
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
    const [personalOpen, setPersonalOpen] = useState(false);
    const [unread, setUnread] = useState(0);
    useEffect(() => {
        if (sessionStorage.getItem('token') !== null) {
            const msgTask = setInterval(() => {
                chatList().then(res => {
                    let cnt = 0;
                    res.data.forEach(chat => {
                        cnt += chat.unreadCount !== undefined ? chat.unreadCount : 0;
                    })
                    setUnread(cnt);
                }).catch(err => {
                    messageApi.error("加载消息失败，请检查网络连接！" + err.message);
                })
            }, 2000);
            return () => {
                clearInterval(msgTask);
            }
        }
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem('role') !== null && sessionStorage.getItem('role') !== '4') {
            doctorMe().then(res => {
                sessionStorage.setItem('doctorId', String(res.data.id));
                sessionStorage.setItem('userName', res.data.name);
            }).catch(err => {
                messageApi.error("获取自身信息失败1" + err.message);
            });
        } else if (sessionStorage.getItem('role') !== null) {
            userMe().then(res => {
                sessionStorage.setItem('userName', res.data.name);
            }).catch(err => {
                messageApi.error("获取自身信息失败2" + err.message);
            });
        }
        const queryParams = new URLSearchParams(window.location.search);
        // 从查询参数中获取特定参数的值
        const paramValue = queryParams.get('chatOpen');
        if (paramValue == "1") {
            setChatDrawerOpen(true);
        }
    }, []);

    const onLogout = () => {
        authLogout().then(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('role');
            sessionStorage.removeItem('doctorId');
            sessionStorage.removeItem('phone')
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }).catch(err => {
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
                            <Badge count={unread}>
                                <Button type={'text'} icon={<MessageOutlined/>} style={{border: 'none'}}
                                        onClick={() => setChatDrawerOpen(true)}/>
                            </Badge>
                            <Button type={'text'} icon={<UserOutlined/>} style={{border: 'none'}}
                                    onClick={() => setPersonalOpen(true)}/>
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
                    <div>
                        <MessageCenter open={chatDrawerOpen} setOpen={setChatDrawerOpen}/>
                        <Personality open={personalOpen} setOpen={setPersonalOpen}/>
                    </div>
            }
        </Layout>
    );
}


export default DefaultLayout;