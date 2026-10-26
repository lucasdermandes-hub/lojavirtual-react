import { Link } from 'react-router-dom';
import { useCarrinho } from '../../hooks/useCarrinho';

export function Header() {
    const { quantidadeTotal } = useCarrinho();

    return (
        <header className="cabecalho">
            <Link to="/" className="marca">
                <span aria-hidden="true">🛍️</span> Loja React
            </Link>

            <nav className="navegacao">
                <Link to="/" className="link-cabecalho">
                    Carrinho
                    <span className="badge" aria-label={`${quantidadeTotal} itens no carrinho`}>
                        {quantidadeTotal}
                    </span>
                </Link>
            </nav>
        </header>
    );
}
