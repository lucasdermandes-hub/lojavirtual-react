# Brivio — Loja Virtual

**Sua loja, do seu jeito.**

A Brivio é uma loja virtual desenvolvida com React e Vite como projeto
avaliativo. A aplicação apresenta um catálogo de produtos, busca,
detalhes dos produtos, carrinho de compras e fluxo de pagamento
simulado.

## Tecnologias

- **React** — construção da interface por componentes.
- **Vite** — ambiente de desenvolvimento e build.
- **JavaScript** — lógica da aplicação.
- **React Router DOM** — navegação entre páginas.
- **JSON Server** — API REST simulada para os produtos.
- **React Hook Form e Zod** — gerenciamento e validação do
formulário de pagamento.
- **CSS** — estilização e responsividade.

## Funcionalidades

- Catálogo de produtos carregado por meio de uma API simulada.
- Busca de produtos pelo nome.
- Exibição de informações e detalhes dos produtos.
- Carrinho com inclusão, alteração de quantidade e remoção de itens.
- Verificação de disponibilidade conforme o estoque.
- Cálculo do subtotal e do total da compra.
- Formulário de pagamento com validação.
- Simulação de aprovação ou falha no pagamento.
- Páginas de sucesso e falha da compra.
- Layout organizado em componentes reutilizáveis.

> **Observação:** o pagamento é simulado para fins didáticos. A
aplicação não processa transações financeiras reais.
> 

## Requisitos

Antes de executar o projeto, instale:

- Node.js (versão LTS recomendada).
- npm, que é instalado junto com o Node.js.

## Como executar

1. Clone o repositório ou abra a pasta do projeto no computador.
2. Abra o terminal na pasta raiz do projeto.
3. Instale as dependências:
    
    ```bash
    npm install
    ```
    
4. Inicie a API simulada em um terminal:
    
    ```bash
    npm run api
    ```
    
5. Em outro terminal, na pasta do projeto, inicie a aplicação:
    
    ```bash
    npm run dev
    ```
    
6. Acesse no navegador o endereço local informado pelo Vite no
terminal, normalmente `http://localhost:5173`.

**Importante:** mantenha a API e o servidor do Vite em execução enquanto
estiver utilizando a aplicação. O comando `npm run api` deve estar
configurado no `package.json` para iniciar o JSON Server com o arquivo
`db.json`.

## Estrutura do projeto

A organização pode ser consultada na pasta `src`. Os principais
diretórios são:

```
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── contexts/
├── hooks/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
└── main.jsx

public/
└── logo-brivio.png

db.json
index.html
package.json
```

### Organização dos componentes

- **atoms:** componentes básicos de interface, como botões e campos.
- **molecules:** combinações de componentes menores, como o cartão de
produto e o item do carrinho.
- **organisms:** seções maiores, como cabeçalho e listagem de
produtos.
- **templates:** estruturas compartilhadas entre páginas.
- **contexts:** estados compartilhados da aplicação, como o carrinho e
o tema.
- **hooks:** lógica reutilizável da aplicação.
- **pages:** páginas acessadas pelas rotas.
- **routes:** componentes relacionados à proteção e ao controle de
rotas.
- **services:** comunicação com a API.
- **utils:** funções auxiliares, como formatação de moeda e filtragem.

## API simulada

Os dados dos produtos ficam no arquivo `db.json` e são disponibilizados
pelo JSON Server.

Endpoints utilizados:

| Método | Endpoint | Descrição |
| --- | --- | --- |
| GET | `/produtos` | Retorna a lista de produtos. |
| GET | `/produtos/:id` | Retorna um produto pelo identificador. |

A API deve estar disponível localmente na porta configurada no projeto
(por exemplo, `http://localhost:3001`).

## Identidade visual

A marca utilizada é **Brivio — Sua loja, do seu jeito.** A imagem da
logo fica na pasta `public`, com o nome `logo-brivio.png`, e pode ser
utilizada no cabeçalho e como ícone da guia do navegador.

## Scripts

Os comandos disponíveis dependem das configurações do `package.json`. No
fluxo de desenvolvimento descrito neste documento:

| Comando | Finalidade |
| --- | --- |
| `npm install` | Instala as dependências do projeto. |
| `npm run api` | Inicia a API simulada com JSON Server. |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Gera a versão de produção. |

## Build de produção

Para gerar os arquivos otimizados:

```bash
npm run build
```

O resultado será gerado na pasta `dist`. Para conferir localmente a
versão de produção, utilize:

```bash
npm run preview
```

## Observações

- Os produtos dependem da API simulada estar em execução.
- Os dados e o comportamento do pagamento são destinados à
demonstração acadêmica.
- Ajuste a URL e a porta da API em `src/services/api.jsx` caso a
configuração local seja diferente.
- Consulte o `package.json` para confirmar os scripts e as versões das
dependências instaladas.

## Autoria

Projeto acadêmico desenvolvido como aplicação de loja virtual utilizando
React.

## Links

- Link da Loja Virtual: https://lojavirtual-react.netlify.app

- Link do Trello: https://trello.com/invite/b/6aceaf873f5f6efa98c03ce6/ATTI8d1cada2bf728679bf4b361933b440ed574CCDCC/loja-react-projeto-final-m2

- Link do vídeo: https://drive.google.com/file/d/1JVxX-0cIxRIGGXrlk3zLrCb-O3FznTcE/view?usp=sharing

- Link do Repositório: https://github.com/lucasdermandes-hub/lojavirtual-react.git


**Brivio — Sua loja, do seu jeito.**