import React from 'react';
import UserManagement from "../../components/UserManagement.tsx";
import ManagementLayout from "../../layout/ManagementLayout.tsx";

const breadcrumbItems = [
    {
        title: '人员管理',
    },
    {
        title: '全体用户管理',
    }
]
const UserManagementPage: React.FC = () => {
    return (
        <ManagementLayout key={3} tabKey={3} component={UserManagement}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    );
};

export default UserManagementPage;
