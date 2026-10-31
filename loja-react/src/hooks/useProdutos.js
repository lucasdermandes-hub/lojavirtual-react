import { useState, useEffect } from 'react';
import { buscarProdutos } from '../services/api';

export function useProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function carregarProdutos() {
            try {
                setCarregando(true);
                setErro('');

                const dados = await buscarProdutos();

                setProdutos(dados);
            } catch (error) {
                setErro('Não foi possível carregar os produtos.');
                console.error(error);
            } finally {
                setCarregando(false);
            }
        }

        carregarProdutos();
    }, []);

    return { produtos, carregando, erro };
}