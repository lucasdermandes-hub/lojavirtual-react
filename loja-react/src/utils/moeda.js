export function formatarMoeda(valor) {
    if (typeof valor !== 'number' || !Number.isFinite(valor)) {
        return 'R$ 0,00';
    }

    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}
