import ManagementLayout from "../../layout/ManagementLayout.tsx";
import CommunityManagement from "../../components/CommunityManagement.tsx";

const breadcrumbItems = [
    {
        title: '社区管理',
    },
];
const OverviewPage = () => {
    return (
        <ManagementLayout component={CommunityManagement} key={7} tabKey={7}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default OverviewPage;