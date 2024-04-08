import React, {useEffect, useState} from 'react';
import {
    CopyrightOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Badge, Breadcrumb, Button, Layout, Menu, message, Space, theme, Typography} from 'antd';
import siderItems from "../utils/siderSettings.tsx";
import MessageCenter from "../components/MessageCenter.tsx";
import Personality from "../components/Personality.tsx";
import {chatList} from "../apis/chatAps.ts";

const {Text} = Typography;
const {Content, Sider} = Layout;


interface MainContentProps {
    component: React.FC;
    tabKey: number;
    breadcrumbItems: {
        title: string;
    }[];
}


const ManagementLayout: React.FC<MainContentProps> = (props: MainContentProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [collapsed, setCollapsed] = useState(localStorage.getItem('admin/siderCollapsed') === 'true');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
    const [personalOpen, setPersonalOpen] = useState(false);
    const themeToken = theme.useToken();
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
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
        localStorage.setItem('admin/siderCollapsed', String(collapsed));
    }, [collapsed]);


    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Layout style={{minHeight: '100vh', width: '100vw'}}>
            {contextHolder}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                   defaultCollapsed={false}
                   width='10rem' collapsedWidth={windowWidth <= 750 ? '0' : '4rem'} trigger={null} theme='light'
            >
                <Space direction="vertical" style={{display: 'flow'}} size='small'>
                    <div className="demo-logo-vertical" style={{textAlign: 'center'}}>
                        <div className="logo-icon" style={{padding: '1rem'}}>
                            <CopyrightOutlined
                                style={{fontSize: '2rem', color: themeToken.theme.id === 0 ? "black" : "white"}}/>
                        </div>
                        <div className="logo-text" style={{visibility: collapsed ? 'hidden' : 'visible'}}>
                            <Text strong>ComMuLiNiC</Text>
                        </div>
                    </div>
                    <Menu mode="vertical" theme={"light"} defaultSelectedKeys={[props.tabKey.toString()]}
                          items={siderItems} triggerSubMenuAction="click">
                    </Menu>
                </Space>
            </Sider>
            <Layout>
                <Content style={{padding: '1vh 1rem'}}>
                    <Space direction={'horizontal'} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Space direction={'horizontal'}>
                            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                    onClick={() => setCollapsed(!collapsed)} style={{border: 'none'}}/>
                            <Breadcrumb items={props.breadcrumbItems}/>
                        </Space>
                        <div>
                            <Badge count={unread}>
                                <Button type={'text'} icon={<MessageOutlined/>} style={{border: 'none'}}
                                        onClick={() => setChatDrawerOpen(true)}></Button>
                            </Badge>
                            <Button type={'text'} icon={<UserOutlined/>} style={{border: 'none'}}
                                    onClick={() => setPersonalOpen(true)}></Button>
                        </div>
                    </Space>
                    <div style={{padding: '0.5rem 0'}}>
                        <props.component></props.component>
                    </div>
                </Content>
            </Layout>
            {
                sessionStorage.getItem('token') === null ? <></> :
                    <div>
                        <MessageCenter open={chatDrawerOpen} setOpen={setChatDrawerOpen}/>
                        <Personality open={personalOpen} setOpen={setPersonalOpen}/>
                    </div>
            }
        </Layout>
    );
};

export default ManagementLayout;
