
import { Link } from 'react-router-dom';

export function NaoEncontrada() {
    return (
        <main className="pagina mensagem mensagem-erro">
            <h1>404 – Página não encontrada</h1>

            <p>
                A página que você está procurando não existe ou foi removida.
            </p>

            <div className="acoes">
                <Link to="/produtos" className="botao-primario">
                    Voltar para a loja
                </Link>
            </div>
        </main>
    );
}
