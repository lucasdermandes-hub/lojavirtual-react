
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useCarrinho } from '../../hooks/useCarrinho';
import { VALOR_FRETE_GRATIS } from '../../utils/carrinho';

import { Preco } from '../atoms/Preco';

export function ProdutoCard({ produto }) {
  const { adicionarItem, itens } = useCarrinho();

  const itemNoCarrinho = itens.find(
    (item) => item.id === produto.id
  );

  const quantidadeNoCarrinho = itemNoCarrinho
    ? itemNoCarrinho.quantidade
    : 0;

  const semEstoque =
    produto.estoque <= 0 ||
    quantidadeNoCarrinho >= produto.estoque;

  // Frete grátis é liberado a partir de R$ 199 de subtotal.
  // O selo aparece quando o produto, sozinho, já atinge esse valor.
  const temFreteGratis = produto.preco >= VALOR_FRETE_GRATIS;

  return (
    <article
      className={`cartao-produto${
        temFreteGratis ? ' cartao-produto--frete-gratis' : ''
      }`}
    >
      <img
        src={produto.imagem}
        alt={produto.nome}
        loading="lazy"
      />

      <div className="cartao-produto-info">
        <span className="item-categoria">
          {produto.categoria}
        </span>

        <h3>{produto.nome}</h3>

        <Preco valor={produto.preco} />

        <small>
          {produto.estoque > 0
            ? `Estoque: ${produto.estoque} un.`
            : 'Produto indisponível'}
        </small>

        <Link
          to={`/produtos/${produto.id}`}
          className="botao-secundario"
        >
          Ver detalhes
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
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    categoria: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
  }).isRequired,
};
