const BASE_API = 'http://localhost:3001';

export async function buscarProdutos() {
  const resposta = await fetch(`${BASE_API}/produtos`);

  if (!resposta.ok) {
    throw new Error('Falha ao consultar a API');
  }

  return await resposta.json();
}

export async function listarProdutos() {
  return buscarProdutos();
}

export async function buscarProdutoPorId(id) {
  const resposta = await fetch(`${BASE_API}/produtos/${id}`);

  if (!resposta.ok) {
    throw new Error('Produto não encontrado na API');
  }

  return await resposta.json();
}