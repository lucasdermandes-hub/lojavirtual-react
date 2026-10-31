
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../hooks/useCarrinho';
import { formatarMoeda } from '../../utils/moeda';
import { Botao } from '../atoms/Botao';

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

  return (
    <article className="cartao-produto">
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

        <p className="preco">
          {formatarMoeda(produto.preco)}
        </p>

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

      <Botao
        className="botao-adicionar"
        desabilitado={semEstoque}
        onClick={() => adicionarItem(produto)}
      >
        {semEstoque
          ? 'Sem estoque'
          : 'Adicionar ao carrinho'}
      </Botao>
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
