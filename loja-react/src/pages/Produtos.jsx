import { useState, useEffect, useMemo } from 'react';
import { buscarProdutos } from '../services/api';
import { ProdutoCard } from '../components/molecules/ProdutoCard';
import { filtrarProdutos } from '../utils/busca';

export function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro(null);
        const dados = await buscarProdutos();
        setProdutos(dados);
      } catch (err) {
        setErro(err.message || 'Erro ao carregar catálogo.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const produtosFiltrados = useMemo(() => {
    return filtrarProdutos(produtos, termoBusca);
  }, [produtos, termoBusca]);

  if (carregando) {
    return <p className="carregando">Carregando catálogo de produtos...</p>;
  }

  if (erro) {
    return (
      <div className="erro-api">
        <p>Ops! Não foi possível carregar os produtos.</p>
        <p style={{ fontSize: '14px' }}>{erro}</p>
      </div>
    );
  }

  if (produtos.length === 0) {
    return <p className="vazio">Nenhum produto cadastrado.</p>;
  }

  return (
    <main className="pagina">
      <header style={{ marginBottom: '24px' }}>
        <h1>Nosso Catálogo</h1>
        <div className="busca">
          <input
            type="text"
            placeholder="Buscar por nome do produto..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          {termoBusca && (
            <button
              type="button"
              className="botao-secundario"
              onClick={() => setTermoBusca('')}
            >
              Limpar
            </button>
          )}
        </div>
      </header>

      {produtosFiltrados.length === 0 ? (
        <div className="vazio">
          <p>Nenhum produto encontrado para &quot;{termoBusca}&quot;.</p>
          <button
            type="button"
            className="botao-primario"
            style={{ marginTop: '12px' }}
            onClick={() => setTermoBusca('')}
          >
            Ver todos os produtos
          </button>
        </div>
      ) : (
        <ul className="grade-produtos">
          {produtosFiltrados.map((produto) => (
            <li key={produto.id}>
              <ProdutoCard produto={produto} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}