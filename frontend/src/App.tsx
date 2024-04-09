import Index from "./pages/Index.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import User from "./pages/User.tsx";
import {ColorPicker, ConfigProvider, FloatButton, theme} from "antd";
import {FormatPainterOutlined, SkinOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {Color} from "antd/lib/color-picker";
import UserManagementPage from "./pages/admin/UserManagementPage.tsx";
import OverviewPage from "./pages/admin/OverviewPage.tsx";
import RegisterManagementPage from "./pages/admin/RegisterManagementPage.tsx";
import DepartmentManagementPage from "./pages/admin/DepartmentManagementPage.tsx";
import Login from "./pages/Login.tsx";
import CommunityManagementPage from "./pages/admin/CommunityManagementPage.tsx";
import NotFoundPage from "./pages/common/NotFoundPage.tsx";
import Registration from "./pages/Registration.tsx";
import NoticePage from "./pages/NoticePage.tsx";
import TipPage from "./pages/TipPage.tsx";

const App = () => {
    if (localStorage.getItem('admin/siderCollapsed') === null) {

        localStorage.setItem('admin/siderCollapsed', 'false');
    }
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', '0');
    }
    if (localStorage.getItem('color') === null) {
        localStorage.setItem('color', '#2c9678');
    }
    const [curTheme, setCurTheme] = useState<number>(Number(localStorage.getItem('theme')));
    const [curColor, setCurColor] = useState<string | Color>(String(localStorage.getItem('color')));
    useEffect(() => {
        localStorage.setItem('theme', String(curTheme));
    }, [curTheme]);
    useEffect(() => {
        localStorage.setItem('color', (typeof curColor === 'string' ? curColor : curColor.toHexString()));
    }, [curColor]);
    return (
        <ConfigProvider theme={{
            algorithm: curTheme === 0 ? theme.defaultAlgorithm : theme.darkAlgorithm,
            token: {
                colorPrimary: (typeof curColor === 'string' ? curColor : curColor.toHexString()),
            },
            components: {
                Layout: {
                    headerBg: curTheme === 0 ? "white" : "#141414",
                },
            }
        }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<Index/>} key="/index"/>
                    <Route path="/login" element={<Login/>} key="/login"/>
                    <Route path="/admin" element={<OverviewPage/>} key="/admin"/>
                    {/*<Route path="/about" element={<About/>} key="/about"/>*/}
                    <Route path="/user" element={<User/>} key="/user"/>
                    <Route path="/news" element={<NoticePage/>} key="/news"/>
                    <Route path="/health" element={<TipPage/>} key="/health"/>
                    <Route path="/admin/departments" element={<DepartmentManagementPage/>} key="/admin/departments"/>
                    <Route path="/admin/users" element={<UserManagementPage/>} key="/admin/users"/>
                    <Route path="/admin/register" element={<RegisterManagementPage/>} key="/admin/register"/>
                    <Route path="/admin/community" element={<CommunityManagementPage/>} key="/admin/community"/>
                    <Route path="/registration" element={<Registration/>} key="/registration"/>
                    <Route path="/*" element={<NotFoundPage/>} key="/404"/>
                </Routes>
            </Router>
            <FloatButton.Group shape="square" style={{right: '1rem', bottom: '1rem',}}>
                {/*<FloatButton icon={<UserOutlined/>} tooltip={'个人中心'}/>*/}
                {/*<FloatButton icon={<MessageOutlined/>} tooltip={'消息中心'}/>*/}
                <FloatButton icon={<SkinOutlined/>} tooltip={'暗黑模式'} onClick={() => {
                    setCurTheme(curTheme ^ 1);
                }}/>
                <ColorPicker value={curColor} onChange={setCurColor}>
                    <FloatButton icon={<FormatPainterOutlined/>} tooltip={'主题配色'}/>
                </ColorPicker>
                {/*<FloatButton icon={<SyncOutlined/>} tooltip={'刷新页面'}/>*/}
                <FloatButton.BackTop visibilityHeight={1}/>
            </FloatButton.Group>
        </ConfigProvider>

    );
};

export default App;
