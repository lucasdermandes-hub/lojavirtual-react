
import { Link, useLocation } from 'react-router-dom';
import { formatarMoeda } from '../utils/moeda';

const ROTULOS = {
    cartao: 'Cartão de crédito',
    pix: 'Pix',
    boleto: 'Boleto bancário',
};

export function Sucesso() {
    const { state } = useLocation();
    const pedido = state ?? null;

    const metodo = pedido
        ? ROTULOS[pedido.metodoPagamento] ?? '—'
        : '—';

    return (
        <main className="pagina mensagem mensagem-sucesso">
            <div className="marcador-sucesso" aria-hidden="true">
                ✓
            </div>

            <h1>Compra aprovada com sucesso!</h1>
            <p>Seu pedido foi processado e logo será enviado.</p>

            {pedido && (
                <section className="detalhes-pedido">
                    <h2>Resumo do pedido</h2>

                    <dl className="resumo-lista">
                        <div className="resumo-linha">
                            <dt>Pedido</dt>
                            <dd>{pedido.numero}</dd>
                        </div>

                        <div className="resumo-linha">
                            <dt>Pagamento</dt>
                            <dd>{metodo}</dd>
                        </div>

                        {pedido.parcelas > 1 && (
                            <div className="resumo-linha">
                                <dt>Parcelas</dt>
                                <dd>
                                    {pedido.parcelas}x de{' '}
                                    {formatarMoeda(
                                        pedido.total / pedido.parcelas
                                    )}
                                </dd>
                            </div>
                        )}

                        <div className="resumo-linha">
                            <dt>Entrega</dt>
                            <dd>
                                {pedido.entrega?.endereco}, {pedido.entrega?.numero} -{' '}
                                {pedido.entrega?.bairro} /{' '}
                                {pedido.entrega?.cidade}-{pedido.entrega?.uf}
                            </dd>
                        </div>

                        <div className="resumo-linha resumo-total">
                            <dt>Total pago</dt>
                            <dd>{formatarMoeda(pedido.total)}</dd>
                        </div>
                    </dl>

                    <ul className="checkout-itens">
                        {(pedido.itens ?? []).map((item) => (
                            <li key={item.id}>
                                <span>
                                    {item.quantidade}× {item.nome}
                                </span>

                                <span>
                                    {formatarMoeda(
                                        item.preco * item.quantidade
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {pedido.metodoPagamento === 'pix' && (
                        <div className="aviso-pix">
                            <strong>Pix simulado:</strong>

                            <code>
                                00020126580014BR.GOV.BCB.PIX0136{pedido.numero}5204000053039865802BR5920LOJA REACT6009SAO PAULO62070503***6304ABCD
                            </code>

                            <p>
                                Este código é fictício e serve apenas para
                                demonstração do fluxo de pagamento.
                            </p>
                        </div>
                    )}

                    {pedido.metodoPagamento === 'boleto' && (
                        <p className="aviso-pix">
                            Boleto bancário simulado. Nenhum pagamento real
                            será processado.
                        </p>
                    )}
                </section>
            )}

            <div className="acoes">
                <Link to="/" className="botao-primario">
                    Voltar para a loja
                </Link>
            </div>
        </main>
    );
}
