import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useCarrinho } from '../hooks/useCarrinho';

export function RotaPrivada({ children }) {
  const { itens } = useCarrinho();

  // Se o carrinho estiver vazio, redireciona para a página do carrinho
  if (!itens || itens.length === 0) {
    return <Navigate to="/carrinho" replace />;
  }

  return children;
}

RotaPrivada.propTypes = {
  children: PropTypes.node.isRequired,
};