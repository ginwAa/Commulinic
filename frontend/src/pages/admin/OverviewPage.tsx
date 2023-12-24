import ManagementLayout from "../../layout/ManagementLayout.tsx";
import Overview from "../../components/Overview.tsx";

const breadcrumbItems = [
    {
        title: '总览',
    }
];
const OverviewPage = () => {
    return (
        <ManagementLayout component={Overview} key={1} tabKey={1} breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default OverviewPage;