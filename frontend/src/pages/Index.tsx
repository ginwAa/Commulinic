import {Button, Card, Col, Row} from 'antd';
import NoticeBoard from "../components/NoticeBoard.tsx";
import MedTipBoard from "../components/MedTipBoard.tsx";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";
import MyRegister from "../components/MyRegister.tsx";
import {useState} from "react";
import MyApply from "../components/MyApply.tsx";
import {Link} from "react-router-dom";
import MyWork from "../components/MyWork.tsx";

const Inner = () => {
    const [openMyReg, setOpenMyReg] = useState(false);
    const [openMyApply, setOpenMyApply] = useState(false);
    const [openWork, setOpenWork] = useState(false);
    const openDate = new Date();
    return (
        <>
            <div style={{padding: 24}}>
                <Card title={null} bordered={false} style={{paddingLeft: '4rem', paddingRight: '4rem'}}>
                    <Title level={2}>
                        {openDate.getHours() < 12 ? '上午' : '下午'}好，
                        今天是 {unixSecondToDate(Date.now() / 1000)}。
                    </Title>
                    {
                        sessionStorage.getItem('token') === null ? <></> :
                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '2rem'}}>
                                <Button size={"large"} type={"primary"}
                                        onClick={() => setOpenMyReg(true)}>我的预约</Button>
                                {
                                    sessionStorage.getItem('role') !== '4' ? <></> :
                                        <Button size={"large"} type={"primary"}
                                                onClick={() => setOpenMyApply(true)}>坐诊申请</Button>
                                }
                                {
                                    sessionStorage.getItem('role') === '4' ? <></> :
                                        <Button size={"large"} type={"primary"}
                                                onClick={() => setOpenWork(true)}>接诊管理</Button>
                                }
                                {
                                    sessionStorage.getItem('role') === '1' ?
                                        <Button size={"large"} type={"primary"}><Link
                                            to={"/admin/departments"}>后台管理</Link></Button>
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
            {
                sessionStorage.getItem('role') === '4' || sessionStorage.getItem('token') === null ? <></> :
                    <div>
                        <MyWork open={openWork} setOpen={setOpenWork}/>
                    </div>
            }
        </>
    );
}

const Index = () => {
    return (
        <DefaultLayout component={Inner} tabKey={1} breadcrumbItems={[]} chatOpen={0}/>
    )
};
export default Index;
