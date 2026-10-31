import PropTypes from 'prop-types';
import { formatarMoeda } from '../../utils/moeda';
import { VALOR_FRETE_GRATIS } from '../../utils/carrinho';

export function ResumoCompra({
  subtotal,
  frete,
  total,
  quantidadeTotal = 0,
}) {
  // Quanto falta para liberar o frete grátis (0 = já liberado).
  const faltaParaFreteGratis = Math.max(
    0,
    VALOR_FRETE_GRATIS - subtotal
  );

  const progressoFrete = Math.min(
    100,
    (subtotal / VALOR_FRETE_GRATIS) * 100
  );

  return (
    <section className="resumo-compra">
      <h2>Resumo da compra</h2>

      {quantidadeTotal > 0 && (
        <div
          className={`aviso-frete${
            faltaParaFreteGratis === 0 ? ' aviso-frete--liberado' : ''
          }`}
        >
          {faltaParaFreteGratis === 0 ? (
            <p>Frete grátis liberado para este pedido.</p>
          ) : (
            <>
              <p>
                Faltam{' '}
                <strong>
                  {formatarMoeda(faltaParaFreteGratis)}
                </strong>{' '}
                para o frete grátis
              </p>

              <div
                className="aviso-frete-barra"
                role="progressbar"
                aria-valuenow={Math.round(progressoFrete)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${progressoFrete}%` }} />
              </div>
            </>
          )}
        </div>
      )}

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
