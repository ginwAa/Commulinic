import {Announcement, EMPTY_ANNOUNCEMENT, EMPTY_PAGE} from "../utils/entity.ts";
import {useEffect, useState} from "react";
import {announcementPage} from "../apis/announcementApis.ts";
import {Button, Card, message, Modal, Pagination} from "antd";
import Title from "antd/es/typography/Title";
import {unixSecondToDate} from "../utils/time.ts";

const NoticeBoard = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [init, setInit] = useState<Announcement[]>(EMPTY_PAGE.records);
    const [data, setData] = useState<Announcement[]>(EMPTY_PAGE.records);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<Announcement>(EMPTY_ANNOUNCEMENT);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [moreOpen, setMoreOpen] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    const pageSize = 10;
    const [total, setTotal] = useState(0);


    const onTitleClick = (data: Announcement) => {
        setSelectedData(data);
        setModalOpen(true);
    }

    const initData = () => {
        setLoading(true);
        announcementPage(1, 6, EMPTY_ANNOUNCEMENT, false).then(res => {
            setInit(res.data.records);
        }).catch(err => {
            messageApi.error("获取公告列表失败 + " + err.message);
        }).finally(() => {
            setLoading(false);
        })
    };

    const fetchData = () => {
        setLoading(true);
        announcementPage(page, pageSize, EMPTY_ANNOUNCEMENT, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            messageApi.error("获取公告列表失败 + " + err.message);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        initData();
    }, []);
    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    return (
        <div>
            {contextHolder}
            <Card title="公告栏" bordered={false} style={{width: 'auto'}} loading={loading}>
                {
                    init.map(announcement => (
                        <div key={announcement.id}>
                            <p
                                onClick={() => onTitleClick(announcement)}
                                style={{
                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap', width: '100%', cursor: 'pointer'
                                }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        {announcement.title}
                                    </div>
                                    <div>
                                        {unixSecondToDate(announcement.updatedAt)}
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
                <Title level={2}>所有公告</Title>
                {
                    data.map(announcement => (
                        <div key={announcement.id}>
                            <p
                                onClick={() => onTitleClick(announcement)}
                                style={{
                                    overflow: 'hidden', textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap', width: '100%', cursor: 'pointer'
                                }}
                            >
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        {announcement.title}
                                    </div>
                                    <div>
                                        {unixSecondToDate(announcement.updatedAt)}
                                    </div>
                                </div>
                            </p>
                        </div>
                    ))
                }
                <Pagination current={page} total={total} onChange={page => setPage(page)}></Pagination>
            </Modal>
        </div>
    );
};

export default NoticeBoard;