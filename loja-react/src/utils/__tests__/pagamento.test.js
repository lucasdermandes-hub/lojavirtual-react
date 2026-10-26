import { describe, expect, it } from 'vitest';
import {
    formatarCep,
    formatarCvv,
    formatarNumeroCartao,
    formatarValidade,
    validarCartao,
    validadeEstaExpirada,
    verificarDigitosIguais,
} from '../pagamento';

describe('máscaras', () => {
    it('formata o número do cartão em grupos de quatro', () => {
        expect(formatarNumeroCartao('4539578763621486')).toBe('4539 5787 6362 1486');
    });

    it('limita o número do cartão em 16 dígitos', () => {
        expect(formatarNumeroCartao('4539578763621486999')).toBe('4539 5787 6362 1486');
    });

    it('formata a validade em MM/AA', () => {
        expect(formatarValidade('1229')).toBe('12/29');
        expect(formatarValidade('12')).toBe('12');
    });

    it('formata o CVV apenas com dígitos', () => {
        expect(formatarCvv('1a2b3')).toBe('123');
    });

    it('formata o CEP com hífen', () => {
        expect(formatarCep('01310100')).toBe('01310-100');
    });
});

describe('regra antifraude', () => {
    it('identifica cartões com todos os dígitos iguais', () => {
        expect(verificarDigitosIguais('1111 1111 1111 1111')).toBe(true);
    });

    it('não acusa cartões normais', () => {
        expect(verificarDigitosIguais('4539578763621486')).toBe(false);
    });
});

describe('validação de Luhn', () => {
    it('aceita um número válido', () => {
        expect(validarCartao('4539578763621486')).toBe(true);
    });

    it('recusa um número inválido', () => {
        expect(validarCartao('1234567890123456')).toBe(false);
    });
});

describe('validade do cartão', () => {
    it('detecta cartão vencido', () => {
        expect(validadeEstaExpirada('01/20')).toBe(true);
    });

    it('aceita cartão no futuro', () => {
        expect(validadeEstaExpirada('12/99')).toBe(false);
    });

    it('ignora formatos inválidos', () => {
        expect(validadeEstaExpirada('abc')).toBe(false);
    });
});
