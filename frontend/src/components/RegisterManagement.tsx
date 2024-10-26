import {Button, Form, message, Modal, Pagination, Select, Space, Table, TablePaginationConfig} from "antd";
import React, {useEffect, useState} from "react";
import {EMPTY_REGISTER, Register} from "../utils/entity.ts";
import {registerPage, registerUpdate} from "../apis/registerApis.ts";
import {SorterResult} from "antd/es/table/interface";
import {SearchOutlined} from "@ant-design/icons";
import {FilterSearch, MyDatePicker} from "./TableComponents.tsx";
import {unixSecondToDate} from "../utils/time.ts";

interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: Register;
    onSuccess: () => void;
}

const EditModal = (props: EditProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm<Register>();

    const closeEditModal = (changed: boolean) => {
        if (!changed) {
            props.setEditOpen(false);
            return;
        }
        const formData: Register = form.getFieldsValue();
        formData.id = props.record.id;
        console.log('getFieldsValue', formData);
        form.validateFields().then(() => {
            const func = registerUpdate;
            func(formData).then(() => {
                messageApi.success("操作成功!");
                props.onSuccess();
                props.setEditOpen(false);
                props.setEditOpen(false);
            }).catch(err => {
                console.log(err);
                messageApi.error("请检查网络连接");
            });
        }).catch(() => {
            messageApi.error("请检查用户信息");
        });
    };

    return (
        <>
            {contextHolder}
            <Modal open={props.editOpen} onCancel={() => closeEditModal(false)} onOk={() => closeEditModal(true)}
                   title={'编辑'} centered={true} destroyOnClose={true}>
                <Form initialValues={props.record} form={form} preserve={false}
                      size={"small"} layout={'horizontal'}>
                    <Space direction={"horizontal"}>
                        <Form.Item label="日期" name="date" rules={[{required: true, message: '请输入日期'}]}>
                            <MyDatePicker onChange={() => {
                            }} value={0}/>
                        </Form.Item>
                        {/*<Form.Item label="金额" name="price" rules={[{required: true, message: '请输入金额'}]}>*/}
                        {/*    <PriceInput onChange={() => {*/}
                        {/*    }} value={0}/>*/}
                        {/*</Form.Item>*/}
                    </Space>
                    <Space direction={'horizontal'}>
                        <Form.Item label="预约时段" name="section" rules={[{required: true, message: '请输入时段'}]}>
                            <Select options={[{value: 1, label: '上午'}, {value: 2, label: '下午'}]}/>
                        </Form.Item>
                        <Form.Item label="状态" name="status" rules={[{required: true, message: '请输入状态'}]}>
                            <Select options={[{value: 1, label: '未付款'}, {value: 2, label: '已付款'}, {
                                value: 4,
                                label: '已完成'
                            }, {value: 8, label: '已终止'}]}/>
                        </Form.Item>
                    </Space>
                </Form>
            </Modal>
        </>
    );
};

const fetchData = registerPage;
const RegisterManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<Register[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [total, setTotal] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [pageProps, setPageProps] = useState<Register>(EMPTY_REGISTER);
    useEffect(() => {
        setTableLoading(true);
        setSelectedRow(EMPTY_REGISTER);
        setSelectedKey(0);
        fetchData(page, pageSize, pageProps, true)
            .then(res => {
                setData(res.data.records);
                setTotal(res.data.total);
            }).catch(err => {
            console.log(err);
            messageApi.error("加载预约记录失败，请检查网络连接", err.message);
        }).finally(() => {
            setTableLoading(false);
        });
    }, [page, pageSize, pageProps, editSuccess]);

    const [selectedRow, setSelectedRow] = useState<Register>(EMPTY_REGISTER);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const rowSelection = {
        selectedRowKeys: [selectedKey],
        onChange: (selectedRowKeys: React.Key[], selectedRows: Register[]) => {
            setSelectedKey(selectedRowKeys[0] as number);
            setSelectedRow(selectedRows[0]);
            console.log(selectedRows[0]);
        },
    };
    return (
        <>
            {contextHolder}
            <Space direction={"horizontal"} style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button.Group>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setEditOpen(true);
                    }} disabled={selectedKey === 0}>编辑</Button>
                    <Button size={"small"} type={'primary'} onClick={() => {
                        setEditSuccess(!editSuccess)
                    }}>刷新</Button>
                </Button.Group>
                <Pagination defaultCurrent={1} total={total} current={page} pageSize={pageSize} simple responsive={true}
                            style={{width: '50vw', textAlign: 'right'}} disabled={tableLoading || total === 0}
                            onChange={(page, pageSize) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }} showSizeChanger/>
            </Space>
            <Table dataSource={data} scroll={{x: 'max-content', y: '80vh'}} style={{minHeight: '80vh'}} size={"small"}
                   loading={tableLoading} pagination={false} rowSelection={{type: 'radio', ...rowSelection}}
                   rowKey={'id'} summary={() => {
                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} colSpan={5}>总计{total}条</Table.Summary.Cell>
                    </Table.Summary.Row>
                );
            }}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                   onChange={(pagination: TablePaginationConfig, filters: Record<string, number[]>, sorter: SorterResult<Register> | SorterResult<Register>[]) => {

                       setPageProps({
                           ...pageProps,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           price: sorter?.order ? sorter?.order === 'ascend' ? 1 : 2 : 0,
                           section: filters?.section ? filters.section.reduce((pre, v) => pre | v, 0) : 0,
                           status: filters?.status ? filters.status.reduce((pre, v) => pre | v, 0) : 0,
                       });
                   }}
            >
                <Table.Column title="ID" dataIndex="id" key="id" width={'4rem'}/>
                <Table.Column title="用户ID" dataIndex="userId" key="userId" width={'4rem'}/>
                <Table.Column title="医生ID" dataIndex="doctorId" key="doctorId" width={'4rem'}/>
                <Table.Column title="用户姓名" dataIndex="userName" key="userName" filterIcon={<SearchOutlined/>}
                              width={'7rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.userName, onSearch:
                                      (value: string) => setPageProps({...pageProps, userName: value})
                              })}/>
                <Table.Column title="医生姓名" dataIndex="doctorName" key="doctorName" filterIcon={<SearchOutlined/>}
                              width={'7rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.doctorName, onSearch:
                                      (value: string) => setPageProps({...pageProps, doctorName: value})
                              })}/>
                <Table.Column title="预约时段" dataIndex="section" key="section" width={'5rem'}
                              render={(gender: number) => gender === 1 ? '上午' : '下午'}
                              filters={
                                  [
                                      {text: '上午', value: 1},
                                      {text: '下午', value: 2},
                                  ]
                              }/>
                <Table.Column title="状态" dataIndex="status" key="status" width={'5rem'}
                              render={(status: number) => status === 1 ? '未付款' : status === 2 ? '已付款' : status === 4 ? '已结束' : '已终止'}
                              filters={
                                  [
                                      {text: '未付款', value: 1},
                                      {text: '已付款', value: 2},
                                      {text: '已结束', value: 4},
                                      {text: '已终止', value: 8},
                                  ]
                              }/>
                <Table.Column title="创建时间" dataIndex="createTime" key="createTime" width={'10rem'}
                              render={unixSecondToDate}/>
                {/*<Table.Column title="金额" dataIndex="price" key="price" sorter={true} width={'5rem'}*/}
                {/*              render={(price: number) => price / 100}/>*/}
                <Table.Column title="预约日期" dataIndex="date" key="date" width={'8rem'} render={unixSecondToDate}/>
            </Table>
            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={selectedRow}
                       onSuccess={() => setEditSuccess(!editSuccess)}/>
        </>
    );
}

export default RegisterManagement;