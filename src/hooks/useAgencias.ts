// src/hooks/useAgencias.ts
import { useState, useEffect, useMemo } from "react";
import { Agencia } from "../types";
import { getAgencias } from "../services/api";

export type AgenciaSortKey = "codigo" | "nome";

export function useAgencias() {
  const [all, setAll] = useState<Agencia[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<AgenciaSortKey>("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  // 1) Carrega todas as agências
  useEffect(() => {
    getAgencias()
      .then(setAll)
      .catch((err) => console.error("Erro ao buscar agências:", err));
  }, []);

  // 2) Filtra por código, nome ou endereço
  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return all;
    return all.filter((a) => {
      const codeStr = a.codigo.toString();
      return (
        codeStr.includes(term) ||
        a.nome.toLowerCase().includes(term) ||
        a.endereco.toLowerCase().includes(term)
      );
    });
  }, [all, search]);

  // 3) Ordena o resultado filtrado
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  return {
    agencias: sorted,
    search,
    setSearch,
    sortKey,
    sortDir,
    setSortKey,
    setSortDir,
  };
}
