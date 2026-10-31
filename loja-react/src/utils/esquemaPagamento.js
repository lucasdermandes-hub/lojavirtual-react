
import { z } from 'zod';

import {
    validarCartao,
    validadeEstaExpirada,
    verificarDigitosIguais,
} from './pagamento';

const camposEntrega = {
    cep: z
        .string()
        .regex(/^\d{5}-\d{3}$/, 'CEP inválido. Use o formato 00000-000'),

    endereco: z.string().min(5, 'Informe o endereço'),

    numero: z.string().min(1, 'Informe o número'),

    complemento: z.string().optional(),

    bairro: z.string().min(2, 'Informe o bairro'),

    cidade: z.string().min(2, 'Informe a cidade'),

    uf: z
        .string()
        .regex(/^[A-Z]{2}$/, 'UF inválida. Use 2 letras maiúsculas'),
};

export const METODOS_PAGAMENTO = [
    { value: 'cartao', label: 'Cartão de crédito' },
    { value: 'pix', label: 'Pix' },
    { value: 'boleto', label: 'Boleto bancário' },
];

export const esquemaPagamento = z.discriminatedUnion('metodoPagamento', [
    // Pagamento com cartão
    z.object({
        metodoPagamento: z.literal('cartao'),

        titular: z.string().min(3, 'Insira o nome do titular'),

        numeroCartao: z
            .string()
            .transform((valor) => valor.replace(/\D/g, ''))
            .refine(
                (valor) => valor.length === 16,
                'O cartão precisa ter exatamente 16 dígitos'
            )
            .refine(
                (valor) =>
                    verificarDigitosIguais(valor) || validarCartao(valor),
                'Número de cartão inválido'
            ),

        validade: z
            .string()
            .regex(
                /^(0[1-9]|1[0-2])\/\d{2}$/,
                'Formato inválido. Use MM/AA (Ex: 10/29)'
            )
            .refine(
                (valor) => !validadeEstaExpirada(valor),
                'Cartão vencido'
            ),

        cvv: z
            .string()
            .regex(/^\d{3}$/, 'CVV deve possuir 3 números'),

        parcelas: z.coerce
            .number()
            .int()
            .min(1, 'Escolha a quantidade de parcelas')
            .max(12, 'No máximo 12 parcelas'),

        ...camposEntrega,
    }),

    // Pagamento com Pix
    z.object({
        metodoPagamento: z.literal('pix'),
        ...camposEntrega,
    }),

    // Pagamento com boleto
    z.object({
        metodoPagamento: z.literal('boleto'),
        ...camposEntrega,
    }),
]);
