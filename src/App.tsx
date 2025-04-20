// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ClientesPage from './pages/ClientesPage';
import PaginaCliente from './pages/PaginaCliente';
import AgenciasPage from './pages/AgenciasPage';
import { Navbar, Container, Form } from 'react-bootstrap';

export default function App() {
  // Tema claro/escuro
  const getInitialTheme = (): 'light' | 'dark' => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <>
      <Navbar
        bg={theme === 'light' ? 'light' : 'dark'}
        variant={theme === 'light' ? 'light' : 'dark'}
        className="mb-4"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">🏦 Meu Banco</Navbar.Brand>
          <Form.Check
            type="switch"
            id="theme-switch"
            label={theme === 'light' ? '☀️' : '🌙'}
            checked={theme === 'dark'}
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/:id" element={<PaginaCliente />} />
          <Route path="/agencias" element={<AgenciasPage />} />
        </Routes>
      </Container>
    </>
  );
}
