import {Button, Card, Col, Layout, Menu, MenuProps, Row, Space, theme} from 'antd';
import {CopyrightOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import ButtonGroup from "antd/es/button/button-group";
import {Link} from "react-router-dom";

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
    getItem('学习知识', 5),
    getItem('联系我们', 6),
];

const Index = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const themeToken = theme.useToken();
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100vw', alignItems: 'center', display: 'flex'}}>
                <div className="logo" style={{alignItems: 'center', padding: '0 0.5rem'}}>
                    <CopyrightOutlined
                        style={{fontSize: '1.5rem', color: themeToken.theme.id === 0 ? "black" : "white"}}/>
                </div>
                <Menu mode="horizontal" defaultSelectedKeys={['1']} items={items}/>
                <Space>
                    <ButtonGroup>
                        <Link to={'/login'}>
                            <Button type={'primary'}>登录 注册</Button>
                        </Link>
                    </ButtonGroup>
                </Space>
            </Header>
            <Content style={{padding: '0 2rem', marginTop: 64, width: '100vw', minHeight: '90vh'}}>
                <div className="site-layout-background" style={{padding: 24}}>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card title="最新公告" bordered={false}>
                                <p>社区医院最新公告内容... loading...</p>

                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="专家推荐" bordered={false}>
                                <p>社区医院专家推荐内容...</p>
                            </Card>
                        </Col>
                        {/*<Col span={8}>*/}
                        {/*    <Card title="预约挂号" bordered={false}>*/}
                        {/*        <p>在线预约挂号功能...</p>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}
                    </Row>
                </div>
            </Content>
            <Footer style={{textAlign: 'center', height: '1rem'}}>社区医院 ©2023 Created by Communlinic</Footer>
        </Layout>
    );
};
export default Index;
