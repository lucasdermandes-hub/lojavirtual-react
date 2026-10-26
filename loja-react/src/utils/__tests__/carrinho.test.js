import { describe, expect, it } from 'vitest';
import {
    acoesCarrinho,
    calcularFrete,
    calcularSubtotal,
    carrinhoReducer,
} from '../carrinho';

const teclado = {
    id: '1',
    nome: 'Teclado Gamer sem fio',
    preco: 170,
    imagem: 'https://exemplo.com/teclado.jpg',
    estoque: 3,
    categoria: 'Informática',
};

describe('carrinhoReducer', () => {
    it('adiciona um produto novo ao carrinho', () => {
        const estado = carrinhoReducer([], {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado },
        });

        expect(estado).toHaveLength(1);
        expect(estado[0].quantidade).toBe(1);
        expect(estado[0].preco).toBe(170);
    });

    it('soma a quantidade quando o produto já existe', () => {
        const comItem = carrinhoReducer([], {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado },
        });

        const estado = carrinhoReducer(comItem, {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado, quantidade: 2 },
        });

        expect(estado).toHaveLength(1);
        expect(estado[0].quantidade).toBe(3);
    });

    it('respeita o estoque disponível', () => {
        const comItem = carrinhoReducer([], {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado },
        });

        const estado = carrinhoReducer(comItem, {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado, quantidade: 10 },
        });

        expect(estado[0].quantidade).toBe(3);
    });

    it('atualiza a quantidade de um item', () => {
        const comItem = carrinhoReducer([], {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado },
        });

        const estado = carrinhoReducer(comItem, {
            type: acoesCarrinho.ATUALIZAR_QUANTIDADE,
            payload: { id: '1', quantidade: 2 },
        });

        expect(estado[0].quantidade).toBe(2);
    });

    it('remove o item quando a quantidade chega a zero', () => {
        const comItem = carrinhoReducer([], {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado },
        });

        const estado = carrinhoReducer(comItem, {
            type: acoesCarrinho.ATUALIZAR_QUANTIDADE,
            payload: { id: '1', quantidade: 0 },
        });

        expect(estado).toHaveLength(0);
    });

    it('remove um item pelo id', () => {
        const comItem = carrinhoReducer([], {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado },
        });

        const estado = carrinhoReducer(comItem, {
            type: acoesCarrinho.REMOVER,
            payload: { id: '1' },
        });

        expect(estado).toHaveLength(0);
    });

    it('limpa o carrinho', () => {
        const comItem = carrinhoReducer([], {
            type: acoesCarrinho.ADICIONAR,
            payload: { produto: teclado },
        });

        expect(carrinhoReducer(comItem, { type: acoesCarrinho.LIMPAR })).toEqual([]);
    });
});

describe('cálculos do carrinho', () => {
    it('calcula o subtotal', () => {
        expect(
            calcularSubtotal([
                { preco: 170, quantidade: 2 },
                { preco: 60, quantidade: 1 },
            ])
        ).toBe(400);
    });

    it('concede frete grátis acima do limite', () => {
        expect(calcularFrete(199)).toBe(0);
        expect(calcularFrete(198.9)).toBe(19.9);
        expect(calcularFrete(0)).toBe(0);
    });
});
