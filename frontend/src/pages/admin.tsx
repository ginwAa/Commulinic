import React, {useEffect, useState} from 'react';
import {
    CopyrightOutlined,
    DesktopOutlined,
    FileOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Button, Layout, Menu, Space, Table, theme, Typography} from 'antd';

const {Title, Paragraph, Text, Link} = Typography;
const {Column, ColumnGroup} = Table;
const {Content, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('总览', 1, <PieChartOutlined/>),
    getItem('部门管理', 2, <DesktopOutlined/>),
    getItem('人员管理', -1, <UserOutlined/>, [
        getItem('普通用户管理', 3),
        getItem('内部员工管理', 4),
        getItem('坐诊申请管理', 5),
    ]),
    getItem('预约管理', 6, <TeamOutlined/>),
    getItem('社区管理', -2, <FileOutlined/>, [
        getItem('公告', 7),
        getItem('医学知识', 8),
    ]),
];

const NormalUserManagement = () => {
    return (
        <Table>

        </Table>
    );
}

interface TabProps {
    tabKey: number;
}

const AdminContent = (props: TabProps) => {
    if (props.tabKey === 3) {
        return (
            <NormalUserManagement></NormalUserManagement>
        );
    } else if (props.tabKey < 9 && props.tabKey > 0) {
        return (
            <>
                now tab key is: {props.tabKey}
            </>
        )
    } else {
        return (
            <>
                404 Not Found!
            </>
        )
    }
};

const Admin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [tabKey, setTabKey] = useState<number>(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const themeToken = theme.useToken();
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const onMenuClick: MenuProps['onClick'] = (e) => {
        setTabKey(Number(e.key));
    };

    return (
        <Layout style={{minHeight: '100vh', width: '100vw'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                   width='10rem' collapsedWidth={windowWidth <= 750 ? '0' : '4rem'} trigger={null} theme='light'
            >
                <Space direction="vertical" style={{display: 'flow'}} size='small'>
                    <div className="demo-logo-vertical" style={{textAlign: 'center'}}>
                        <div className="logo-icon" style={{padding: '1rem'}}>
                            <CopyrightOutlined
                                style={{fontSize: '2rem', color: themeToken.theme.id === 0 ? "black" : "white"}}/>
                        </div>
                        <div className="logo-text" style={{visibility: collapsed ? 'hidden' : 'visible'}}>
                            <Text strong>Commulinic</Text>
                        </div>
                    </div>
                    <Menu defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onMenuClick}/>
                </Space>
            </Sider>
            <Layout>
                <Content style={{margin: '0 16px'}}>
                    <Space direction={'horizontal'}>
                        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{fontSize: '1rem', width: '2rem', height: '2rem',}}
                        />
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                    </Space>
                    <div style={{padding: 12}}>
                        <AdminContent tabKey={tabKey}></AdminContent>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
