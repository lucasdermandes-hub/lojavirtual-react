
import PropTypes from 'prop-types';

export function CampoBusca({
  valor,
  onChange,
  placeholder = 'Buscar bicicletas...',
  className = '',
}) {
  return (
    <input
      type="search"
      value={valor}
      onChange={(evento) => onChange(evento.target.value)}
      placeholder={placeholder}
      aria-label="Buscar produtos"
      className={`campo-busca ${className}`.trim()}
    />
  );
}

CampoBusca.propTypes = {
  valor: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
