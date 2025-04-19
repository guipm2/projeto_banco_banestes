import React from "react";

interface FilterBarProps {
  search: string;
  onSearch: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearch,
}) => (
  <input
    id="filter-input"
    type="text"
    role="searchbox"
    aria-label="Buscar clientes por nome ou CPF/CNPJ"
    placeholder="Nome ou CPF/CNPJ"
    value={search}
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);
