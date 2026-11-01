/**
 * Serviço de acesso aos produtos.
 *
 * Em desenvolvimento a API simulada (json-server) roda em
 * http://localhost:3001. Em produção não existe json-server,
 * então o catálogo é lido direto do `db.json` importado pelo
 * bundle. O controle é feito pela variável de ambiente
 * `VITE_USO_DADOS_LOCAIS`:
 *
 *   - "true"  → usa o db.json local (padrão em produção)
 *   - "false" → consome a API simulada (padrão em desenvolvimento)
 */

import db from '../../db.json';

const BASE_API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const USO_DADOS_LOCAIS =
  import.meta.env.VITE_USO_DADOS_LOCAIS === 'true';

/**
 * Busca um produto pelo id no db.json local.
 */
function buscarProdutoLocal(id) {
  return db.produtos.find((produto) => String(produto.id) === String(id)) || null;
}

/**
 * Lista todos os produtos da API simulada.
 */
export async function buscarProdutos() {
  if (USO_DADOS_LOCAIS) {
    return db.produtos;
  }

  const resposta = await fetch(`${BASE_API}/produtos`);

  if (!resposta.ok) {
    throw new Error('Falha ao consultar a API');
  }

  return await resposta.json();
}

/**
 * Alias de `buscarProdutos`, mantido por compatibilidade.
 */
export async function listarProdutos() {
  return buscarProdutos();
}

/**
 * Busca um produto pelo id (GET /produtos/:id).
 */
export async function buscarProdutoPorId(id) {
  if (USO_DADOS_LOCAIS) {
    const produto = buscarProdutoLocal(id);

    if (!produto) {
      throw new Error('Produto não encontrado na API');
    }

    return produto;
  }

  const resposta = await fetch(`${BASE_API}/produtos/${id}`);

  if (!resposta.ok) {
    throw new Error('Produto não encontrado na API');
  }

  return await resposta.json();
}
