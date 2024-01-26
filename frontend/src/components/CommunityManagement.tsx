import {Button, message, Pagination, Segmented, Table} from "antd";
import React, {useEffect, useState} from "react";
import {Announcement, EMPTY_ANNOUNCEMENT, MedTip} from "../utils/entity.ts";
import {FormOutlined, SearchOutlined} from "@ant-design/icons";
import {FilterSearch} from "./TableComponents.tsx";
import {SorterResult} from "antd/es/table/interface";

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
    const [pageProps, setPageProps] = useState<Announcement | MedTip>({
        title: '',
        content: '',
        updateAt: 0,
    });
    const [data, setData] = useState<Announcement[] | MedTip[]>([
        {
            ...EMPTY_ANNOUNCEMENT,
            title: '暂无公告jkjk',
            content: '暂无公告lkjkhgfdsaqwetyuyyuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
        }
    ]);
    const rowSelection = {
        selectedRowKeys: [selectedKey],
        onChange: (selectedRowKeys: React.Key[], selectedRows: Announcement[] | MedTip[]) => {
            setSelectedKey(selectedRowKeys[0] as number);
            setSelectedRow(selectedRows[0]);
        },
    };

    useEffect(() => {
        // setLoading(true);

    }, [seg, page, pageSize, editSuccess]);


    return (
        <>
            {contextHolder}
            <Segmented options={[{label: '公告', value: 1}, {label: '医学知识', value: 2}]} value={seg} block
                       onChange={(v) => setSeg(Number(v))}/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button.Group>
                    <Button size={"small"} style={{border: 'none'}} type={'primary'} disabled={selectedKey === 0}
                            icon={<FormOutlined/>} onClick={() => setEditOpen(true)}/>
                    <Button/>
                </Button.Group>
                <Pagination simple disabled={total === 0} current={page} pageSize={pageSize} total={total}
                            onChange={(page: number, pageSize: number) => {
                                setPage(page);
                                setPageSize(pageSize);
                            }}/>
            </div>
            <Table size={"small"} dataSource={data} loading={loading} pagination={false} rowKey="id"
                   scroll={{x: 'max-content', y: '55vh'}} rowSelection={{type: 'radio', ...rowSelection}}
                   onChange={(_pagination, _filters, sorter: SorterResult<Announcement> | SorterResult<Announcement>[]) => {
                       setPageProps({
                           ...pageProps,
                           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                           // @ts-expect-error
                           updateAt: sorter?.order ? sorter?.order === 'ascend' ? 1 : 2 : 0,
                       });
                   }}>
                <Table.Column title="ID" dataIndex="id" key="id"/>
                <Table.Column title="标题" dataIndex="title" key="title" filterIcon={<SearchOutlined/>}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.title, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, title: value});
                                      }
                              })}/>
                <Table.Column title="内容" dataIndex="content" key="content" filterIcon={<SearchOutlined/>}
                              width={'8rem'}
                              filterDropdown={FilterSearch({
                                  searchText: pageProps.content, onSearch:
                                      (value: string) => {
                                          setPageProps({...pageProps, content: value});
                                      }
                              })}/>
                <Table.Column title="更新时间" dataIndex="updateAt" key="updateAt" sorter={true} width={'5rem'}/>
            </Table>

        </>
    )
}

export default CommunityManagement;