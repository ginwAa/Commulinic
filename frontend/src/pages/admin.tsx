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
import {Breadcrumb, Button, Layout, Menu, Pagination, Space, theme, Typography} from 'antd';
import UserManagement from '../components/UserManagement';

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
    siderItem('总览', 1, <PieChartOutlined/>),
    siderItem('部门管理', 2, <DeploymentUnitOutlined/>),
    siderItem('人员管理', -1, <TeamOutlined/>, [
        siderItem('普通用户管理', 3),
        siderItem('内部员工管理', 4),
        siderItem('坐诊申请管理', 5),
    ]),
    siderItem('预约管理', 6, <FileSearchOutlined/>),
    siderItem('社区管理', -2, <NotificationOutlined/>, [
        siderItem('公告', 7),
        siderItem('医学知识', 8),
    ]),
];

interface ContentProps {
    tabKey: number;
    page: number;
    pageSize: number;
    total: number;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setTotal: (total: number) => void;
}

const AdminContent = (props: ContentProps) => {
    if (props.tabKey === 3) {
        return (
            <UserManagement page={props.page} pageSize={props.pageSize} total={props.total} setPage={props.setPage}
                            setPageSize={props.setPageSize} setTotal={props.setTotal}/>
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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(500);
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
        setPage(1);
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
                        <Pagination defaultCurrent={1} total={total} current={page} pageSize={pageSize} simple
                                    style={{width: '50vw', textAlign: 'right'}}
                                    onChange={(page, pageSize) => {
                                        setPage(page);
                                        setPageSize(pageSize)
                                    }} responsive={true}/>

                    </Space>
                    <AdminContent tabKey={tabKey} page={page} pageSize={pageSize} total={total}
                                  setPage={setPage} setPageSize={setPageSize} setTotal={setTotal}/>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
