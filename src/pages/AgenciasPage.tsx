// src/pages/AgenciasPage.tsx
import React from "react";
import {
  Container,
  Table,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Form,
} from "react-bootstrap";
import { useAgencias, AgenciaSortKey } from "../hooks/useAgencias";

const AgenciasPage: React.FC = () => {
  const {
    agencias,
    search,
    setSearch,
    sortKey,
    sortDir,
    setSortKey,
    setSortDir,
  } = useAgencias();

  const handleSort = (key: AgenciaSortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const renderArrow = (key: AgenciaSortKey) =>
    sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : null;

  return (
    <Container className="py-4">
      <h2 className="mb-3">Agências</h2>

      {/* Barra de busca */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Pesquisar por código, nome ou endereço"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>

      {/* Botões de ordenação */}
      <ButtonGroup className="mb-4">
        <Button
          variant={sortKey === "codigo" ? "primary" : "outline-primary"}
          onClick={() => handleSort("codigo")}
        >
          Código{renderArrow("codigo")}
        </Button>
        <Button
          variant={sortKey === "nome" ? "primary" : "outline-primary"}
          onClick={() => handleSort("nome")}
        >
          Nome{renderArrow("nome")}
        </Button>
      </ButtonGroup>

      {/* Desktop: tabela */}
      <div className="d-none d-sm-block">
        <Card className="shadow-sm rounded-3">
          <Card.Body className="p-0">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Endereço</th>
                </tr>
              </thead>
              <tbody>
                {agencias.map((ag) => (
                  <tr key={ag.id}>
                    <td>{ag.codigo}</td>
                    <td>{ag.nome}</td>
                    <td>{ag.endereco}</td>
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
          {agencias.map((ag) => (
            <Col key={ag.id}>
              <Card className="shadow-sm rounded-3">
                <Card.Body>
                  <Card.Title>Cód. {ag.codigo}</Card.Title>
                  <Card.Subtitle className="mb-2">{ag.nome}</Card.Subtitle>
                  <Card.Text>{ag.endereco}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default AgenciasPage;
