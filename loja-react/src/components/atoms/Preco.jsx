import PropTypes from 'prop-types';

import { formatarMoeda } from '../../utils/moeda';

/**
 * Preço formatado em reais. Reutiliza a função pura `formatarMoeda`
 * para que o valor exibido no card, no carrinho e no checkout
 * seja sempre exatamente o mesmo.
 */
export function Preco({ valor, className = '' }) {
  return (
    <span className={`preco ${className}`.trim()}>
      {formatarMoeda(valor)}
    </span>
  );
}

Preco.propTypes = {
  valor: PropTypes.number.isRequired,
  className: PropTypes.string,
};
