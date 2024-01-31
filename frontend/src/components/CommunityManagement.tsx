import {Button, Form, Input, message, Modal, Pagination, Segmented, Table} from "antd";
import React, {useEffect, useState} from "react";
import {Announcement, EMPTY_ANNOUNCEMENT, MedTip} from "../utils/entity.ts";
import {SearchOutlined} from "@ant-design/icons";
import {FilterSearch, ModalWarning} from "./TableComponents.tsx";
import {SorterResult} from "antd/es/table/interface";
import {announcementAdd, announcementDelete, announcementPage, announcementUpdate} from "../apis/announcementApis.ts";
import {medTipAdd, medTipDelete, medTipPage, medTipUpdate} from "../apis/tipApis.ts";
import {unixSecondToDate} from "../utils/time.ts";

let fetchData = announcementPage;

interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: Announcement | MedTip;
    onSuccess: () => void;
    adding: boolean;
    type: number;
}

const EditModal = (props: EditProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm<Announcement | MedTip>();

    const closeEditModal = (changed: boolean) => {
        if (!changed) {
            props.setEditOpen(false);
            return;
        }
        const formData: Announcement | MedTip = form.getFieldsValue();
        let doFunc = props.type === 1 ? announcementUpdate : medTipUpdate;
        if (props.adding) {
            formData.id = 0;
            doFunc = props.type === 1 ? announcementAdd : medTipAdd;
        } else {
            formData.id = props.record.id;
        }
        form.validateFields().then(() => {
            doFunc(formData).then(() => {
                messageApi.success("操作成功!");
                props.onSuccess();
                props.setEditOpen(false);
            }).catch(err => {
                console.log(err);
                messageApi.error("操作失败!");
            }).finally(() => {
                props.setEditOpen(false);
            });
        })
    }
    return (
        <>
            {contextHolder}
            <Modal open={props.editOpen} onCancel={() => closeEditModal(false)} onOk={() => closeEditModal(true)}
                   destroyOnClose={true} title={'编辑'}>
                <Form form={form} initialValues={props.adding ? undefined : props.record} preserve={false}>
                    <Form.Item name="title" label="标题" rules={[{required: true, message: '请输入标题'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="content" label="内容" rules={[{required: true, message: '请输入内容'}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
}

const CommunityManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(10);
    const [loading, setLoading] = useState(false)
    const [seg, setSeg] = useState(1)
    const [editOpen, setEditOpen] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const [selectedRow, setSelectedRow] = useState<Announcement | MedTip>(EMPTY_ANNOUNCEMENT);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [adding, setAdding] = useState(false);
    const [pageProps, setPageProps] = useState<Announcement | MedTip>({
        title: '',
        content: '',
        updatedAt: 0,
    });
    const [data, setData] = useState<Announcement[] | MedTip[]>([]);
    const rowSelection = {
        selectedRowKeys: [selectedKey],
        onChange: (selectedRowKeys: React.Key[], selectedRows: Announcement[] | MedTip[]) => {
            setSelectedKey(selectedRowKeys[0] as number);
            setSelectedRow(selectedRows[0]);
        },
    };

    useEffect(() => {
        if (seg === 1) {
            fetchData = announcementPage;
        } else {
            fetchData = medTipPage;
        }
        setLoading(true);
        fetchData(page, pageSize, pageProps, true).then(res => {
            setData(res.data.records);
            setTotal(res.data.total);
        }).catch(err => {
            messageApi.error(err.message);
        }).finally(() => {
            setLoading(false);
        })
    }, [seg, page, pageSize, editSuccess]);
    useEffect(() => {
        setSelectedKey(0);
        setSelectedRow(EMPTY_ANNOUNCEMENT);
    }, [seg, editSuccess]);

    const onDeleteok = () => {
        const deleteFunc = seg === 1 ? announcementDelete : medTipDelete;
        deleteFunc(selectedKey).then(() => {
            messageApi.success("删除成功!");
            setEditSuccess(!editSuccess);
        }).catch(err => {
            console.log(err);
            messageApi.error("删除失败!");
        }).finally(() => {
            setDeleteOpen(false);
        });
    }

    return (
        <>
            {contextHolder}
            <Segmented options={[{label: '公告', value: 1}, {label: '医学知识', value: 2}]} value={seg} block
                       onChange={(v) => setSeg(Number(v))}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button.Group>
                    <Button size={"small"} style={{border: 'none'}} type={'primary'}
                            onClick={() => setEditSuccess(!editSuccess)}>刷新</Button>
                    <Button size={"small"} style={{border: 'none'}} type={'primary'}
                            onClick={() => {
                                setEditOpen(true);
                                setAdding(true);
                            }}>新增</Button>
                    <Button size={"small"} style={{border: 'none'}} type={'primary'} disabled={selectedKey === 0}
                            onClick={() => {
                                setEditOpen(true);
                                setAdding(false)
                            }}>编辑</Button>
                    <Button size={"small"} style={{border: 'none'}} type={'primary'} disabled={selectedKey === 0}
                            onClick={() => setDeleteOpen(true)}>删除</Button>

                </Button.Group>
                <Pagination simple disabled={total === 0} current={page} pageSize={pageSize} total={total}
                            onChange={(page: number, pageSize: number) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }}/>
            </div>
            <Table size={"small"} dataSource={data} loading={loading} pagination={false} rowKey={"id"}
                   scroll={{x: 'max-content', y: '55vh'}} rowSelection={{type: 'radio', ...rowSelection}}
                   onChange={(_pagination, _filters, sorter: SorterResult<Announcement> | SorterResult<Announcement>[]) => {
                       setPageProps({
                           ...pageProps,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           updateAt: sorter?.order ? sorter?.order === 'ascend' ? 1 : 2 : 0,
                       });
                   }}>
                <Table.Column title="ID" dataIndex="id" key="id" width={'7rem'}/>
                <Table.Column title="标题" dataIndex="title" key="title" filterIcon={<SearchOutlined/>}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.title, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, title: value});
                                      }
                              })}/>
                <Table.Column title="内容" dataIndex="content" key="content" filterIcon={<SearchOutlined/>}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.content, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, content: value});
                                      }
                              })}/>
                <Table.Column title="更新时间" dataIndex="updatedAt" key="updatedAt" sorter={true} width={'10rem'}
                              render={(_value, record: Announcement | MedTip) => unixSecondToDate(record.updatedAt)}/>
            </Table>
            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={selectedRow}
                       onSuccess={() => setEditSuccess(!editSuccess)} type={seg} adding={adding}/>
            <ModalWarning name={selectedRow?.title} open={deleteOpen} actionName={'删除'}
                          onCancel={() => setDeleteOpen(false)} onOk={onDeleteok}/>
        </>
    )
}

export default CommunityManagement;