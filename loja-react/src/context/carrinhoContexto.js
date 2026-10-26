import { createContext, useContext } from 'react';

export const CarrinhoContext = createContext(null);

export function useCarrinho() {
    const contexto = useContext(CarrinhoContext);

    if (!contexto) {
        throw new Error('useCarrinho precisa ser usado dentro de <CarrinhoProvider>');
    }

    return contexto;
}
