import {
    DeploymentUnitOutlined,
    FileSearchOutlined,
    NotificationOutlined,
    PieChartOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import React from "react";
import {MenuProps} from "antd";
import {Link} from "react-router-dom";

type MenuItem = Required<MenuProps>['items'][number];

function siderItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const siderItems: MenuItem[] = [
    siderItem(<Link to={"/admin"}>总览</Link>, 1, <PieChartOutlined/>),
    siderItem(<Link to={"/admin/departments"}>部门管理</Link>, 2, <DeploymentUnitOutlined/>),
    siderItem(<Link to={"/admin/users"}>用户管理</Link>, 3, <TeamOutlined/>,),
    siderItem(<Link to={"/admin/register"}>预约管理</Link>, 6, <FileSearchOutlined/>),
    siderItem('社区管理', -2, <NotificationOutlined/>, [
        siderItem(<Link to={"/admin/notice"}>公告管理</Link>, 7),
        siderItem(<Link to={"/admin/tips"}>医学知识</Link>, 8),
    ]),
];

export default siderItems;