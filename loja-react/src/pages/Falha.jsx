import { Link } from 'react-router-dom';

export function Falha() {
    return (
        <main className="pagina mensagem mensagem-falha">
            <div className="marcador-falha" aria-hidden="true">
                !
            </div>
            <h1>Não foi possível aprovar a transação</h1>
            <p>
                A operadora recusou os dados do cartão. Verifique o número, a validade e o CVV e tente novamente.
            </p>

            <div className="acoes">
                <Link to="/pagamento" className="botao-primario">
                    Tentar novamente
                </Link>
                <Link to="/" className="botao-secundario">
                    Voltar ao carrinho
                </Link>
            </div>
        </main>
    );
}
