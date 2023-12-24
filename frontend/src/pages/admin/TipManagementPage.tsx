import ManagementLayout from "../../layout/ManagementLayout.tsx";
import TipManagement from "../../components/TipManagement.tsx";

const breadcrumbItems = [
    {
        title: '社区管理',
    },
    {
        title: '医学知识',
    }
];
const TipManagementPage = () => {
    return (
        <ManagementLayout component={TipManagement} key={8} tabKey={8}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default TipManagementPage;