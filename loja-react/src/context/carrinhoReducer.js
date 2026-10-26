export const acoesCarrinho = {
    ADICIONAR: 'ADICIONAR',
    ATUALIZAR_QUANTIDADE: 'ATUALIZAR_QUANTIDADE',
    REMOVER: 'REMOVER',
    LIMPAR: 'LIMPAR',
};

/** Frete grátis a partir deste valor de subtotal. */
export const VALOR_FRETE_GRATIS = 199;
export const VALOR_FRETE = 19.9;

export function calcularSubtotal(itens) {
    return itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

export function calcularFrete(subtotal) {
    if (subtotal <= 0) return 0;
    return subtotal >= VALOR_FRETE_GRATIS ? 0 : VALOR_FRETE;
}

export function calcularQuantidadeTotal(itens) {
    return itens.reduce((total, item) => total + item.quantidade, 0);
}

function normalizarItem(produto, quantidade) {
    const estoque = Number(produto.estoque ?? 0);
    const limite = estoque > 0 ? estoque : quantidade;

    return {
        id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
        imagem: produto.imagem,
        estoque,
        categoria: produto.categoria,
        quantidade: Math.min(quantidade, limite),
    };
}

export function carrinhoReducer(estado, acao) {
    switch (acao.type) {
        case acoesCarrinho.ADICIONAR: {
            const { produto, quantidade = 1 } = acao.payload;
            const existente = estado.find((item) => item.id === produto.id);

            if (existente) {
                const limite = existente.estoque > 0 ? existente.estoque : existente.quantidade + quantidade;
                return estado.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: Math.min(item.quantidade + quantidade, limite) }
                        : item
                );
            }

            return [...estado, normalizarItem(produto, quantidade)];
        }

        case acoesCarrinho.ATUALIZAR_QUANTIDADE: {
            const { id, quantidade } = acao.payload;

            return estado
                .map((item) => {
                    if (item.id !== id) return item;
                    const limite = item.estoque > 0 ? item.estoque : quantidade;
                    return { ...item, quantidade: Math.max(0, Math.min(quantidade, limite)) };
                })
                .filter((item) => item.quantidade > 0);
        }

        case acoesCarrinho.REMOVER:
            return estado.filter((item) => item.id !== acao.payload.id);

        case acoesCarrinho.LIMPAR:
            return [];

        default:
            return estado;
    }
}
