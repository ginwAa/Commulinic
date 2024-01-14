import ManagementLayout from "../../layout/ManagementLayout.tsx";

const breadcrumbItems = [
    {
        title: '社区管理',
    },
];
const OverviewPage = () => {
    return (
        <ManagementLayout component={DepartmentManagement} key={2} tabKey={2}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default OverviewPage;