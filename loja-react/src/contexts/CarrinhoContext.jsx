import { createContext, useEffect, useMemo, useReducer } from 'react';
import {
    acoesCarrinho,
    calcularFrete,
    calcularQuantidadeTotal,
    calcularSubtotal,
    carrinhoReducer,
} from '../utils/carrinho';

export const CarrinhoContext = createContext(null);

const CHAVE_ARMAZENAMENTO = 'loja-react:carrinho';

function lerCarrinhoSalvo() {
    if (typeof window === 'undefined') return [];

    try {
        const dados = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);
        if (!dados) return [];

        const itens = JSON.parse(dados);
        return Array.isArray(itens) ? itens : [];
    } catch {
        return [];
    }
}

export function CarrinhoProvider({ children }) {
    const [itens, dispatch] = useReducer(carrinhoReducer, undefined, lerCarrinhoSalvo);

    useEffect(() => {
        try {
            window.localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(itens));
        } catch {
            // Armazenamento indisponível (modo privado): o carrinho segue em memória.
        }
    }, [itens]);

    const valor = useMemo(() => {
        const subtotal = calcularSubtotal(itens);
        const frete = calcularFrete(subtotal);

        return {
            itens,
            quantidadeTotal: calcularQuantidadeTotal(itens),
            subtotal,
            frete,
            total: subtotal + frete,
            adicionar: (produto, quantidade = 1) =>
                dispatch({ type: acoesCarrinho.ADICIONAR, payload: { produto, quantidade } }),
            atualizarQuantidade: (id, quantidade) =>
                dispatch({ type: acoesCarrinho.ATUALIZAR_QUANTIDADE, payload: { id, quantidade } }),
            remover: (id) => dispatch({ type: acoesCarrinho.REMOVER, payload: { id } }),
            limpar: () => dispatch({ type: acoesCarrinho.LIMPAR }),
        };
    }, [itens]);

    return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>;
}
