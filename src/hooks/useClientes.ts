import { useState, useEffect, useMemo } from "react";
import { Cliente } from "../types";
import { getClientes } from "../services/api";



/**
 * Hook para gerenciar a lista de clientes, pesquisa e paginação.
 * @returns objeto com lista atual, total de páginas, página atual e funções de controle
 */
export function useClientes() {
  const [allClientes, setAllClientes] = useState<Cliente[]>([]);   // estado para armazenar a lista de clientes
  const [search, setSearch] = useState(""); // termo de pesquisa (nome ou CPF/CNPJ)
  const [page, setPage] = useState(1); // número da página atual
  const itemsPerPage = 10;

  // carrega os dados de clientes inicialmente
  useEffect(() => {
    getClientes()
      .then(data => {
        console.log("Clientes carregados:", data);
        setAllClientes(data);
      })
      .catch(err => console.error(err));
  }, []);
  

  // compara o nome em minúsculas para evitar problemas de case-sensitive
  // e verifica se o CPF/CNPJ contém o termo de pesquisa
  const filtered = useMemo(
    () =>
      allClientes.filter(
        (c) =>
          c.nome.toLowerCase().includes(search.toLowerCase()) ||
          c.cpfCnpj.includes(search)
      ),
    [allClientes, search]
  );

  // calcula quantas páginas são necessárias com base no
  // número total de clientes filtrados e no número de itens por página
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  
  
  /*
   * Gera o array de clientes para exibir na página atual,
   * cortando o array filtrado de acordo com page e itemsPerPage.
   */
  const currentClientes = useMemo(
    () =>
      filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filtered, page]
  );

  return {
    currentClientes,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
  };
}
