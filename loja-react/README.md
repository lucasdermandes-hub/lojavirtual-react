# Loja React — Carrinho e Checkout

Loja de exemplo em **React + Vite** com carrinho de compras, formulário de checkout
(cartão de crédito, Pix e boleto) e confirmação de pedido.

O projeto foi portado/adaptado a partir do protótipo `loja-virtual` e usa os dados
reais de `db.json` (12 produtos) via `json-server`.

## Como rodar

```bash
npm install

# terminal 1 — API de produtos (json-server)
npm run api        # http://localhost:3001/produtos

# terminal 2 — aplicação
npm run dev        # http://localhost:5173
```

A aplicação funciona mesmo sem a API em execução: nesse caso os produtos são
carregados diretamente do `db.json` (fallback em `src/services/produtos.js`).

## Scripts

| Script          | Descrição                                  |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Sobe o Vite em modo de desenvolvimento      |
| `npm run build` | Gera o build de produção em `dist/`         |
| `npm run lint`  | Roda o ESLint                              |
| `npm test`      | Roda os testes (Vitest + Testing Library)   |
| `npm run api`   | Sobe o json-server com o `db.json`          |

## Fluxo da aplicação

| Rota        | Página      | O que faz                                              |
| ----------- | ----------- | ------------------------------------------------------ |
| `/`         | `Carrinho`  | Lista os itens, permite mudar quantidade/remover, mostra o resumo (subtotal, frete, total) e uma lista para adicionar produtos |
| `/pagamento`| `Pagamento` | Formulário de checkout com validação (zod) e resumo do pedido |
| `/sucesso`  | `Sucesso`   | Confirmação do pedido com número, itens e total        |
| `/falha`    | `Falha`     | Transação recusada (regra antifraude)                  |

### Regras de negócio

- **Frete**: grátis a partir de `R$ 199,00` de subtotal, senão `R$ 19,90`.
- **Persistência**: o carrinho fica no `localStorage` (`loja-react:carrinho`) e sobrevive ao recarregar a página.
- **Estoque**: a quantidade nunca ultrapassa o `estoque` do produto.
- **Validação do cartão**: 16 dígitos, válido por Luhn, validade `MM/AA` não vencida e CVV de 3 dígitos.
- **Antifraude**: cartões com todos os dígitos iguais (ex.: `1111 1111 1111 1111`) passam pelo formulário
  mas são bloqueados na hora do pagamento, redirecionando para `/falha`.

### Cartões para teste

| Situação                          | Número            | Resultado                     |
| --------------------------------- | ----------------- | ----------------------------- |
| Pagamento aprovado                | `4539 5787 6362 1486` | Vai para `/sucesso`      |
| Bloqueado pela antifraude         | `1111 1111 1111 1111` | Vai para `/falha`        |
| Número inválido (erro no campo)   | `1234 5678 9012 3456` | Erro "Número de cartão inválido" |

## Estrutura

```
src/
├── components/        # Cabecalho, ItemCarrinho, ResumoCompra, ListaProdutos, Campo
├── context/           # CarrinhoProvider + reducer (carrinhoReducer.js)
├── hooks/             # usePagamento (simula a aprovação da transação)
├── pages/             # Carrinho, Pagamento, Sucesso, Falha
├── services/          # produtos.js (acesso à API com fallback no db.json)
├── utils/             # busca.js, moeda.jsx, pagamento.js, esquemaPagamento.js
├── App.jsx            # Rotas (react-router-dom)
└── main.jsx           # Monta a aplicação com o CarrinhoProvider
```

## Observações

- `src/utils/moeda.jsx` foi corrigido: a opção `currency` estava escrita como `corrency`,
  o que fazia `formatarMoeda` lançar erro em qualquer valor numérico.
- `src/utils/pagamrnto.js` (vazio, com o nome escrito errado) foi substituído por `src/utils/pagamento.js`.
