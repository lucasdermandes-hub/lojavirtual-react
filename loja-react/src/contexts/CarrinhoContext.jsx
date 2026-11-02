
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import PropTypes from 'prop-types';

import { acoesCarrinho, carrinhoReducer } from '../utils/carrinho';

export const CarrinhoContext = createContext();

const CHAVE_ARMAZENAMENTO = 'loja-react:carrinho';

/** Lê o carrinho salvo no navegador. */
function carregarCarrinho() {
    try {
        const dados = window.localStorage.getItem(CHAVE_ARMAZENAMENTO);

        if (!dados) return [];

        const itens = JSON.parse(dados);

        return Array.isArray(itens) ? itens : [];
    } catch {
        // Armazenamento indisponível ou dados corrompidos.
        return [];
    }
}

export function CarrinhoProvider({ children }) {
    const [itens, dispatch] = useReducer(
        carrinhoReducer,
        undefined,
        carregarCarrinho
    );

    // Mantém o carrinho salvo ao recarregar a página.
    useEffect(() => {
        try {
            window.localStorage.setItem(
                CHAVE_ARMAZENAMENTO,
                JSON.stringify(itens)
            );
        } catch {
            // Modo privado ou cota cheia: segue sem persistir.
        }
    }, [itens]);

    // Adiciona um produto ao carrinho
    function adicionarItem(produto) {
        // Não adiciona produtos sem estoque
        if (produto.estoque < 1) {
            return;
        }

        dispatch({
            type: acoesCarrinho.ADICIONAR,
            payload: { produto },
        });
    }

    // Altera a quantidade respeitando estoque e mínimo de 1
    function alterarQuantidade(id, novaQuantidade) {
        if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
            return;
        }

        dispatch({
            type: acoesCarrinho.ATUALIZAR_QUANTIDADE,
            payload: { id, quantidade: novaQuantidade },
        });
    }

    // Remove um produto do carrinho
    function removerItem(id) {
        dispatch({
            type: acoesCarrinho.REMOVER,
            payload: { id },
        });
    }

    // Limpa o carrinho
    // Mantém a referência estável para poder ser usada em efeitos.
    const limparCarrinho = useCallback(() => {
        dispatch({ type: acoesCarrinho.LIMPAR });
    }, []);

    // Calcula a quantidade total de unidades
    const quantidadeTotal = useMemo(() => {
        return itens.reduce(
            (acumulador, item) => acumulador + item.quantidade,
            0
        );
    }, [itens]);

    // Calcula o valor total da compra
    const valorTotal = useMemo(() => {
        return itens.reduce(
            (acumulador, item) => acumulador + item.preco * item.quantidade,
            0
        );
    }, [itens]);

    const valor = {
        itens,
        adicionarItem,
        alterarQuantidade,
        removerItem,
        limparCarrinho,
        quantidadeTotal,
        valorTotal,
    };

    return (
        <CarrinhoContext.Provider value={valor}>
            {children}
        </CarrinhoContext.Provider>
    );
}

CarrinhoProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
