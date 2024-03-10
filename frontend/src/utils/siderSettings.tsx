import {
    DeploymentUnitOutlined,
    FileSearchOutlined,
    NotificationOutlined,
    PicLeftOutlined,
    PieChartOutlined,
    TeamOutlined
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
    siderItem(<Link to={"/admin/community"}>社区管理</Link>, 7, <NotificationOutlined/>),
    siderItem(<Link to={"/admin/about"}>网页管理</Link>, 8, <PicLeftOutlined/>)
];

export default siderItems;