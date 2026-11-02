import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CarrinhoProvider } from '../../contexts/CarrinhoContext';
import { RotaPrivada } from '../../routes/RotaPrivada';
import { Pagamento } from '../Pagamento';
import { Sucesso } from '../Sucesso';
import { Falha } from '../Falha';

const CHAVE_ARMAZENAMENTO = 'loja-react:carrinho';

function semearCarrinho() {
    window.localStorage.setItem(
        CHAVE_ARMAZENAMENTO,
        JSON.stringify([
            {
                id: '1',
                nome: 'Teclado Gamer sem fio',
                preco: 170,
                imagem: 'https://exemplo.com/teclado.jpg',
                estoque: 10,
                categoria: 'Informática',
                quantidade: 1,
            },
        ])
    );
}

function renderizarCheckout() {
    return render(
        <CarrinhoProvider>
            <MemoryRouter initialEntries={['/pagamento']}>
                <Routes>
                    <Route
                        path="/pagamento"
                        element={
                            <RotaPrivada>
                                <Pagamento />
                            </RotaPrivada>
                        }
                    />
                    <Route path="/sucesso" element={<Sucesso />} />
                    <Route path="/falha" element={<Falha />} />
                    <Route path="/carrinho" element={<p>Seu carrinho</p>} />
                </Routes>
            </MemoryRouter>
        </CarrinhoProvider>
    );
}

async function preencherEndereco(usuario) {
    await usuario.type(screen.getByLabelText('CEP'), '01310100');
    await usuario.type(screen.getByLabelText('UF'), 'sp');
    await usuario.type(screen.getByLabelText('Endereço'), 'Avenida Paulista');
    await usuario.type(screen.getByLabelText('Número'), '1000');
    await usuario.type(screen.getByLabelText('Bairro'), 'Bela Vista');
    await usuario.type(screen.getByLabelText('Cidade'), 'São Paulo');
}

describe('checkout', () => {
    beforeEach(() => {
        window.localStorage.clear();
        semearCarrinho();
    });

    it('exibe o resumo do pedido com o total', () => {
        renderizarCheckout();

        expect(screen.getByText('Resumo da compra')).toBeTruthy();
        expect(screen.getAllByText(/R\$\s?170,00/).length).toBeGreaterThan(0);
    });

    it('exibe erros de validação do cartão', async () => {
        const usuario = userEvent.setup();
        renderizarCheckout();

        await usuario.click(screen.getByRole('button', { name: /Pagar/ }));

        expect(await screen.findByText('Insira o nome do titular')).toBeTruthy();
        expect(screen.getByText('O cartão precisa ter exatamente 16 dígitos')).toBeTruthy();
        expect(screen.getByText('CEP inválido. Use o formato 00000-000')).toBeTruthy();
    });

    it('aprova um pagamento válido e limpa o carrinho', async () => {
        const usuario = userEvent.setup();
        renderizarCheckout();

        await usuario.type(screen.getByLabelText('Nome do titular do cartão'), 'Lucas Silva');
        await usuario.type(screen.getByLabelText('Número do cartão'), '4539578763621486');
        await usuario.type(screen.getByLabelText('Validade (MM/AA)'), '1229');
        await usuario.type(screen.getByLabelText('CVV'), '123');
        await preencherEndereco(usuario);

        await usuario.click(screen.getByRole('button', { name: /Pagar/ }));

        await waitFor(() => expect(screen.getByText(/Compra aprovada/)).toBeTruthy(), { timeout: 6000 });

        expect(JSON.parse(window.localStorage.getItem(CHAVE_ARMAZENAMENTO))).toHaveLength(0);
    }, 20000);

    it('bloqueia cartões com dígitos repetidos (antifraude)', async () => {
        const usuario = userEvent.setup();
        renderizarCheckout();

        await usuario.type(screen.getByLabelText('Nome do titular do cartão'), 'Lucas Silva');
        await usuario.type(screen.getByLabelText('Número do cartão'), '1111111111111111');
        await usuario.type(screen.getByLabelText('Validade (MM/AA)'), '1229');
        await usuario.type(screen.getByLabelText('CVV'), '123');
        await preencherEndereco(usuario);

        await usuario.click(screen.getByRole('button', { name: /Pagar/ }));

        await waitFor(() => expect(screen.getByText(/Processando compra/)).toBeTruthy());
        await waitFor(
            () => expect(screen.getByText(/Não foi possível aprovar a transação/)).toBeTruthy(),
            { timeout: 6000 }
        );

        // A tela de falha exibe a mensagem exata "tentativa de golpe".
        expect(screen.getByText('tentativa de golpe')).toBeTruthy();
    }, 20000);

    it('mostra a página de sucesso com a mensagem de envio', async () => {
        const usuario = userEvent.setup();
        renderizarCheckout();

        await usuario.type(screen.getByLabelText('Nome do titular do cartão'), 'Lucas Silva');
        await usuario.type(screen.getByLabelText('Número do cartão'), '4539578763621486');
        await usuario.type(screen.getByLabelText('Validade (MM/AA)'), '1229');
        await usuario.type(screen.getByLabelText('CVV'), '123');
        await preencherEndereco(usuario);

        await usuario.click(screen.getByRole('button', { name: /Pagar/ }));

        // Não pode cair em /carrinho: esvaziar o carrinho antes da
        // navegação fazia o <RotaPrivada> redirecionar para lá.
        await waitFor(
            () => expect(screen.getByText(/Compra aprovada/)).toBeTruthy(),
            { timeout: 6000 }
        );
        expect(
            screen.getByText('Seu pedido foi processado e logo será enviado.')
        ).toBeTruthy();
        expect(screen.getByText('Resumo do pedido')).toBeTruthy();

        // O carrinho só é esvaziado depois, já na página de sucesso.
        expect(
            JSON.parse(window.localStorage.getItem(CHAVE_ARMAZENAMENTO))
        ).toHaveLength(0);
    }, 20000);

    it('valida o mesmo número que é exibido no campo', async () => {
        const usuario = userEvent.setup();
        renderizarCheckout();

        await usuario.type(screen.getByLabelText('Nome do titular do cartão'), 'Lucas Silva');
        await usuario.type(screen.getByLabelText('Validade (MM/AA)'), '1229');
        await usuario.type(screen.getByLabelText('CVV'), '123');
        await preencherEndereco(usuario);

        const cartao = screen.getByLabelText('Número do cartão');

        // O campo exibe no máximo 16 dígitos; a validação precisa
        // enxergar exatamente o que está visível, e não o valor bruto.
        await usuario.type(cartao, '4539578763621486999');

        expect(cartao.value).toBe('4539 5787 6362 1486');

        // Envia com o campo ainda em foco (sem blur), como ao teclar Enter.
        await usuario.type(cartao, '{Enter}');

        // Não pode reclamar da contagem de dígitos de um valor válido.
        expect(
            screen.queryByText('O cartão precisa ter exatamente 16 dígitos')
        ).toBeNull();

        await waitFor(
            () => expect(screen.getByText(/Compra aprovada/)).toBeTruthy(),
            { timeout: 6000 }
        );
    }, 20000);
});
