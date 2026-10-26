export function apenasDigitos(valor) {
    return String(valor ?? '').replace(/\D/g, '');
}

export function formatarNumeroCartao(valor) {
    const digitos = apenasDigitos(valor).slice(0, 16);
    return digitos.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function formatarValidade(valor) {
    const digitos = apenasDigitos(valor).slice(0, 4);
    if (digitos.length <= 2) return digitos;
    return `${digitos.slice(0, 2)}/${digitos.slice(2)}`;
}

export function formatarCvv(valor) {
    return apenasDigitos(valor).slice(0, 4);
}

export function formatarCep(valor) {
    const digitos = apenasDigitos(valor).slice(0, 8);
    if (digitos.length <= 5) return digitos;
    return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
}

/**
 * Regra antifraude usada no projeto de referência: cartões com todos os
 * dígitos iguais (ex.: 1111 1111 1111 1111) são considerados tentativa de golpe.
 */
export function verificarDigitosIguais(numeroCartao) {
    const limpo = apenasDigitos(numeroCartao);

    if (limpo.length !== 16) return false;

    return limpo.split('').every((digito) => digito === limpo[0]);
}

/** Validação de Luhn: checa se o número do cartão é matematicamente válido. */
export function validarCartao(numeroCartao) {
    const limpo = apenasDigitos(numeroCartao);

    if (limpo.length < 13 || limpo.length > 19) return false;

    let soma = 0;
    let dobrar = false;

    for (let i = limpo.length - 1; i >= 0; i--) {
        let digito = Number(limpo[i]);

        if (dobrar) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }

        soma += digito;
        dobrar = !dobrar;
    }

    return soma % 10 === 0;
}

/** Retorna true quando a validade (MM/AA) já passou. */
export function validadeEstaExpirada(validade) {
    const partes = String(validade ?? '').split('/');

    if (partes.length !== 2) return false;

    const mes = Number(partes[0]);
    const ano = Number(partes[1]);

    if (!mes || !ano || mes < 1 || mes > 12) return false;

    const anoCompleto = 2000 + ano;
    const agora = new Date();
    const mesAtual = agora.getMonth() + 1;
    const anoAtual = agora.getFullYear();

    if (anoCompleto < anoAtual) return true;
    if (anoCompleto > anoAtual) return false;

    return mes < mesAtual;
}
