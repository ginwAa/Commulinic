import ManagementLayout from "../../layout/ManagementLayout.tsx";
import ApplyManagement from "../../components/ApplyManagement.tsx";

const breadcrumbItems = [
    {
        title: '人员管理',
    },
    {
        title: '坐诊申请管理',
    }
];
const OverviewPage = () => {
    return (
        <ManagementLayout component={ApplyManagement} key={5} tabKey={5}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default OverviewPage;