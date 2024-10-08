import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wallet from './pages/wallet';
import Menu from './pages/menu';


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Wallet />} />
                <Route path="/menu" element={<Menu />} />
            </Routes>
        </Router>
    );
}
