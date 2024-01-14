import ManagementLayout from "../../layout/ManagementLayout.tsx";
import NoticeManagement from "../../components/NoticeManagement.tsx";

const breadcrumbItems = [
    {
        title: '社区管理',
    },
    {
        title: '公告管理',
    }
];
const NoticeManagementPage = () => {
    return (
        <ManagementLayout component={NoticeManagement} key={7} tabKey={7}
                          breadcrumbItems={breadcrumbItems}></ManagementLayout>
    )
}

export default NoticeManagementPage;