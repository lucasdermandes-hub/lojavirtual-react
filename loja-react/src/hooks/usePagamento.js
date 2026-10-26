import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from './useCarrinho';
import { verificarDigitosIguais } from '../utils/pagamento';

export function usePagamento() {
    const [processando, setProcessando] = useState(false);
    const navigate = useNavigate();
    const { itens, total, limpar } = useCarrinho();

    const processarPagamento = async (dadosForm) => {
        setProcessando(true);

        // Simula a comunicação com a operadora do cartão.
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const eGolpe =
            dadosForm.metodoPagamento === 'cartao' && verificarDigitosIguais(dadosForm.numeroCartao);

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
            total,
            itens: itens.map((item) => ({
                id: item.id,
                nome: item.nome,
                preco: item.preco,
                quantidade: item.quantidade,
            })),
        };

        limpar();
        navigate('/sucesso', { state: pedido });
    };

    return { processando, processarPagamento };
}
