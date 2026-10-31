
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const TemaContext = createContext();

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem('tema') || 'claro';
  });

  function alternarTema() {
    setTema((temaAtual) =>
      temaAtual === 'claro' ? 'escuro' : 'claro'
    );
  }

  useEffect(() => {
    localStorage.setItem('tema', tema);
    document.documentElement.setAttribute('data-tema', tema);
  }, [tema]);

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}

TemaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
