// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PaginaCliente from './pages/PaginaCliente';
import { Navbar, Container, Form } from 'react-bootstrap';

export default function App() {
  // 1) busca preferência
  const getInitialTheme = (): 'light' | 'dark' => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // 2) aplica o theme no <html>
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
          <Route path="/" element={<Home />} />
          <Route path="clientes/:id" element={<PaginaCliente />} />
        </Routes>
      </Container>
    </>
  );
}
