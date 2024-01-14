import {Button, Form, Input, message, Modal, Pagination, Select, Table, TreeSelect} from "antd";
import {doctorPage, doctorUpdate} from "../apis/doctorApis.ts";
import {Doctor, DoctorVO, EMPTY_DOCTOR_VO} from "../utils/entity.ts";
import React, {useEffect, useState} from "react";
import {FormOutlined, SearchOutlined} from "@ant-design/icons";
import {FilterSearch} from "./TableComponents.tsx";
import {DataNode} from "antd/es/tree";
import {unixSecondToYear} from "../utils/time.ts";

const fetchData = doctorPage;

interface EditProps {
    editOpen: boolean;
    setEditOpen: (visible: boolean) => void;
    record: DoctorVO;
    onSuccess: () => void;
    treeData: DataNode[];
}

const EditModal = (props: EditProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm<Doctor>();

    const closeEditModal = (changed: boolean) => {
        if (!changed) {
            props.setEditOpen(false);
            return;
        }
        const formData: Doctor = form.getFieldsValue();
        formData.id = props.record.id;
        console.log(formData);
        form.validateFields().then(() => {
            doctorUpdate(formData).then(() => {
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
                   destroyOnClose={true} title={'编辑医生'}>
                <Form form={form} initialValues={props.record} preserve={false}>
                    <Form.Item name="position" label="科室" rules={[{required: true, message: '请输入科室'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="status" label="状态" rules={[{required: true, message: '请选择状态'}]}>
                        <Select options={[{value: 2, label: '在职'}, {value: 4, label: '离职'}]}/>
                    </Form.Item>
                    <Form.Item name="departmentId" label="部门" rules={[{required: true, message: '请选择部门'}]}>
                        <TreeSelect treeData={props.treeData}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>

    );
}

interface Props {
    departmentId: number;
    treeData: DataNode[];
}

const DoctorComponent = (props: Props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState<DoctorVO[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const [selectedRow, setSelectedRow] = useState<DoctorVO>(EMPTY_DOCTOR_VO);
    const [editOpen, setEditOpen] = useState(false);
    const [editSuccess, setEditSuccess] = useState(false);
    const [pageProps, setPageProps] = useState<DoctorVO>({
        ...EMPTY_DOCTOR_VO,
        departmentId: props.departmentId,
    });
    const rowSelection = {
        selectedRowKeys: [selectedKey],
        onChange: (selectedRowKeys: React.Key[], selectedRows: DoctorVO[]) => {
            setSelectedKey(selectedRowKeys[0] as number);
            setSelectedRow(selectedRows[0]);
        },
    };

    useEffect(() => {
        setLoading(true);
        fetchData(page, pageSize, {...pageProps, departmentId: props.departmentId}, true).then((res) => {
            setData(res.data.records);
            setTotal(res.data.total);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        }).finally(() => {
            setLoading(false);
        })
    }, [page, pageSize, pageProps, props.departmentId, editSuccess]);
    return (
        <>
            {contextHolder}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button size={"small"} style={{border: 'none'}} type={'primary'} disabled={selectedKey === 0}
                        icon={<FormOutlined/>} onClick={() => setEditOpen(true)}/>
                <Pagination simple disabled={total === 0} current={page} pageSize={pageSize} total={total}
                            onChange={(page: number, pageSize: number) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }}/>
            </div>
            <Table size={"small"} dataSource={data} loading={loading} pagination={false} rowKey="id"
                   scroll={{x: 'max-content', y: '55vh'}} rowSelection={{type: 'radio', ...rowSelection}}>
                <Table.Column title="ID" dataIndex="id" key="id"/>
                <Table.Column title="姓名" dataIndex="name" key="name" filterIcon={<SearchOutlined/>}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.name, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, name: value});
                                      }
                              })}/>
                <Table.Column title="性别" dataIndex="gender" key="gender" width={'5rem'}
                              render={(gender: number) => gender === 1 ? '男' : '女'}
                              filters={
                                  [
                                      {text: '男', value: 1},
                                      {text: '女', value: 2},
                                  ]
                              }/>
                <Table.Column title="状态" dataIndex="status" key="status" width={'5rem'}
                              render={(status: number) => status === 2 ? '在职' : '离职'}
                              filters={
                                  [
                                      {text: '在职', value: 2},
                                      {text: '离职', value: 4},
                                  ]
                              }/>
                <Table.Column title="工龄" dataIndex="seniority" key="seniority" sorter={true} width={'5rem'}
                              render={(seniority: number) => unixSecondToYear(Date.now() / 1000 - seniority) + '年'}/>
                <Table.Column title="科室" dataIndex="position" key="position" width={'10rem'}/>
                <Table.Column title="手机号" dataIndex="phone" key="phone" filterIcon={<SearchOutlined/>} width={'8rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.phone, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, phone: value});
                                      }
                              })}/>
                <Table.Column title="邮箱" dataIndex="email" key="email" filterIcon={<SearchOutlined/>} width={'8rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.email, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, email: value});
                                      }
                              })}/>
            </Table>
            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} record={selectedRow}
                       onSuccess={() => setEditSuccess(!editSuccess)} treeData={props.treeData}/>
        </>
    );
}

export default DoctorComponent;