<div align="center">

<img src="loja-react/public/logo-brivio.png" alt="Brivio" width="220" />

# Brivio — Loja Virtual

E-commerce de exemplo em **React 19**: catálogo com busca, detalhe do produto, carrinho de
compras e checkout (cartão, Pix e boleto).

</div>

---

## Links da entrega

| Item | Link |
| --- | --- |
| Aplicação publicada | _preencher com o link da Netlify_ |
| Quadro de tarefas (Trello) | _preencher com o link do board_ |
| Vídeo de apresentação (Google Drive) | _preencher com o link do vídeo_ |
| Repositório | https://github.com/lucasdermandes-hub/lojavirtual-react |

## O problema que resolve

Lojas de exemplo costumam perder o carrinho ao recarregar a página, espalhar validação de
formulário pelos componentes e esconder as regras de negócio dentro do JSX.

Aqui o carrinho fica num `useReducer` com persistência em `localStorage`, o checkout é
validado por **schema do Zod** (nada de `if` manual) e as regras de negócio moram em
funções puras em `src/utils/` — testáveis sem DOM.

## Tecnologias

- **React 19** + **React Router 7** (rotas, layout e rota protegida do checkout)
- **Vite 8** (build e dev server) + **Vitest 5** e **Testing Library** (36 testes)
- **Zod 4** + **React Hook Form** (validação do checkout)
- **Material UI 9** (`Badge`, `IconButton`, `Tooltip`) + CSS autoral com *design tokens*
  e tema claro/escuro
- **JavaScript (ESM)**, **JSX** e **CSS3** em `globais.css` + `componentes.css`
- **json-server** como API simulada do catálogo (`db.json`)

## Como executar

```bash
git clone https://github.com/lucasdermandes-hub/lojavirtual-react.git
cd lojavirtual-react/loja-react
npm install
```

Dois terminais — em desenvolvimento a API é usada para servir o catálogo:

```bash
npm run api   # terminal 1 — API de produtos em http://localhost:3001
npm run dev   # terminal 2 — aplicação em http://localhost:5173
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run api` | Sobe o `json-server` com o `db.json` |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |
| `npm run lint` | ESLint |
| `npm test` | Testes (Vitest) — roda sem a API no ar |

### Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `VITE_API_URL` | Endereço da API simulada (padrão `http://localhost:3001`) |
| `VITE_USO_DADOS_LOCAIS` | `true` lê o catálogo direto do `db.json`; `false` usa a API |

Em desenvolvimento o `.env` deixa `VITE_USO_DADOS_LOCAIS=false` (usa o json-server).
Na versão publicada o `.env.production` deixa `true`, porque na Netlify não existe
json-server — assim o `db.json` é importado pelo bundle e o catálogo continua carregando.

## Como está organizado

```
loja-react/
├── db.json               # 12 produtos da API simulada
├── netlify.toml          # build + rewrite de SPA
├── src/
│   ├── components/       # Atomic Design: atoms → molecules → organisms → templates
│   │   ├── atoms/        # Botao · Preco · Campo · CampoBusca
│   │   ├── molecules/    # ProdutoCard · ItemCarrinho
│   │   ├── organisms/    # Header · ListaProdutos · ResumoCompra
│   │   └── templates/    # Layout (Header + Outlet + Footer)
│   ├── pages/            # Produtos · DetalheProduto · Carrinho · Pagamento · Sucesso · Falha · 404
│   ├── contexts/         # CarrinhoContext (useReducer) · TemaContext
│   ├── hooks/            # useCarrinho · useProdutos · usePagamento · useTema
│   ├── routes/           # RotaPrivada
│   ├── services/         # api.js (fetch → json-server, com fallback para o db.json)
│   ├── utils/            # funções puras: carrinho · pagamento · esquemaPagamento · moeda · busca
│   ├── test/             # setup.js (mock do fetch para os testes de página)
│   └── assets/estilos/   # globais.css (tokens e reset) + componentes.css (todos os componentes)
```

Todo o CSS vive em dois arquivos dentro de `src/assets/estilos/`:

- **`globais.css`** — tokens de design (cores, tipografia, espaçamentos, sombras),
  reset e as bases do tema claro/escuro;
- **`componentes.css`** — o estilo de cada parte da interface (cabeçalho, vitrine,
  card de produto, carrinho, checkout e telas de resultado), com as media queries
  de responsividade no fim do arquivo.

## Material UI

Além do CSS autoral, a interface usa componentes do **Material UI** onde eles
encaixam bem:

- `Badge` — contador de itens no carrinho (no Header);
- `IconButton` + `Tooltip` — botão de alternância do tema claro/escuro.

O tema é controlado por tokens CSS (`data-tema` no `<html>`), então os componentes
do MUI são estilizados pelo `componentes.css` com as mesmas variáveis do design.

## Regras principais

- Frete grátis a partir de **R$ 199,00** de subtotal; abaixo disso, **R$ 19,90**.
- A quantidade nunca passa do **estoque** do produto.
- Cartão: **16 dígitos**, **Luhn**, validade `MM/AA` não vencida e **CVV** de 3 dígitos.
- **Antifraude**: cartão com dígitos repetidos (`1111 1111 1111 1111`) passa no formulário
  mas é bloqueado na aprovação e cai na tela de falha com a mensagem
  **"tentativa de golpe"**.

Para aprovar um pagamento, use o cartão `4539 5787 6362 1486`.

## Testes

```bash
npm test
```

36 testes cobrindo as funções de regra de negócio (`formatarMoeda`, `carrinhoReducer`,
`calcularFrete`, máscaras e validação de cartão, `validarCartao`, `verificarDigitosIguais`,
`validadeEstaExpirada`) e os fluxos de página (produtos/busca, carrinho e checkout).
Os testes de página usam um mock do `fetch` (`src/test/setup.js`), então rodam sem o
`json-server` ligado.

## Melhorias possíveis

- Carrinho lateral (drawer), filtros por categoria e faixa de preço na vitrine.
- Busca sincronizada com a query string (`/produtos?busca=tenis`) e `useDebounce`.
- Autenticação, histórico de pedidos, cupons de desconto e cálculo de impostos.
- Testes de acessibilidade com `axe-core` e CI no GitHub Actions.

## Autor

Lucas Dermandes — [@lucasdermandes-hub](https://github.com/lucasdermandes-hub) · licença MIT.
