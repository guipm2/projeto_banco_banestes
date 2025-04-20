// src/pages/LandingPage.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const options = [
    { title: 'Clientes', to: '/clientes' },
    { title: 'Agências', to: '/agencias' },
    // futuras opções: Exportar CSV, Dashboard, CRUD…
  ];

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">🏦 Meu Banco</h1>
      <Row xs={1} sm={2} md={2} lg={3} className="landing-row">
        {options.map((opt) => (
          <Col key={opt.to} className="landing-col">
            <Card className="landing-card h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-center">{opt.title}</Card.Title>
                <div className="mt-auto text-center">
                  <Link to={opt.to} className="btn btn-primary">
                    Buscar {opt.title}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LandingPage;
