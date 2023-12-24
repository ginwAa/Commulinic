import ManagementLayout from "../../layout/ManagementLayout.tsx";
import RegisterManagement from "../../components/RegisterManagement.tsx";

const breadcrumbItems = [
    {
        title: '预约管理',
    }
];
const RegisterManagementPage = () => {
    return (
        <ManagementLayout component={RegisterManagement} key={6} tabKey={6}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default RegisterManagementPage;