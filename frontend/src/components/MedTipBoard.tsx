import {Announcement, EMPTY_ANNOUNCEMENT, EMPTY_MED_TIP, EMPTY_PAGE, MedTip} from "../utils/entity.ts";
import {useEffect, useState} from "react";
import {Button, Card, message, Modal, Pagination} from "antd";
import Title from "antd/es/typography/Title";
import {medTipPage} from "../apis/tipApis.ts";
import {unixSecondToDate} from "../utils/time.ts";

const NoticeBoard = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [init, setInit] = useState<Announcement[]>(EMPTY_PAGE.records);
    const [data, setData] = useState<MedTip[]>(EMPTY_PAGE.records);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<MedTip>(EMPTY_MED_TIP);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [moreOpen, setMoreOpen] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    const pageSize = 10;
    const [total, setTotal] = useState(0);
    const onTitleClick = (data: MedTip) => {
        setSelectedData(data);
        setModalOpen(true);
    }

    const initData = () => {
        setLoading(true);
        medTipPage(1, 6, EMPTY_ANNOUNCEMENT, false).then(res => {
            setInit(res.data.records);
        }).catch(err => {
            messageApi.error("获取公告列表失败 + " + err.message);
        }).finally(() => {
            setLoading(false);
        })
    };
    const fetchData = () => {
        setLoading(true);
        medTipPage(page, pageSize, EMPTY_MED_TIP, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            messageApi.error("获取公告列表失败 + " + err.message);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        fetchData();
    }, [page, pageSize]);
    useEffect(() => {
        initData();
    }, []);

    return (
        <div>
            {contextHolder}
            <Card title="医学知识" bordered={false} style={{width: 'auto'}} loading={loading}>
                {
                    init.map(medTip => (
                        <div key={medTip.id}>
                            <p
                                onClick={() => onTitleClick(medTip)}
                                style={{
                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap', width: '100%', cursor: 'pointer'
                                }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        {medTip.title}
                                    </div>
                                    <div>
                                        {unixSecondToDate(medTip.updatedAt)}
                                    </div>
                                </div>
                            </p>
                        </div>
                    ))
                }
                <Button type="primary" onClick={() => setMoreOpen(true)}>查看更多</Button>
            </Card>
            <Modal open={modalOpen} onCancel={() => setModalOpen(false)} destroyOnClose={true} footer={null}
                   width={'85%'}>
                <Title level={3}>{selectedData.title}</Title>
                <p>{selectedData.content}</p>
            </Modal>
            <Modal open={moreOpen} onCancel={() => setMoreOpen(false)} destroyOnClose={true} footer={null}
                   width={'60%'}>
                <Title level={2}>所有医学知识</Title>
                {
                    data.map(medTip => (
                        <div key={medTip.id}>
                            <p
                                onClick={() => onTitleClick(medTip)}
                                style={{
                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap', width: '100%', cursor: 'pointer'
                                }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        {medTip.title}
                                    </div>
                                    <div>
                                        {unixSecondToDate(medTip.updatedAt)}
                                    </div>
                                </div>
                            </p>
                        </div>
                    ))
                }
                <Pagination current={page} total={total} pageSize={pageSize}
                            onChange={page => setPage(page)}></Pagination>
            </Modal>
        </div>
    );
};

export default NoticeBoard;