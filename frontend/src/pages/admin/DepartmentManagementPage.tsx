import ManagementLayout from "../../layout/ManagementLayout.tsx";
import DepartmentManagement from "../../components/DepartmentManagement.tsx";

const breadcrumbItems = [
    {
        title: '部门管理',
    },
];
const OverviewPage = () => {
    return (
        <ManagementLayout component={DepartmentManagement} key={2} tabKey={2}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default OverviewPage;