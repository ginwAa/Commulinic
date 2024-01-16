import React, {useEffect, useState} from 'react';
import {
    CopyrightOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Breadcrumb, Button, Layout, Menu, Space, theme, Typography} from 'antd';
import siderItems from "../utils/siderSettings.tsx";

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
    const [collapsed, setCollapsed] = useState(localStorage.getItem('admin/siderCollapsed') === 'true');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const themeToken = theme.useToken();
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

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
                            <Button type={'text'} icon={<MessageOutlined/>} style={{border: 'none'}}></Button>
                            <Button type={'text'} icon={<UserOutlined/>} style={{border: 'none'}}></Button>
                        </div>
                    </Space>
                    <div style={{padding: '0.5rem 0'}}>
                        <props.component></props.component>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ManagementLayout;
