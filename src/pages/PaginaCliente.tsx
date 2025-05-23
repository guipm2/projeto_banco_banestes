// src/pages/PaginaCliente.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClientes, getContas, getAgencias } from '../services/api';
import { Cliente, Conta, Agencia } from '../types';
import { formatarCPF } from '../utils/FormatarCPF';
import { Card, Table, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';

const PaginaCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getClientes(), getContas(), getAgencias()])
      .then(([cs, conts, ags]) => {
        const cli = cs.find(c => c.id === id) || null;
        setCliente(cli);
        if (cli) {
          setContas(conts.filter(ct => ct.cpfCnpjCliente === cli.cpfCnpj));
          setAgencia(ags.find(a => a.codigo === cli.codigoAgencia) || null);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (!cliente) {
    return (
      <Alert variant="danger" className="m-4">
        Cliente não encontrado.{' '}
        <Link to="/">
          <Button variant="link">← Voltar</Button>
        </Link>
      </Alert>
    );
  }

  return (
    <>
      {/* Detalhes do Cliente */}
      <Card className="mb-4 shadow-sm rounded-3">
        <Card.Header>
          <Row>
            <Col>
              <h4>Detalhes de {cliente.nome}</h4>
            </Col>
            <Col className="text-end">
              <Link to="/">
                <Button variant="secondary" size="sm" className="btn-back">
                  ← Voltar
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>CPF/CNPJ:</strong> {formatarCPF(cliente.cpfCnpj)}</p>
              {cliente.rg && <p><strong>RG:</strong> {cliente.rg}</p>}
              <p>
                <strong>Data de Nasc.:</strong>{' '}
                {cliente.dataNascimento.toLocaleDateString('pt-BR')}
              </p>
            </Col>
            <Col md={6}>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Endereço:</strong> {cliente.endereco}</p>
              <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <p>
                <strong>Renda Anual:</strong>{' '}
                {Number.isNaN(cliente.rendaAnual)
                  ? 'Não informado.'
                  : cliente.rendaAnual.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Patrimônio:</strong>{' '}
                {Number.isNaN(cliente.patrimonio)
                  ? 'Não informado.'
                  : cliente.patrimonio.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Contas Bancárias */}
      <Card className="mb-4 shadow-sm rounded-3">
        <Card.Header><h5>Contas Bancárias</h5></Card.Header>
        <Card.Body className="p-0">
          {contas.length === 0 ? (
            <p className="p-3">Nenhuma conta cadastrada.</p>
          ) : (
            <Table hover responsive className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Número da Conta</th>
                  <th>Tipo</th>
                  <th>Saldo</th>
                  <th>Limite</th>
                  <th>Disponível</th>
                </tr>
              </thead>
              <tbody>
                {contas.map(ct => (
                  <tr key={ct.id}>
                    <td>{ct.id}</td>
                    <td>{ct.tipo}</td>
                    <td>
                      {Number.isNaN(ct.saldo)
                        ? 'Não informado'
                        : ct.saldo.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                    </td>
                    <td>
                      {Number.isNaN(ct.limiteCredito)
                        ? 'Não informado'
                        : ct.limiteCredito.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                    </td>
                    <td>
                      {Number.isNaN(ct.creditoDisponivel)
                        ? 'Não informado'
                        : ct.creditoDisponivel.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Agência */}
      <Card className="shadow-sm rounded-3">
        <Card.Header><h5>Agência</h5></Card.Header>
        <Card.Body>
          {agencia ? (
            <>
              <p><strong>Código:</strong> {agencia.codigo}</p>
              <p><strong>Nome:</strong> {agencia.nome}</p>
              <p><strong>Endereço:</strong> {agencia.endereco}</p>
            </>
          ) : (
            <p>Agência não encontrada.</p>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default PaginaCliente;
