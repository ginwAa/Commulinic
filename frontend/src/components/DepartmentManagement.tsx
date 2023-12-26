import {Button, Space, Tree, TreeDataNode} from "antd";
import {useState} from "react";

const DepartmentManagement = () => {
    const [data, setData] = useState<TreeDataNode[]>([]);
    return (
        <>
            <Space direction={"horizontal"} style={{display: 'flex', justifyContent: 'right'}}>
                <Button.Group>
                    <Button size={"small"} type={'primary'}>新增</Button>
                    <Button size={"small"} type={'primary'}>编辑</Button>
                    <Button size={"small"} type={'primary'}>刷新</Button>
                    <Button size={"small"} type={'primary'}>删除</Button>
                    <Button size={"small"} type={'primary'}>全部展开</Button>
                </Button.Group>
            </Space>
            <Tree treeData={data}/>
        </>
    );
}

export default DepartmentManagement;