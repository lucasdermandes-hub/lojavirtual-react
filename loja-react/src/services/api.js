import db from '../../db.json';

const BASE_API = 'http://localhost:3001';

export async function buscarProdutos() {
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

export async function listarProdutos() {
  return buscarProdutos();
}

export async function buscarProdutoPorId(id) {
  try {
    const resposta = await fetch(`${BASE_API}/produtos/${id}`);

    if (!resposta.ok) throw new Error('Produto não encontrado na API');

    return await resposta.json();
  } catch {
    const produto = db.produtos.find((item) => String(item.id) === String(id));
    if (!produto) throw new Error('Produto não encontrado!');
    return produto;
  }
}