import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/templates/Layout';
import { RotaPrivada } from './routes/RotaPrivada';
import { Produtos } from './pages/Produtos';
import { DetalheProduto } from './pages/DetalheProduto';
import { Carrinho } from './pages/Carrinho';
import { Pagamento } from './pages/Pagamento';
import { Sucesso } from './pages/Sucesso';
import { Falha } from './pages/Falha';
import { NaoEncontrada } from './pages/NaoEncontrada';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
       
        <Route path="/" element={<Navigate to="/produtos" replace />} />

       
        <Route path="/produtos" element={<Produtos />} />

    
        <Route path="/produtos/:id" element={<DetalheProduto />} />

        <Route path="/carrinho" element={<Carrinho />} />

        <Route
          path="/pagamento"
          element={
            <RotaPrivada>
              <Pagamento />
            </RotaPrivada>
          }
        />
    
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/falha" element={<Falha />} />

        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;