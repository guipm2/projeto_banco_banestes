import { useState, useEffect, useMemo } from "react";
import { Cliente } from "../types";
import { getClientes } from "../services/api";

export function useClientes() {
  const [allClientes, setAllClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // 1) carrega dados
  useEffect(() => {
    getClientes()
      .then(data => {
        console.log("Clientes carregados:", data);
        setAllClientes(data);
      })
      .catch(err => console.error(err));
  }, []);
  

  // 2) filtra por nome ou CPF/CNPJ
  const filtered = useMemo(
    () =>
      allClientes.filter(
        (c) =>
          c.nome.toLowerCase().includes(search.toLowerCase()) ||
          c.cpfCnpj.includes(search)
      ),
    [allClientes, search]
  );

  // 3) divide em páginas
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
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
