import { beforeEach, vi } from 'vitest';

import db from '../../db.json';

/**
 * Substitui o `fetch` global por uma versão que responde com o
 * conteúdo do `db.json`. Assim os testes de página rodam sem
 * depender do `json-server` ligado em outra máquina.
 */
function respostaJson(dados, status = 200) {
    return {
        ok: status >= 200 && status < 300,
        status,
        json: async () => dados,
    };
}

beforeEach(() => {
    vi.stubGlobal(
        'fetch',
        vi.fn(async (url) => {
            const endereco = String(url);

            // GET /produtos
            if (endereco.endsWith('/produtos')) {
                return respostaJson(db.produtos);
            }

            // GET /produtos/:id
            const id = endereco.split('/').pop();
            const produto = db.produtos.find(
                (item) => String(item.id) === id
            );

            if (!produto) {
                return respostaJson({}, 404);
            }

            return respostaJson(produto);
        })
    );
});
