import Index from './pages/index.tsx';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Admin from "./pages/admin.tsx";
import About from "./pages/about.tsx";
import User from "./pages/user.tsx";
import {ColorPicker, ConfigProvider, FloatButton, theme} from "antd";
import {FormatPainterOutlined, NotificationOutlined, SkinOutlined, SyncOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {Color} from "antd/lib/color-picker";

const App = () => {
    const [curTheme, setCurTheme] = useState(0);
    const [curColor, setCurColor] = useState<Color | string>('#2c9678')

    return (
        <ConfigProvider theme={{
            algorithm: curTheme === 0 ? theme.defaultAlgorithm : theme.darkAlgorithm,
            token: {
                colorPrimary: (typeof curColor === 'string' ? curColor : curColor.toHexString()),
            },
        }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Index/>} key="index"></Route>
                    <Route path="/admin" element={<Admin/>} key="admin"></Route>
                    <Route path="/about" element={<About/>} key="about"></Route>
                    <Route path="/user" element={<User/>} key="user"></Route>
                </Routes>
            </Router>
            <FloatButton.Group shape="square" style={{right: '1rem', bottom: '1rem',}}>
                <FloatButton icon={<UserOutlined/>}/>
                <FloatButton icon={<NotificationOutlined/>}/>
                <FloatButton icon={<SkinOutlined/>} onClick={() => {
                    setCurTheme(curTheme ^ 1)
                }}/>
                <ColorPicker value={curColor} onChange={setCurColor}>
                    <FloatButton icon={<FormatPainterOutlined/>}/>
                </ColorPicker>
                <FloatButton icon={<SyncOutlined/>}/>
                <FloatButton.BackTop visibilityHeight={0}/>
            </FloatButton.Group>
        </ConfigProvider>

    );
};
export default App;