import Index from './pages/index.tsx';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Admin from "./pages/admin.tsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index/>} key="index"></Route>
                <Route path="/admin" element={<Admin/>} key="admin"></Route>
            </Routes>
        </Router>
    );
};
export default App;