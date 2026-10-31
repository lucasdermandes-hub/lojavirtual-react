
import { Link } from 'react-router-dom';

import { useCarrinho } from '../../hooks/useCarrinho';
import { useTema } from '../../hooks/useTema';

export function Header() {
    const { quantidadeTotal } = useCarrinho();
    const { tema, alternarTema } = useTema();

    const temaEscuro = tema === 'escuro';

    const rotuloTema = temaEscuro
        ? 'Ativar tema claro'
        : 'Ativar tema escuro';

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
                <button
                    type="button"
                    className="botao-tema"
                    onClick={alternarTema}
                    aria-label={rotuloTema}
                    title={rotuloTema}
                >
                    <svg
                        className="botao-tema-icone botao-tema-lua"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>

                    <svg
                        className="botao-tema-icone botao-tema-sol"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                </button>

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
