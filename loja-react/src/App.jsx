import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Cabecalho } from './components/Cabecalho';
import { Carrinho } from './pages/Carrinho';
import { Falha } from './pages/Falha';
import { Pagamento } from './pages/Pagamento';
import { Sucesso } from './pages/Sucesso';
import './App.css';

function Layout() {
    return (
        <>
            <Cabecalho />
            <Outlet />
            <footer className="rodape">
                <p>Loja React — projeto de estudo com carrinho e checkout.</p>
            </footer>
        </>
    );
}

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Carrinho />} />
                    <Route path="/pagamento" element={<Pagamento />} />
                    <Route path="/sucesso" element={<Sucesso />} />
                    <Route path="/falha" element={<Falha />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
