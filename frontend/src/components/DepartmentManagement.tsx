import {Button, Space, Tree} from "antd";

const treeData: DataNode[] = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{title: <span style={{color: '#1677ff'}}>sss</span>, key: '0-0-1-0'}],
            },
        ],
    },
];
const DepartmentManagement = () => {


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
            <Tree treeData={treeData}/>
        </>
    );
}

export default DepartmentManagement;