import {Button, Card, Col, message, Row} from 'antd';
import NoticeBoard from "../components/NoticeBoard.tsx";
import MedTipBoard from "../components/MedTipBoard.tsx";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";

const Inner = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const openDate = new Date();
    return (
        <>
            {contextHolder}
            <div style={{padding: 24}}>
                <Card title={null} bordered={false} style={{paddingLeft: '4rem', paddingRight: '4rem'}}>
                    <Title level={2}>
                        {openDate.getHours() < 12 ? '上午' : '下午'}好，
                        {sessionStorage.getItem('userName') ? sessionStorage.getItem('userName') : '游客'}，
                        今天是 {unixSecondToDate(Date.now() / 1000)}。
                    </Title>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                        <Button size={"large"} type={"primary"}>消息中心</Button>
                        <Button size={"large"} type={"primary"}>我的预约</Button>
                        <Button size={"large"} type={"primary"}>我的信息</Button>
                        <Button size={"large"} type={"primary"}>申请坐诊</Button>
                    </div>

                </Card>
            </div>
            <div className="notice-board" style={{padding: 24}}>
                <Row gutter={[16, 16]}>
                    <Col span={'auto'} style={{width: '50%'}}>
                        <NoticeBoard/>
                    </Col>
                    <Col span={'auto'} style={{width: '50%'}}>
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
