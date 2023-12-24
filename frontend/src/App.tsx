import Index from './pages/index.tsx';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import About from "./pages/about.tsx";
import User from "./pages/user.tsx";
import {ColorPicker, ConfigProvider, FloatButton, theme} from "antd";
import {FormatPainterOutlined, MessageOutlined, SkinOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Color} from "antd/lib/color-picker";
import UserManagementPage from "./pages/admin/UserManagementPage.tsx";
import OverviewPage from "./pages/admin/OverviewPage.tsx";
import TipManagementPage from "./pages/admin/TipManagementPage.tsx";
import StaffManagementPage from "./pages/admin/StaffManagementPage.tsx";
import ApplyManagementPage from "./pages/admin/ApplyManagementPage.tsx";
import NoticeManagementPage from "./pages/admin/NoticeManagementPage.tsx";
import RegisterManagementPage from "./pages/admin/RegisterManagementPage.tsx";
import DepartmentManagementPage from "./pages/admin/DepartmentManagementPage.tsx";
import Login from "./pages/login.tsx";

const App = () => {
    const [curTheme, setCurTheme] = useState(0);
    const [curColor, setCurColor] = useState<Color | string>('#2c9678')

    return (
        <ConfigProvider theme={{
            algorithm: curTheme === 0 ? theme.defaultAlgorithm : theme.darkAlgorithm,
            token: {
                colorPrimary: (typeof curColor === 'string' ? curColor : curColor.toHexString()),
            },
            components: {
                Layout: {
                    headerBg: curTheme === 0 ? "white" : "#141414",
                }
            }
        }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<Index/>} key="/index"></Route>
                    <Route path="/login" element={<Login/>} key="/login"></Route>
                    <Route path="/admin" element={<OverviewPage/>} key="/admin"></Route>
                    <Route path="/about" element={<About/>} key="/about"></Route>
                    <Route path="/user" element={<User/>} key="/user"></Route>
                    <Route path="/admin/departments" element={<DepartmentManagementPage/>}
                           key="/admin/departments"></Route>
                    <Route path="/admin/users" element={<UserManagementPage/>} key="/admin/users"></Route>
                    <Route path="/admin/staff" element={<StaffManagementPage/>} key="/admin/staff"></Route>
                    <Route path="/admin/applies" element={<ApplyManagementPage/>} key="/admin/applies"></Route>
                    <Route path="/admin/register" element={<RegisterManagementPage/>} key="/admin/register"></Route>
                    <Route path="/admin/notice" element={<NoticeManagementPage/>} key="/admin/notice"></Route>
                    <Route path="/admin/tips" element={<TipManagementPage/>} key="/admin/tips"></Route>
                </Routes>
            </Router>
            <FloatButton.Group shape="square" style={{right: '1rem', bottom: '1rem',}}>
                <FloatButton icon={<UserOutlined/>} tooltip={'个人中心'}/>
                <FloatButton icon={<MessageOutlined/>} tooltip={'消息中心'}/>
                <FloatButton icon={<SkinOutlined/>} tooltip={'暗黑模式'} onClick={() => {
                    setCurTheme(curTheme ^ 1)
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