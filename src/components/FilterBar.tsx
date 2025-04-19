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
    type="text"
    aria-label="Buscar clientes"
    placeholder="Nome ou CPF/CNPJ"
    value={search}
    onChange={(e) => onSearch(e.target.value)}
    className="p-2 border rounded w-full max-w-sm"
  />
);
