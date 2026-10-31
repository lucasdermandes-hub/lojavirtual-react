
import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  // Adiciona um produto ao carrinho
  function adicionarItem(produto) {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find(
        (item) => item.id === produto.id
      );

      if (itemExistente) {
        // Impede que a quantidade ultrapasse o estoque
        if (itemExistente.quantidade >= produto.estoque) {
          return itensAtuais;
        }

        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      // Não adiciona se não houver estoque
      if (produto.estoque < 1) {
        return itensAtuais;
      }

      // Adiciona o produto com quantidade inicial igual a 1
      return [...itensAtuais, { ...produto, quantidade: 1 }];
    });
  }

  // Altera a quantidade respeitando o estoque e o mínimo de 1
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
    setItens((itensAtuais) =>
      itensAtuais.filter((item) => item.id !== id)
    );
  }

  // Limpa o carrinho após uma compra aprovada
  function limparCarrinho() {
    setItens([]);
  }

  // Calcula a quantidade total de unidades
  const quantidadeTotal = useMemo(() => {
    return itens.reduce(
      (acumulador, item) => acumulador + item.quantidade,
      0
    );
  }, [itens]);

  // Calcula o valor total da compra
  const valorTotal = useMemo(() => {
    return itens.reduce(
      (acumulador, item) =>
        acumulador + item.preco * item.quantidade,
      0
    );
  }, [itens]);

  const valor = {
    itens,
    adicionarItem,
    alterarQuantidade,
    removerItem,
    limparCarrinho,
    quantidadeTotal,
    valorTotal,
  };

  return (
    <CarrinhoContext.Provider value={valor}>
      {children}
    </CarrinhoContext.Provider>
  );
}

CarrinhoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
