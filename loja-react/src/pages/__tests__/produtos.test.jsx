import { describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { CarrinhoProvider } from '../../contexts/CarrinhoContext';
import { Header } from '../../components/organisms/Header';
import { Produtos } from '../Produtos';

function renderizarProdutos() {
    return render(
        <CarrinhoProvider>
            <MemoryRouter initialEntries={['/produtos']}>
                <Header />
                <Produtos />
            </MemoryRouter>
        </CarrinhoProvider>
    );
}

describe('página de produtos', () => {
    it('lista os produtos vindos da API', async () => {
        renderizarProdutos();

        expect(
            await screen.findByText('Teclado Gamer sem fio')
        ).toBeTruthy();

        expect(screen.getByText('Bola de Futebol')).toBeTruthy();
    });

    it('filtra a lista pelo campo de busca', async () => {
        const usuario = userEvent.setup();
        renderizarProdutos();

        await screen.findByText('Teclado Gamer sem fio');

        const campo = screen.getByRole('searchbox', {
            name: 'Buscar produtos',
        });

        await usuario.type(campo, 'bola');

        await waitFor(() =>
            expect(screen.queryByText('Teclado Gamer sem fio')).toBeNull()
        );

        expect(screen.getByText('Bola de Futebol')).toBeTruthy();
    });

    it('avisa quando nenhum produto corresponde ao termo', async () => {
        const usuario = userEvent.setup();
        renderizarProdutos();

        await screen.findByText('Teclado Gamer sem fio');

        const campo = screen.getByRole('searchbox', {
            name: 'Buscar produtos',
        });

        await usuario.type(campo, 'xyzabc');

        expect(
            await screen.findByText(/Nenhum produto encontrado/)
        ).toBeTruthy();
    });

    it('limpa a busca e volta a listar todos os produtos', async () => {
        const usuario = userEvent.setup();
        renderizarProdutos();

        await screen.findByText('Teclado Gamer sem fio');

        const campo = screen.getByRole('searchbox', {
            name: 'Buscar produtos',
        });

        await usuario.type(campo, 'bola');
        await screen.findByText(/Nenhum produto encontrado/).catch(() => null);

        const botaoLimpar = screen
            .getAllByRole('button', { name: /limpar|ver todos/i })
            .at(-1);

        await usuario.click(botaoLimpar);

        await waitFor(() =>
            expect(screen.getByText('Teclado Gamer sem fio')).toBeTruthy()
        );

        expect(campo.value).toBe('');
    });

    it('mostra o contador de itens do carrinho no Header', async () => {
        const usuario = userEvent.setup();
        renderizarProdutos();

        await screen.findByText('Teclado Gamer sem fio');

        const cartao = screen.getByText('Teclado Gamer sem fio').closest('li');
        await usuario.click(
            within(cartao).getByRole('button', { name: /Adicionar/ })
        );

        await waitFor(() =>
            expect(
                screen.getByLabelText('1 itens no carrinho')
            ).toBeTruthy()
        );
    });
});
