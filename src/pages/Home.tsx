import React from 'react';
import { useClientes } from '../hooks/useClientes';
import { Link } from 'react-router-dom';
import { Table, Card, Row, Col, Form, Pagination as BSPagination } from 'react-bootstrap';


export const Home: React.FC = () => {
  const { currentClientes, totalPages, page, setPage, search, setSearch } = useClientes();

  // Gera os itens de paginação do React‑Bootstrap
  const pagItems = [];
  for (let num = 1; num <= totalPages; num++) {
    pagItems.push(
      <BSPagination.Item
        key={num}
        active={num === page}
        onClick={() => setPage(num)}
      >
        {num}
      </BSPagination.Item>
    );
  }

  
  return (
    <>
      <Row className="align-items-center mb-3">
        <Col md={6} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Pesquisar por nome ou CPF/CNPJ"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </Col>
        <Col md={6} className="text-md-end">
          <BSPagination>{pagItems}</BSPagination>
        </Col>
      </Row>

      {/* Desktop: tabela */}
      <div className="d-none d-sm-block mb-4">
        <Card className="shadow-sm rounded-3">
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Nome</th>
                  <th>CPF/CNPJ</th>
                  <th>Renda Anual</th>
                </tr>
              </thead>
              <tbody>
                {currentClientes.map(c => (
                  <tr key={c.id}>
                    <td>
                      <Link to={`/clientes/${c.id}`}>{c.nome}</Link>
                    </td>
                    <td>{c.cpfCnpj}</td>
                    <td>
                      {c.rendaAnual.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>

      {/* Mobile: cards */}
      <div className="d-block d-sm-none">
        <Row xs={1} className="g-3">
          {currentClientes.map(c => (
            <Col key={c.id}>
              <Card className="shadow-sm rounded-3">
                <Card.Body>
                  <Card.Title>{c.nome}</Card.Title>
                  <Card.Text className="mb-1">{c.cpfCnpj}</Card.Text>
                  <Card.Text className="text-muted">
                    {c.rendaAnual.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
                  </Card.Text>
                  <Link to={`/clientes/${c.id}`}>Ver Detalhes</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
