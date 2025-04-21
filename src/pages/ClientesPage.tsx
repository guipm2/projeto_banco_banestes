// src/pages/ClientesPage.tsx
import React, { useEffect, useState } from 'react';
import { useClientes, ClienteSortKey } from '../hooks/useClientes';
import { useNavigate, Link } from 'react-router-dom';
import {
  Table,
  Card,
  Row,
  Col,
  Form,
  Pagination as BSPagination,
} from 'react-bootstrap';
import { formatarCPF } from '../utils/FormatarCPF';
import { getContas } from '../services/api';

const ClientesPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentClientes,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    sortKey,
    sortDir,
    setSortKey,
    setSortDir,
  } = useClientes();

  // mapa de cpfCnpjCliente → primeira conta.id
  const [contaMapa, setContaMapa] = useState<Record<string, string>>({});
  useEffect(() => {
    getContas().then(contas => {
      const mapa: Record<string, string> = {};
      contas.forEach(ct => {
        if (!mapa[ct.cpfCnpjCliente]) {
          mapa[ct.cpfCnpjCliente] = ct.id;
        }
      });
      setContaMapa(mapa);
    });
  }, []);

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

  const handleSort = (key: ClienteSortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const renderArrow = (key: ClienteSortKey) =>
    sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : null;

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col md={6} className="mb-2">
          <Form.Control
            type="text"
            placeholder="Pesquisar por nome ou CPF/CNPJ"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(1);
            }}
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
            <Table hover responsive className="mb-0 table-hover">
              <thead className="table-light">
                <tr>
                  <th
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSort('nome')}
                  >
                    Nome{renderArrow('nome')}
                  </th>
                  <th>Conta | Agência</th>
                  <th>CPF/CNPJ</th>
                </tr>
              </thead>
              <tbody>
                {currentClientes.map(c => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/clientes/${c.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{c.nome}</td>
                    <td>
                      Conta: {contaMapa[c.cpfCnpj] ?? '-'} | Agência:{' '}
                      {c.codigoAgencia}
                    </td>
                    <td>{formatarCPF(c.cpfCnpj)}</td>
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
              <Link
                to={`/clientes/${c.id}`}
                className="text-decoration-none"
              >
                <Card className="shadow-sm rounded-3">
                  <Card.Body>
                    <Card.Title>
                      {c.nome}
                      {renderArrow('nome')}
                    </Card.Title>
                    <Card.Text className="mb-1">
                      Conta: {contaMapa[c.cpfCnpj] ?? '-'} | Agência:{' '}
                      {c.codigoAgencia}
                    </Card.Text>
                    <Card.Text className="mb-1">
                      {formatarCPF(c.cpfCnpj)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ClientesPage;
