import { useEffect, useMemo, useState } from 'react';
import { useCarrinho } from '../context/carrinhoContexto';
import { listarProdutos } from '../services/produtos';
import { filtrarProdutos } from '../utils/busca';
import { formatarMoeda } from '../utils/moeda';

export function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [termo, setTermo] = useState('');
    const [carregando, setCarregando] = useState(true);
    const { adicionar, itens } = useCarrinho();

    useEffect(() => {
        let ativo = true;

        listarProdutos().then((dados) => {
            if (!ativo) return;
            setProdutos(dados);
            setCarregando(false);
        });

        return () => {
            ativo = false;
        };
    }, []);

    const visiveis = useMemo(() => filtrarProdutos(produtos, termo), [produtos, termo]);

    const quantidadeNoCarrinho = (id) =>
        itens.find((item) => item.id === id)?.quantidade ?? 0;

    return (
        <details className="lista-produtos">
            <summary>Adicionar produtos ao carrinho</summary>

            <div className="busca">
                <input
                    type="search"
                    value={termo}
                    onChange={(evento) => setTermo(evento.target.value)}
                    placeholder="Buscar produto pelo nome..."
                    aria-label="Buscar produto pelo nome"
                />
            </div>

            {carregando && <p className="carregando">Carregando produtos...</p>}

            {!carregando && visiveis.length === 0 && (
                <p className="vazio">Nenhum produto encontrado para “{termo}”.</p>
            )}

            <ul className="grade-produtos">
                {visiveis.map((produto) => {
                    const noCarrinho = quantidadeNoCarrinho(produto.id);
                    const semEstoque = produto.estoque === 0;

                    return (
                        <li key={produto.id} className="cartao-produto">
                            <img src={produto.imagem} alt={produto.nome} loading="lazy" />
                            <div className="cartao-produto-info">
                                <h3>{produto.nome}</h3>
                                <span className="preco">{formatarMoeda(produto.preco)}</span>
                                <small>
                                    {semEstoque
                                        ? 'Sem estoque'
                                        : `${produto.estoque} em estoque`}
                                </small>
                            </div>
                            <button
                                type="button"
                                className="botao-adicionar"
                                onClick={() => adicionar(produto)}
                                disabled={semEstoque}
                            >
                                {noCarrinho > 0 ? `Adicionar (+${noCarrinho})` : 'Adicionar'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </details>
    );
}
