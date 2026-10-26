import { formatarMoeda } from '../utils/moeda';

export function ItemCarrinho({ item, onAlterarQuantidade, onRemover }) {
    const subtotal = item.preco * item.quantidade;

    return (
        <li className="item-carrinho">
            <img className="item-imagem" src={item.imagem} alt={item.nome} loading="lazy" />

            <div className="item-info">
                <h3 className="item-nome">{item.nome}</h3>
                {item.categoria && <span className="item-categoria">{item.categoria}</span>}
                <p className="item-detalhes">
                    {formatarMoeda(item.preco)} × {item.quantidade}
                </p>

                <div className="item-controles">
                    <div className="quantidade">
                        <button
                            type="button"
                            onClick={() => onAlterarQuantidade(item.id, item.quantidade - 1)}
                            aria-label={`Diminuir quantidade de ${item.nome}`}
                        >
                            −
                        </button>
                        <span>{item.quantidade}</span>
                        <button
                            type="button"
                            onClick={() => onAlterarQuantidade(item.id, item.quantidade + 1)}
                            disabled={item.estoque > 0 && item.quantidade >= item.estoque}
                            aria-label={`Aumentar quantidade de ${item.nome}`}
                        >
                            +
                        </button>
                    </div>

                    <button type="button" className="botao-remover" onClick={() => onRemover(item.id)}>
                        Remover
                    </button>
                </div>
            </div>

            <p className="item-subtotal">{formatarMoeda(subtotal)}</p>
        </li>
    );
}
