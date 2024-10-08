import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Wallet from './pages/wallet';
import Menu from './pages/menu';
import Checkout from './pages/checkout';


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Wallet />} />
                <Route path="/menu" element={<Menu />} />
                <Route path='/checkout' element={<Checkout />} />
            </Routes>
        </Router>
    );
}
