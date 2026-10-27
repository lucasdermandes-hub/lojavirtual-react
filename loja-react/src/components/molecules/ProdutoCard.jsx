import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../hooks/useCarrinho';
import { formatarMoeda } from '../../utils/moeda';

export function ProdutoCard({ produto }) {
  const { adicionarItem, itens } = useCarrinho();

  // Verifica se a quantidade no carrinho já atingiu o estoque total
  const itemNoCarrinho = itens?.find((item) => item.id === produto.id);
  const semEstoque = itemNoCarrinho ? itemNoCarrinho.quantidade >= produto.estoque : produto.estoque <= 0;

  return (
    <article className="cartao-produto">
      <img
        src={produto.imagem}
        alt={produto.nome}
      />
      <div className="cartao-produto-info">
        <span className="item-categoria">{produto.categoria}</span>
        <h3>{produto.nome}</h3>
        <p className="preco">{formatarMoeda(produto.preco)}</p>
        <small>
          {produto.estoque > 0
            ? `Estoque: ${produto.estoque} un.`
            : 'Produto indisponível'}
        </small>
        <Link
          to={`/produtos/${produto.id}`}
          className="botao-secundario"
          style={{ marginTop: '8px', textAlign: 'center' }}
        >
          Ver Detalhes
        </Link>
      </div>

      <button
        type="button"
        className="botao-adicionar"
        disabled={semEstoque}
        onClick={() => adicionarItem(produto)}
      >
        {semEstoque ? 'Sem estoque' : 'Adicionar ao carrinho'}
      </button>
    </article>
  );
}

ProdutoCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    categoria: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
  }).isRequired,
};