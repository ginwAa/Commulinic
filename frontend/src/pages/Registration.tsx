import {Col, Descriptions, DescriptionsProps, message, Row, Spin, TreeSelect} from "antd";
import {useEffect, useState} from "react";
import {Department, DepartmentTreeNode, EMPTY_DEPARTMENT} from "../utils/entity.ts";
import {departmentGetById, departmentTreeReg} from "../apis/departmentApis.ts";
import {DataNode} from "antd/es/tree";
import DefaultLayout from "../layout/DefaultLayout.tsx";
import Title from "antd/es/typography/Title";

const transform = (data: DepartmentTreeNode[]): DataNode[] => {
    return data.map((item) => {
        return {
            key: item.value,
            title: item.title,
            value: item.value,
            parentId: item.parentId,
            description: item.description,
            children: item.children ? transform(item.children) : [],
            isLeaf: item.children === undefined || item.children.length === 0,
        }
    });
};
const Inner = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [data, setData] = useState<DepartmentTreeNode[]>([]);
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const [selectedNode, setSelectedNode] = useState<Department>(EMPTY_DEPARTMENT);
    const [editSuccess, setEditSuccess] = useState(false);
    // const [adding, setAdding] = useState(false);
    // const [editOpen, setEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const getDescription = async (key: number) => {
        if (!key) {
            setSelectedKey(0);
            setDescription([]);
            setSelectedNode(EMPTY_DEPARTMENT);
            return;
        }
        departmentGetById(key).then(res => {
            if (!res || !res.data) {
                setDescription([]);
                setSelectedNode(EMPTY_DEPARTMENT);
                return;
            }
            const node = res.data;
            setDescription([
                {
                    key: '1',
                    label: null,
                    children: node.name,
                },
                {
                    key: '2',
                    label: '科室简介',
                    children: node.description ? node.description : '',
                },
            ]);
            setSelectedNode(node);
        }).catch(err => {
            console.log(err);
            messageApi.error("加载失败，请检查网络连接");
        });
    };
    const [description, setDescription] = useState<DescriptionsProps['items']>([]);
    useEffect(() => {
        setLoading(true);
        departmentTreeReg().then(res => {
            setData([res.data]);
            if (selectedKey === 0 && res.data.value) {
                setSelectedKey(res.data.value);
            }
        }).catch(err => {
            messageApi.error("部门结构信息加载失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
            console.log("tree");
        });
    }, [editSuccess]);
    useEffect(() => {
        setLoading(true);
        getDescription(selectedKey).catch(err => {
            messageApi.error("部门详细信息加载失败，请检查网络连接！" + err.message);
        }).finally(() => {
            setLoading(false);
        });
    }, [selectedKey]);
    const onSelect = (value: number | null, node: DataNode) => {
        if (value) {
            setSelectedKey(value);
        }
        console.log("selected ", node);
    }


    return (
        <>
            {contextHolder}
            <Spin spinning={loading}>
                <Row gutter={[16, 30]}>
                    <Col span={'auto'} style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                        <Title level={5}>选择科室</Title>
                        <TreeSelect treeData={transform(data)} disabled={!data || data.length === 0}
                                    style={{marginTop: '1rem'}}
                                    dropdownStyle={{minHeight: 400, overflow: 'auto', width: '10rem'}}
                                    placement={"bottomLeft"} onSelect={onSelect} value={selectedKey} size={"small"}/>
                    </Col>
                    <Col span={'auto'} style={{display: 'flex', alignItems: 'center'}}>
                        <Title level={5}>科室简介</Title>
                        <Descriptions items={selectedKey === 0 ? [] : description} bordered={true} size={"small"}
                                      style={{marginTop: '1rem'}}/>
                    </Col>
                </Row>
            </Spin>
        </>
    );
}

const Registration = () => {
    return (
        <DefaultLayout component={Inner} tabKey={6} breadcrumbItems={[]}/>
    )
}
export default Registration;