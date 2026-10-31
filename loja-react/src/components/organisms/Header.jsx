
import { Link } from 'react-router-dom';

import { useCarrinho } from '../../hooks/useCarrinho';

export function Header() {
    const { quantidadeTotal } = useCarrinho();

    return (
        <header className="cabecalho">
            <Link to="/" className="marca" aria-label="Brivio - Página inicial">
                <img
                    src="/logo-brivio.png"
                    alt="Brivio - Sua loja, do seu jeito."
                    className="logo-brivio logo-brivio--claro"
                    width="380"
                    height="182"
                />
                <img
                    src="/logo-brivio-escuro.png"
                    alt=""
                    className="logo-brivio logo-brivio--escuro"
                    width="380"
                    height="182"
                    aria-hidden="true"
                />
            </Link>

            <nav className="navegacao">
                <Link to="/carrinho" className="link-cabecalho">
                    Carrinho

                    <span
                        className="badge"
                        aria-label={`${quantidadeTotal} itens no carrinho`}
                    >
                        {quantidadeTotal}
                    </span>
                </Link>
            </nav>
        </header>
    );
}
