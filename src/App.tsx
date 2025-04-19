import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { PaginaCliente } from './pages/PaginaCliente';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <>
      <Navbar bg="primary" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">🏦 Meu Banco</Navbar.Brand>
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
