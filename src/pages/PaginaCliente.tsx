import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getClientes, getContas, getAgencias } from '../services/api';
import { Cliente, Conta, Agencia } from '../types';
import { Card, Table, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';


export const PaginaCliente: React.FC = () => {
  const { id } = useParams<{id:string}>();
  const [cliente, setCliente] = useState<Cliente|null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getClientes(), getContas(), getAgencias()])
      .then(([cs, conts, ags]) => {
        const cli = cs.find(c=>c.id===id) || null;
        setCliente(cli);
        if (cli) {
          setContas(conts.filter(ct=>ct.cpfCnpjCliente===cli.cpfCnpj));
          setAgencia(ags.find(a=>a.codigo===cli.codigoAgencia) || null);
        }
      })
      .finally(()=>setLoading(false));
  }, [id]);

  if (loading) return <Spinner animation="border" />;

  if (!cliente) return <Alert variant="danger">Cliente não encontrado. <Link to="/"><Button variant="link">Voltar</Button></Link></Alert>;

  return (
    <>
      <Card className="mb-4 shadow-sm rounded-3">
        <Card.Header>
          <Row>
            <Col><h4>Detalhes de {cliente.nome}</h4></Col>
            <Col className="text-end">
              <Link to="/"><Button variant="secondary" size="sm">← Voltar</Button></Link>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</p>
              {cliente.rg && <p><strong>RG:</strong> {cliente.rg}</p>}
              <p><strong>Data de Nasc.:</strong> {cliente.dataNascimento.toLocaleDateString()}</p>
            </Col>
            <Col md={6}>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Endereço:</strong> {cliente.endereco}</p>
              <p><strong>Estado Civil:</strong> {cliente.estadoCivil}</p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <p><strong>Renda Anual:</strong> {cliente.rendaAnual.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
            </Col>
            <Col md={6}>
              <p><strong>Patrimônio:</strong> {cliente.patrimonio.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm rounded-3">
        <Card.Header><h5>Contas Bancárias</h5></Card.Header>
        <Card.Body className="p-0">
          {contas.length===0 ? (
            <p className="p-3">Nenhuma conta cadastrada.</p>
          ) : (
            <Table hover responsive className="mb-0">
              <thead><tr><th>Tipo</th><th>Saldo</th><th>Limite</th><th>Disponível</th></tr></thead>
              <tbody>
                {contas.map(ct=>(
                  <tr key={ct.id}>
                    <td>{ct.tipo}</td>
                    <td>{ct.saldo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                    <td>{ct.limiteCredito.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                    <td>{ct.creditoDisponivel.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

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
