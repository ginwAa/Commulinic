import {Col, message, Row} from 'antd';
import NoticeBoard from "../components/NoticeBoard.tsx";
import MedTipBoard from "../components/MedTipBoard.tsx";
import DefaultLayout from "../layout/DefaultLayout.tsx";

const Inner = () => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <div className="site-layout-background" style={{padding: 24}}>
                <Row gutter={[16, 16]}>
                    <Col span={'auto'}>
                        <NoticeBoard/>
                    </Col>
                    <Col span={'auto'}>
                        <MedTipBoard/>
                    </Col>
                </Row>
            </div>
        </>
    );
}

const Index = () => {
    return (
        <DefaultLayout component={Inner} tabKey={1} breadcrumbItems={[]}/>
    )
};
export default Index;
