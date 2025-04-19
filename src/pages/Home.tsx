import React from "react";
import { useClientes } from "../hooks/useClientes";
import { FilterBar } from "../components/FilterBar";
import { Pagination } from "../components/Pagination";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const {
    currentClientes,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
  } = useClientes();

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Filtro + Paginação */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
        <FilterBar
          search={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        <Pagination current={page} total={totalPages} onChange={setPage} />
      </div>

      {/* DESKTOP: Tabela dentro de box */}
      <div className="hidden sm:block overflow-x-auto">
        <div
          className="
            p-4
            bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300
            shadow-lg
            rounded-[10px]
          "
        >
          <table className="min-w-full divide-y divide-gray-300 bg-white rounded-[6px]">
            <caption className="sr-only">Lista de clientes</caption>
            <thead className="bg-gray-50">
              <tr>
                {["Nome", "CPF/CNPJ", "Renda Anual"].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentClientes.map((c) => (
                <tr key={c.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <Link
                      to={`/clientes/${c.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {c.nome}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{c.cpfCnpj}</td>
                  <td className="px-6 py-4 font-medium">
                    {c.rendaAnual.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE: Cards dentro de box */}
      <div className="sm:hidden grid gap-4">
        {currentClientes.map((c) => (
          <Link
            key={c.id}
            to={`/clientes/${c.id}`}
            className="
              block
              p-4
              bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300
              shadow-lg
              rounded-[10px]
              text-gray-800
            "
          >
            <h3 className="text-lg font-semibold mb-1">{c.nome}</h3>
            <p className="text-sm mb-1">{c.cpfCnpj}</p>
            <p className="text-sm font-medium">
              {c.rendaAnual.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
