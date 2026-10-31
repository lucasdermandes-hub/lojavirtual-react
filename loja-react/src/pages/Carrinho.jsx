
import { Link } from 'react-router-dom';

import { ItemCarrinho } from '../components/molecules/ItemCarrinho';
import { ListaProdutos } from '../components/organisms/ListaProdutos';
import { ResumoCompra } from '../components/organisms/ResumoCompra';

import { useCarrinho } from '../hooks/useCarrinho';
import { useProdutos } from '../hooks/useProdutos';

export function Carrinho() {
    const {
        itens,
        quantidadeTotal,
        valorTotal,
        alterarQuantidade,
        removerItem,
    } = useCarrinho();

    const {
        produtos,
        carregando,
        erro,
    } = useProdutos();

    const vazio = itens.length === 0;

    const subtotal = valorTotal;
    const frete = 0;
    const total = subtotal + frete;

    return (
        <main className="pagina">
            <h1>Seu carrinho</h1>

            {vazio ? (
                <section className="carrinho-vazio">
                    <p>Seu carrinho está vazio.</p>

                    <p className="dica">
                        Use a lista abaixo para adicionar produtos.
                    </p>

                    <Link to="/produtos" className="botao-primario">
                        Ver catálogo
                    </Link>
                </section>
            ) : (
                <div className="carrinho-grade">
                    <section className="carrinho-conteudo">
                        <ul className="lista-itens">
                            {itens.map((item) => (
                                <ItemCarrinho
                                    key={item.id}
                                    item={item}
                                    onAlterarQuantidade={alterarQuantidade}
                                    onRemover={removerItem}
                                />
                            ))}
                        </ul>
                    </section>

                    <aside className="carrinho-lateral">
                        <ResumoCompra
                            subtotal={subtotal}
                            frete={frete}
                            total={total}
                            quantidadeTotal={quantidadeTotal}
                        />

                        <Link
                            to="/pagamento"
                            className="botao-primario"
                        >
                            Ir para o pagamento
                        </Link>
                    </aside>
                </div>
            )}

            {carregando ? (
                <p className="carregando">
                    Carregando produtos...
                </p>
            ) : erro ? (
                <p className="erro">
                    Não foi possível carregar os produtos adicionais.
                </p>
            ) : (
                <ListaProdutos produtos={produtos} />
            )}
        </main>
    );
}
