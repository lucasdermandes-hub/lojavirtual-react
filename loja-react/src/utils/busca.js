export function filtrarProdutos(produtos, termo) {
    if (!Array.isArray(produtos)) return [];
    if (!termo || typeof termo !== 'string') return produtos;

    const termoNormalizado = termo.toLocaleLowerCase().trim();
    return produtos.filter((produto) =>
        (produto.nome ?? '').toLocaleLowerCase().includes(termoNormalizado)
    );
}
