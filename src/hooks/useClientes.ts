// src/hooks/useClientes.ts
import { useState, useEffect, useMemo } from "react";
import { Cliente } from "../types";
import { getClientes } from "../services/api";

export type ClienteSortKey = "nome" | "rendaAnual";
export type FilterMode = "todos" | "nome" | "cpfCnpj";

/**
 * Hook para gerenciar clientes com:
 * - pesquisa
 * - modo de filtro (todos / nome / CPF/CNPJ)
 * - paginação
 * - ordenação por nome ou rendaAnual (com NaN ao fim)
 */
export function useClientes() {
  const [allClientes, setAllClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("todos");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // ordenação
  const [sortKey, setSortKey] = useState<ClienteSortKey>("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    getClientes()
      .then((data) => setAllClientes(data))
      .catch((err) => console.error("Erro ao buscar clientes:", err));
  }, []);

  // filtra de acordo com mode + termo de pesquisa
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return allClientes.filter((c) => {
      if (filterMode === "nome") {
        return c.nome.toLowerCase().includes(term);
      }
      if (filterMode === "cpfCnpj") {
        return c.cpfCnpj.includes(search);
      }
      // modo "todos"
      return (
        c.nome.toLowerCase().includes(term) ||
        c.cpfCnpj.includes(search)
      );
    });
  }, [allClientes, search, filterMode]);

  // ordena, colocando NaN de rendaAnual sempre ao fim
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortKey === "rendaAnual") {
        const aNaN = Number.isNaN(a.rendaAnual);
        const bNaN = Number.isNaN(b.rendaAnual);
        if (aNaN && !bNaN) return 1;
        if (!aNaN && bNaN) return -1;
      }
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  // paginação
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const currentClientes = useMemo(
    () =>
      sorted.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [sorted, page]
  );

  return {
    currentClientes,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    filterMode,
    setFilterMode,
    sortKey,
    sortDir,
    setSortKey,
    setSortDir,
  };
}
