import PropTypes from 'prop-types';

const formatadorPreco = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function Preco({ valor, className = '' }) {
  return (
    <span className={`preco ${className}`.trim()}>
      {formatadorPreco.format(valor)}
    </span>
  );
}

Preco.propTypes = {
  valor: PropTypes.number.isRequired,
  className: PropTypes.string,
};
