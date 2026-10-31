
import { Link } from 'react-router-dom';

export function Falha() {
    return (
        <main className="pagina mensagem mensagem-falha">
            <div className="marcador-falha" aria-hidden="true">
                !
            </div>

            <h1>Não foi possível aprovar a transação</h1>

            <p>
                Os dados informados não permitiram concluir o pagamento.
                Verifique as informações e tente novamente.
            </p>

            <div className="acoes">
                <Link to="/pagamento" className="botao-primario">
                    Tentar novamente
                </Link>

                <Link to="/carrinho" className="botao-secundario">
                    Voltar ao carrinho
                </Link>
            </div>
        </main>
    );
}
