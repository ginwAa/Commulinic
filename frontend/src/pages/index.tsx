import {Card, Col, Layout, Menu, Row} from 'antd';

const {Header, Content, Footer} = Layout;

const Index = () => {
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">首页</Menu.Item>
                    <Menu.Item key="2">医生团队</Menu.Item>
                    <Menu.Item key="3">科室导航</Menu.Item>
                    <Menu.Item key="4">预约挂号</Menu.Item>
                    <Menu.Item key="5">学习知识</Menu.Item>
                    <Menu.Item key="6">联系我们</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout"
                     style={{padding: '0 50px', marginTop: 64, minHeight: '100vh', minWidth: '100vw'}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
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
                        <Col span={8}>
                            <Card title="预约挂号" bordered={false}>
                                <p>在线预约挂号功能...</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>社区医院 ©2023 Created by ginwAa</Footer>
        </Layout>
    );
};

export default Index;
