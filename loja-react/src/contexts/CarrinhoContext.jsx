import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  // Adiciona item ao carrinho 
  function adicionarItem(produto) {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === produto.id);

      if (itemExistente) {
        // Aqui bloqueia o carrinho se atingir o estoque máximo
        if (itemExistente.quantidade >= produto.estoque) {
          return itensAtuais;
        }

        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      // Se não existe no carrinho, adiciona com quantidade 1
      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  }

  // Altera quantidade respeitando estoque e mínimo de 1 (RF08)
  function alterarQuantidade(id, novaQuantidade) {
    if (novaQuantidade < 1) return;

    setItens((itensAtuais) =>
      itensAtuais.map((item) => {
        if (item.id === id) {
          if (novaQuantidade > item.estoque) {
            return item;
          }
          return { ...item, quantidade: novaQuantidade };
        }
        return item;
      })
    );
  }

  // Remove um produto do carrinho
  function removerItem(id) {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  }

  // Esvazia o carrinho após compra aprovada (RF13)
  function limparCarrinho() {
    setItens([]);
  }

  // Quantidade total de itens calculada com useMemo (RF06 / RF09)
  const quantidadeTotal = useMemo(() => {
    return itens.reduce((acumulador, item) => acumulador + item.quantidade, 0);
  }, [itens]);

  // Valor total em reais calculado com useMemo (RF06 / RF08 / RF10)
  const valorTotal = useMemo(() => {
    return itens.reduce(
      (acumulador, item) => acumulador + item.preco * item.quantidade,
      0
    );
  }, [itens]);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        alterarQuantidade,
        removerItem,
        limparCarrinho,
        quantidadeTotal,
        valorTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

CarrinhoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};