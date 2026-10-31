import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { buscarProdutoPorId } from '../services/api';
import { useCarrinho } from '../hooks/useCarrinho';
import { formatarMoeda } from '../utils/moeda';

export function DetalheProduto() {
  const { id } = useParams();
  const { adicionarItem } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        setCarregando(true);
        setErro(false);
        setProduto(null);

        const dados = await buscarProdutoPorId(id);

        if (ativo) {
          setProduto(dados);
        }
      } catch {
        if (ativo) {
          setErro(true);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [id]);

  if (carregando) {
    return <p className="carregando">Carregando detalhes do produto...</p>;
  }

  if (erro || !produto) {
    return (
      <main className="mensagem">
        <h2>Produto não encontrado</h2>
        <p>O produto solicitado não existe ou está indisponível.</p>

        <div className="acoes">
          <Link to="/produtos" className="botao-secundario">
            &larr; Voltar para a vitrine
          </Link>
        </div>
      </main>
    );
  }

  const semEstoque = produto.estoque <= 0;

  return (
    <main className="pagina">
      <Link
        to="/produtos"
        className="botao-secundario"
        style={{ alignSelf: 'flex-start' }}
      >
        &larr; Voltar para produtos
      </Link>

      <article className="detalhe-produto">
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="detalhe-imagem"
        />

        <div className="detalhe-info">
          <div>
            <span className="item-categoria">{produto.categoria}</span>

            <h1 style={{ marginTop: '8px' }}>{produto.nome}</h1>

            <p
              style={{
                margin: '14px 0',
                color: 'var(--cor-texto-suave)',
              }}
            >
              {produto.descricao}
            </p>

            <p className="detalhe-preco">
              {formatarMoeda(produto.preco)}
            </p>

            <p className="detalhe-estoque">
              Disponível em estoque: {produto.estoque} unidades
            </p>
          </div>

          <button
            type="button"
            className="botao-primario"
            onClick={() => adicionarItem(produto)}
            disabled={semEstoque}
          >
            {semEstoque ? 'Produto indisponível' : 'Adicionar ao carrinho'}
          </button>
        </div>
      </article>
    </main>
  );
}