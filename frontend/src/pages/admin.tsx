import {Layout} from "antd";

const {Header, Content, Footer, Sider} = Layout;

const Admin = () => {
    return (
        <Layout>
            <Header>header</Header>
            <Content>content</Content>
            <Sider>sider</Sider>
            <Footer>footer</Footer>
        </Layout>
    )
};

export default Admin;