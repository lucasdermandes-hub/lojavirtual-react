import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { Carrinho } from './pages/Carrinho';
import { Falha } from './pages/Falha';
import { Pagamento } from './pages/Pagamento';
import { Sucesso } from './pages/Sucesso';

export function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Carrinho />} />
                <Route path="/pagamento" element={<Pagamento />} />
                <Route path="/sucesso" element={<Sucesso />} />
                <Route path="/falha" element={<Falha />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
