import React from "react";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  onChange,
}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="flex gap-2">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          disabled={p === current}
          className={`px-3 py-1 rounded ${
            p === current ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {p}
        </button>
      ))}
    </nav>
  );
};
