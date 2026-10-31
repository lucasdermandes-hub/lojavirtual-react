import { useContext } from 'react';
import { TemaContext } from '../contexts/TemaContext';

export function useTema() {
    const contexto = useContext(TemaContext);

    // O Header pode ser renderizado isoladamente (ex.: em testes),
    // sem o TemaProvider. Nesse caso usamos valores neutros.
    if (!contexto) {
        return {
            tema: 'claro',
            alternarTema: () => {},
        };
    }

    return contexto;
}
