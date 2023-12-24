import ManagementLayout from "../../layout/ManagementLayout.tsx";
import StaffManagement from "../../components/StaffManagement.tsx";

const breadcrumbItems = [
    {
        title: '人员管理',
    },
    {
        title: '内部人员管理',
    }
];
const StaffManagementPage = () => {
    return (
        <ManagementLayout component={StaffManagement} key={4} tabKey={4}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default StaffManagementPage;