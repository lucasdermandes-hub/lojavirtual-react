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

A organização segue o **Atomic Design**, do mais simples para o mais complexo:

```
loja-react/
├── db.json                       — produtos da API simulada (json-server)
├── package.json                  — dependências e scripts
├── vite.config.js                — configuração do Vite
├── README.md                     — documentação e instruções de execução
└── src/
    ├── main.jsx                  — ponto de entrada (BrowserRouter + CarrinhoProvider)
    ├── App.jsx                   — configuração das rotas
    ├── components/
    │   ├── atoms/                — Botao, Preco, CampoBusca, Campo
    │   ├── molecules/            — ProdutoCard, ItemCarrinho
    │   ├── organisms/            — Header, ListaProdutos, ResumoCompra
    │   └── templates/            — Layout (Header + Outlet + Footer)
    ├── pages/                    — Produtos, DetalheProduto, Carrinho, Pagamento,
    │                                Sucesso, Falha, NaoEncontrada
    ├── routes/                   — RotaPrivada.jsx
    ├── contexts/                 — CarrinhoContext.jsx, TemaContext.jsx
    ├── hooks/                    — useCarrinho.js, useProdutos.js, usePagamento.js
    ├── services/                 — api.js (fetch para o json-server)
    ├── utils/                    — moeda.js, carrinho.js, busca.js, pagamento.js
    │   └── __tests__/            — testes das funções de utils
    └── assets/                   — imagens e estilos globais
        ├── imagens/
        └── estilos/
```

### Níveis do Atomic Design

| Nível          | O que é                                        | Onde está                              |
| -------------- | ---------------------------------------------- | --------------------------------------- |
| **atoms**      | Blocos visuais sem regra de negócio           | `components/atoms/`                     |
| **molecules**  | Combinações de atoms com uma função           | `components/molecules/`                 |
| **organisms**  | Blocos com estado próprio e integração        | `components/organisms/`                 |
| **templates**  | Casca das páginas (Header + Outlet + Footer)   | `components/templates/`                 |
| **pages**      | Telas roteadas                                 | `pages/`                                |

### Camadas de apoio

| Pasta       | Responsabilidade                                                              |
| ----------- | ----------------------------------------------------------------------------- |
| `contexts/` | Estado global: carrinho (`CarrinhoContext`) e tema (`TemaContext`)              |
| `hooks/`    | Lógica reutilizável: `useCarrinho`, `useProdutos`, `usePagamento`              |
| `services/` | Comunicação com a API (`json-server`) com fallback no `db.json`                 |
| `utils/`    | Funções puras: moeda, carrinho, busca e pagamento (máscaras + validação zod)  |
| `routes/`   | Guarda de rota (`RotaPrivada`) que protege o checkout                          |

### Arquivos ainda vazios

A reestruturação de pastas foi feita sem implementar o que ainda está em branco.
Estes arquivos existem na árvore e estão prontos para serem preenchidos:

| Arquivo                            | Preenchimento esperado                        |
| ---------------------------------- | --------------------------------------------- |
| `components/atoms/Botao.jsx`       | botão reutilizável                            |
| `components/atoms/Preco.jsx`       | exibição de valor monetário                   |
| `components/atoms/CampoBusca.jsx`  | campo de busca por texto                      |
| `components/molecules/ProdutoCard.jsx` | cartão de produto da vitrine               |
| `contexts/TemaContext.jsx`         | contexto de tema claro/escuro                 |
| `hooks/useProdutos.js`             | carregamento dos produtos da API              |
| `routes/RotaPrivada.jsx`           | guarda de rota do checkout                    |
| `pages/Produtos.jsx`               | vitrine de produtos                           |
| `pages/DetalheProduto.jsx`         | detalhes de um produto                         |
| `pages/NaoEncontrada.jsx`          | página 404                                    |

## Observações

- `src/utils/moeda.jsx` foi corrigido: a opção `currency` estava escrita como `corrency`,
  o que fazia `formatarMoeda` lançar erro em qualquer valor numérico.
- `src/utils/pagamrnto.js` (vazio, com o nome escrito errado) foi substituído por `src/utils/pagamento.js`.
- O esquema de validação (zod) continua em `src/utils/esquemaPagamento.js`, separado de
  `utils/pagamento.js`, para não alterar o conteúdo dos utilitários existentes.
- `eslint.config.js` tem uma exceção para `src/contexts/**`: o `react-refresh` não aceita que
  um arquivo exporte o `createContext` junto com o provider.
