import db from '../../db.json';

const BASE_API = 'http://localhost:3001';

/**
 * Busca os produtos na API (json-server) e usa o db.json local como
 * fallback para o projeto funcionar mesmo sem a API em execução.
 */
export async function listarProdutos() {
    try {
        const resposta = await fetch(`${BASE_API}/produtos`);

        if (!resposta.ok) throw new Error('Falha ao consultar a API');

        const produtos = await resposta.json();

        if (Array.isArray(produtos) && produtos.length > 0) return produtos;

        return db.produtos;
    } catch {
        return db.produtos;
    }
}
