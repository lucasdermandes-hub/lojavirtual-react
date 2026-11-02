import { startTransition, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from './useCarrinho';
import { verificarDigitosIguais } from '../utils/pagamento';

export function usePagamento() {
    const [processando, setProcessando] = useState(false);
    const navigate = useNavigate();

    const { itens, valorTotal, limparCarrinho } = useCarrinho();

    const processarPagamento = async (dadosForm) => {
        setProcessando(true);

        // Simula a comunicação com a operadora do cartão.
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const eGolpe =
            dadosForm.metodoPagamento === 'cartao' &&
            verificarDigitosIguais(dadosForm.numeroCartao);

        setProcessando(false);

        if (eGolpe) {
            navigate('/falha');
            return;
        }

        const pedido = {
            numero: `PED-${String(Date.now()).slice(-6)}`,
            metodoPagamento: dadosForm.metodoPagamento,
            titular: dadosForm.titular,
            entrega: {
                cep: dadosForm.cep,
                endereco: dadosForm.endereco,
                numero: dadosForm.numero,
                complemento: dadosForm.complemento,
                bairro: dadosForm.bairro,
                cidade: dadosForm.cidade,
                uf: dadosForm.uf,
            },
            parcelas: dadosForm.parcelas ?? 1,
            total: valorTotal,
            itens: itens.map((item) => ({
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                quantidade: item.quantidade,
            })),
        };

        // A navegação precisa acontecer antes de esvaziar o carrinho.
        // O <RotaPrivada> redireciona para /carrinho assim que o
        // carrinho fica vazio, e como o React Router aplica a navegação
        // em uma transição, esse redirecionamento chegaria antes e a
        // compra cairia em /carrinho em vez de /sucesso.
        navigate('/sucesso', { state: pedido });

        // Esvaziar o carrinho dentro da mesma transição mantém a ordem:
        // a rota muda para /sucesso e só então o carrinho fica vazio.
        startTransition(() => {
            limparCarrinho();
        });
    };

    return { processando, processarPagamento };
}