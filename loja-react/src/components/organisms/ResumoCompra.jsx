import PropTypes from 'prop-types';
import { formatarMoeda } from '../../utils/moeda';

export function ResumoCompra({
  subtotal,
  frete,
  total,
  quantidadeTotal = 0,
}) {
  return (
    <section className="resumo-compra">
      <h2>Resumo da compra</h2>

      <dl className="resumo-lista">
        <div className="resumo-linha">
          <dt>Itens ({quantidadeTotal})</dt>
          <dd>{formatarMoeda(subtotal)}</dd>
        </div>

        <div className="resumo-linha">
          <dt>Frete</dt>
          <dd>
            {frete === 0 ? 'Grátis' : formatarMoeda(frete)}
          </dd>
        </div>

        <div className="resumo-linha resumo-total">
          <dt>Total</dt>
          <dd>{formatarMoeda(total)}</dd>
        </div>
      </dl>
    </section>
  );
}

ResumoCompra.propTypes = {
  subtotal: PropTypes.number.isRequired,
  frete: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  quantidadeTotal: PropTypes.number,
};
