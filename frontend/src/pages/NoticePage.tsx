import DefaultLayout from "../layout/DefaultLayout.tsx";
import {App, Card, Modal, Pagination} from "antd";
import {useEffect, useState} from "react";
import {Announcement, EMPTY_ANNOUNCEMENT, EMPTY_PAGE} from "../utils/entity.ts";
import {announcementPage} from "../apis/announcementApis.ts";
import {unixSecondToDate} from "../utils/time.ts";
import Title from "antd/es/typography/Title";

const Inner = () => {
    const {message} = App.useApp();
    const [data, setData] = useState<Announcement[]>(EMPTY_PAGE.records);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedData, setSelectedData] = useState<Announcement>(EMPTY_ANNOUNCEMENT);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    const pageSize = 10;
    const [total, setTotal] = useState(0);


    const onTitleClick = (data: Announcement) => {
        setSelectedData(data);
        setModalOpen(true);
    }

    const fetchData = () => {
        setLoading(true);
        announcementPage(page, pageSize, EMPTY_ANNOUNCEMENT, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            message.error("获取公告列表失败 + " + err.message);
        }).finally(() => {
            setLoading(false);
        })
    };
    useEffect(() => {
        fetchData();
    }, [page, pageSize]);

    return (
        <div>
            <Modal open={modalOpen} onCancel={() => setModalOpen(false)} destroyOnClose={true} footer={null}
                   width={'85%'}>
                <Title level={3}>{selectedData.title}</Title>
                <p>{selectedData.content}</p>
            </Modal>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Title level={2}>新闻动态</Title>
                <Pagination current={page} total={total} pageSize={pageSize} onChange={page => setPage(page)}
                            style={{padding: '2rem'}}
                />
            </div>
            <Card loading={loading} bordered={false}>
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
            </Card>
        </div>
    );
}
const NoticePage = () => {
    return (
        <App>
            <DefaultLayout component={Inner} tabKey={3} breadcrumbItems={[]}/>
        </App>
    )
}

export default NoticePage;