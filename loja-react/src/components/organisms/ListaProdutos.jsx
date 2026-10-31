
import PropTypes from 'prop-types';
import { ProdutoCard } from '../molecules/ProdutoCard';

export function ListaProdutos({ produtos }) {
    return (
        <section className="lista-produtos">
            <div className="lista-produtos-cabecalho">
                <h2>Conheça nossos produtos</h2>
                <p>Encontre os produtos que você procura na Brivio.</p>
            </div>

            {!produtos || produtos.length === 0 ? (
                <p className="vazio">
                    Nenhum produto disponível no momento.
                </p>
            ) : (
                <ul className="grade-produtos">
                    {produtos.map((produto) => (
                        <li key={produto.id}>
                            <ProdutoCard produto={produto} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

ListaProdutos.propTypes = {
    produtos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            nome: PropTypes.string.isRequired,
            preco: PropTypes.number.isRequired,
            estoque: PropTypes.number.isRequired,
        })
    ).isRequired,
};
