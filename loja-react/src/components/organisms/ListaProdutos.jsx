import { useEffect, useMemo, useState } from "react";

import { listarProdutos } from "../../services/api";
import { filtrarProdutos } from "../../utils/busca";

import { CampoBusca } from "../atoms/CampoBusca";
import { ProdutoCard } from "../molecules/ProdutoCard";

export function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [termo, setTermo] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      try {
        setCarregando(true);
        setErro("");

        const dados = await listarProdutos();

        if (ativo) {
          setProdutos(dados);
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar os produtos. Tente novamente.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, []);

  const produtosFiltrados = useMemo(() => {
    return filtrarProdutos(produtos, termo);
  }, [produtos, termo]);

  return (
    <section className="lista-produtos">
      <div className="lista-produtos-cabecalho">
        <h2>Conheça nossos produtos</h2>
        <p>Encontre os produtos que você procura na Brivio.</p>
      </div>

      <CampoBusca
        valor={termo}
        onChange={setTermo}
        placeholder="Buscar produto pelo nome..."
      />

      {carregando && <p className="carregando">Carregando produtos...</p>}

      {!carregando && erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && produtosFiltrados.length === 0 && (
        <p className="vazio">
          {termo
            ? `Nenhum produto encontrado para "${termo}".`
            : "Nenhum produto disponível no momento."}
        </p>
      )}

      {!carregando && !erro && produtosFiltrados.length > 0 && (
        <div className="grade-produtos">
          {produtosFiltrados.map((produto) => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      )}
    </section>
  );
}
