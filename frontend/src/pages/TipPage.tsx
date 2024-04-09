import DefaultLayout from "../layout/DefaultLayout.tsx";
import {App, Card, Modal, Pagination} from "antd";
import {useEffect, useState} from "react";
import {EMPTY_MED_TIP, EMPTY_PAGE, MedTip} from "../utils/entity.ts";
import {medTipPage} from "../apis/tipApis.ts";
import {unixSecondToDate} from "../utils/time.ts";
import Title from "antd/es/typography/Title";

const Inner = () => {
    const {message} = App.useApp();
    const [data, setData] = useState<MedTip[]>(EMPTY_PAGE.records);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedData, setSelectedData] = useState<MedTip>(EMPTY_MED_TIP);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    const pageSize = 10;
    const [total, setTotal] = useState(0);
    const onTitleClick = (data: MedTip) => {
        setSelectedData(data);
        setModalOpen(true);
    }

    const fetchData = () => {
        setLoading(true);
        medTipPage(page, pageSize, EMPTY_MED_TIP, true).then(res => {
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
        <>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Title level={2}>健康园地</Title>
                <Pagination current={page} total={total} pageSize={pageSize} onChange={page => setPage(page)}
                            style={{padding: '2rem'}}
                />
            </div>
            <Card bordered={false} loading={loading}>
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
            </Card>
            <Modal open={modalOpen} onCancel={() => setModalOpen(false)} destroyOnClose={true} footer={null}
                   width={'85%'}>
                <Title level={3}>{selectedData.title}</Title>
                <p>{selectedData.content}</p>
            </Modal>
        </>

    );
}
const TipPage = () => {
    return (
        <App>
            <DefaultLayout component={Inner} tabKey={4} breadcrumbItems={[]}/>
        </App>
    )
}

export default TipPage;