import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { PaginaCliente } from './pages/PaginaCliente'; // Ensure this matches the export in PaginaCliente.tsx

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center">
          <h1 className="text-2xl font-bold">🏦 Meu Banco</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="clientes/:id" element={<PaginaCliente />} />
        </Routes>
      </main>
    </div>
  );
}
