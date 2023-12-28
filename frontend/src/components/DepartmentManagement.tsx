import {Button, Space, Switch, Tree} from "antd";
import {useState} from "react";
import {CarryOutOutlined, FormOutlined} from '@ant-design/icons';
import type {DataNode} from 'antd/es/tree';


const treeData: DataNode[] = [
    {
        title: 'parent 1',
        key: '0-0',
        icon: <CarryOutOutlined/>,
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                icon: <CarryOutOutlined/>,
                children: [
                    {title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined/>},
                    {
                        title: (
                            <>
                                <div>multiple line title</div>
                                <div>multiple line title</div>
                            </>
                        ),
                        key: '0-0-0-1',
                        icon: <CarryOutOutlined/>,
                    },
                    {title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined/>},
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                icon: <CarryOutOutlined/>,
                children: [{title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined/>}],
            },
            {
                title: 'parent 1-2',
                key: '0-0-2',
                icon: <CarryOutOutlined/>,
                children: [
                    {title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined/>},
                    {
                        title: 'leaf',
                        key: '0-0-2-1',
                        icon: <CarryOutOutlined/>,
                        switcherIcon: <FormOutlined/>,
                    },
                ],
            },
        ],
    },
    {
        title: 'parent 2',
        key: '0-1',
        icon: <CarryOutOutlined/>,
        children: [
            {
                title: 'parent 2-0',
                key: '0-1-0',
                icon: <CarryOutOutlined/>,
                children: [
                    {title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined/>},
                    {title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined/>},
                ],
            },
        ],
    },
];


const DepartmentManagement = () => {
    // const [data, setData] = useState<TreeDataNode[]>([]);
    const [showIcon, setShowIcon] = useState<boolean>(false);

    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
    };

    const onRightClick = (info: any) => {
        console.log('onRightClick', info);
    }

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
            <div style={{marginBottom: 16}}>
                showIcon: <Switch checked={showIcon} onChange={setShowIcon}/>
                <br/>
            </div>
            <Tree showLine={true} showIcon={showIcon} defaultExpandedKeys={['0-0-0']} onSelect={onSelect}
                  treeData={treeData} onRightClick={onRightClick}/>
        </>
    );
}

export default DepartmentManagement;