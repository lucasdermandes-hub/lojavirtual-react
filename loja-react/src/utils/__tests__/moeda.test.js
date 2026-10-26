import { describe, expect, it } from 'vitest';
import { formatarMoeda } from '../moeda';

describe('formatarMoeda', () => {
    it('formata valores em real', () => {
        expect(formatarMoeda(170).replace(/\u00a0/g, ' ')).toMatch(/170,00/);
    });

    it('devolve valor padrão para entradas inválidas', () => {
        expect(formatarMoeda('abc')).toBe('R$ 0,00');
        expect(formatarMoeda(undefined)).toBe('R$ 0,00');
    });
});
