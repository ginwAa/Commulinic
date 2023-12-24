import React, {useEffect, useState} from 'react';
import {
    CopyrightOutlined,
    DeploymentUnitOutlined,
    FileSearchOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    NotificationOutlined,
    PieChartOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Button, Layout, Menu, Space, theme, Typography} from 'antd';
import DepartmentManagement from '../components/DepartmentManagement';
import UserManagement from '../components/UserManagement';
import {Link} from "react-router-dom";

const {Text} = Typography;
const {Content, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function siderItem(
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
    siderItem(<Link to={"/admin"}>总览</Link>, 1, <PieChartOutlined/>),
    siderItem(<Link to={"/admin/departments"}>部门管理</Link>, 2, <DeploymentUnitOutlined/>),
    siderItem('人员管理', -1, <TeamOutlined/>, [
        siderItem(<Link to={"/admin/users"}>全体用户管理</Link>, 3),
        siderItem(<Link to={"/admin/staff"}>内部管理</Link>, 4),
        siderItem(<Link to={"/admin/applies"}>坐诊申请管理</Link>, 5),
    ]),
    siderItem(<Link to={"/admin/appointments"}>预约管理</Link>, 6, <FileSearchOutlined/>),
    siderItem('社区管理', -2, <NotificationOutlined/>, [
        siderItem(<Link to={"/admin/notice"}>公告</Link>, 7),
        siderItem(<Link to={"/admin/tips"}>医学知识</Link>, 8),
    ]),
];

interface ContentProps {
    tabKey: number;
}

const AdminContent = (props: ContentProps) => {
    if (props.tabKey === 2) {
        return (
            <DepartmentManagement/>
        );
    } else if (props.tabKey === 3) {
        return (
            <UserManagement/>
        );
    } else if (props.tabKey < 9 && props.tabKey > 0) {
        return (
            <>
                now tab key is: {props.tabKey}
            </>
        );
    } else {
        return (
            <>
                404 Not Found!
            </>
        );
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
        <Layout style={{height: '100vh', width: '100vw'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
                   width='12rem' collapsedWidth={windowWidth <= 750 ? '0' : '4rem'} trigger={null} theme='light'
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
                <Content style={{padding: '1vh 1rem'}}>
                    <Space direction={'horizontal'} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Space direction={'horizontal'}>
                            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                    onClick={() => setCollapsed(!collapsed)}/>
                            <Breadcrumb>
                                <Breadcrumb.Item>人员管理</Breadcrumb.Item>
                                <Breadcrumb.Item>普通用户管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </Space>
                    </Space>
                    <div style={{padding: '0.5rem 0'}}>
                        <AdminContent tabKey={tabKey}/>
                    </div>


                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
