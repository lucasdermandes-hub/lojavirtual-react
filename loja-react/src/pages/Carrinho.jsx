import { Link } from 'react-router-dom';
import { ItemCarrinho } from '../components/ItemCarrinho';
import { ListaProdutos } from '../components/ListaProdutos';
import { ResumoCompra } from '../components/ResumoCompra';
import { useCarrinho } from '../context/carrinhoContexto';

export function Carrinho() {
    const { itens, quantidadeTotal, subtotal, frete, total, atualizarQuantidade, remover } = useCarrinho();
    const vazio = itens.length === 0;

    return (
        <main className="pagina">
            <h1>Seu carrinho</h1>

            {vazio ? (
                <section className="carrinho-vazio">
                    <p>Seu carrinho está vazio.</p>
                    <p className="dica">Use a lista abaixo para adicionar produtos.</p>
                </section>
            ) : (
                <div className="carrinho-grade">
                    <section className="carrinho-conteudo">
                        <ul className="lista-itens">
                            {itens.map((item) => (
                                <ItemCarrinho
                                    key={item.id}
                                    item={item}
                                    onAlterarQuantidade={atualizarQuantidade}
                                    onRemover={remover}
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
                            className={`botao-primario ${vazio ? 'desabilitado' : ''}`}
                            aria-disabled={vazio}
                        >
                            Ir para o pagamento
                        </Link>
                    </aside>
                </div>
            )}

            <ListaProdutos />
        </main>
    );
}
