import PropTypes from 'prop-types';

export function Botao({
  children,
  onClick,
  tipo = 'button',
  variante = 'primario',
  desabilitado = false,
  className = '',
  ...outrasProps
}) {
  const classeVariante =
    variante === 'secundario'
      ? 'botao-secundario'
      : 'botao-primario';

  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={desabilitado}
      className={`${classeVariante} ${className}`.trim()}
      {...outrasProps}
    >
      {children}
    </button>
  );
}

Botao.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  tipo: PropTypes.oneOf(['button', 'submit', 'reset']),
  variante: PropTypes.oneOf(['primario', 'secundario']),
  desabilitado: PropTypes.bool,
  className: PropTypes.string,
};
