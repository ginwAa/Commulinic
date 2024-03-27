import {Button, Card, Col, message, Row} from 'antd';
import NoticeBoard from "../components/NoticeBoard.tsx";
import MedTipBoard from "../components/MedTipBoard.tsx";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";
import MyRegister from "../components/MyRegister.tsx";
import {useState} from "react";
import MyApply from "../components/MyApply.tsx";
import {Link} from "react-router-dom";

const Inner = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [openMyReg, setOpenMyReg] = useState(false);
    const [openMyApply, setOpenMyApply] = useState(false);
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
                    {
                        sessionStorage.getItem('token') === null ? <></> :
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                                <Button size={"large"} type={"primary"}
                                        onClick={() => setOpenMyReg(true)}>我的预约</Button>
                                <Button size={"large"} type={"primary"}>我的信息</Button>
                                <Button size={"large"} type={"primary"}
                                        onClick={() => setOpenMyApply(true)}>坐诊申请</Button>
                                {
                                    sessionStorage.getItem('role') === '1' ?
                                        <Button size={"large"} type={"primary"}><Link
                                            to={"/admin"}>后台管理</Link></Button>
                                        : <></>
                                }
                            </div>
                    }
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
            {
                sessionStorage.getItem('token') === null ? <></> :
                    <div>
                        <MyRegister open={openMyReg} setOpen={setOpenMyReg}/>
                        <MyApply open={openMyApply} setOpen={setOpenMyApply}/>
                    </div>

            }
        </>
    );
}

const Index = () => {
    return (
        <DefaultLayout component={Inner} tabKey={1} breadcrumbItems={[]}/>
    )
};
export default Index;
