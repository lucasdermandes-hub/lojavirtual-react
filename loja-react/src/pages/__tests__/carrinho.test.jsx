import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Cabecalho } from '../../components/Cabecalho';
import { CarrinhoProvider } from '../../context/CarrinhoProvider';
import { Carrinho } from '../Carrinho';

function renderizarCarrinho() {
    return render(
        <CarrinhoProvider>
            <MemoryRouter initialEntries={['/']}>
                <Cabecalho />
                <Routes>
                    <Route path="/" element={<Carrinho />} />
                </Routes>
            </MemoryRouter>
        </CarrinhoProvider>
    );
}

describe('página do carrinho', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('mostra o estado vazio quando não há itens', () => {
        renderizarCarrinho();

        expect(screen.getByText('Seu carrinho está vazio.')).toBeTruthy();
    });

    it('adiciona um produto da lista e atualiza o total', async () => {
        const usuario = userEvent.setup();
        const { container } = renderizarCarrinho();

        const cartao = (await screen.findByText('Teclado Gamer sem fio')).closest('li');
        await usuario.click(within(cartao).getByRole('button', { name: /Adicionar/ }));

        await waitFor(() => expect(container.querySelectorAll('.item-carrinho')).toHaveLength(1));

        expect(screen.getAllByText('1').length).toBeGreaterThan(0);
        expect(screen.getAllByText(/R\$\s?170,00/).length).toBeGreaterThan(0);
    });

    it('aumenta a quantidade do item no carrinho', async () => {
        const usuario = userEvent.setup();
        const { container } = renderizarCarrinho();

        const cartao = (await screen.findByText('Teclado Gamer sem fio')).closest('li');
        await usuario.click(within(cartao).getByRole('button', { name: /Adicionar/ }));

        await waitFor(() => expect(container.querySelectorAll('.item-carrinho')).toHaveLength(1));

        await usuario.click(screen.getByRole('button', { name: /Aumentar quantidade/ }));

        await waitFor(() => expect(screen.getAllByText('2').length).toBeGreaterThan(0));
        expect(screen.getAllByText(/R\$\s?340,00/).length).toBeGreaterThan(0);
    });

    it('remove o item do carrinho', async () => {
        const usuario = userEvent.setup();
        const { container } = renderizarCarrinho();

        const cartao = (await screen.findByText('Teclado Gamer sem fio')).closest('li');
        await usuario.click(within(cartao).getByRole('button', { name: /Adicionar/ }));

        await waitFor(() => expect(container.querySelectorAll('.item-carrinho')).toHaveLength(1));

        await usuario.click(screen.getByRole('button', { name: 'Remover' }));

        await waitFor(() => expect(container.querySelectorAll('.item-carrinho')).toHaveLength(0));
        expect(screen.getByText('Seu carrinho está vazio.')).toBeTruthy();
    });
});
