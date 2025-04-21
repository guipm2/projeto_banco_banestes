// src/pages/LandingPage.tsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Option {
  title: string;
  to: string;
  icon: string;
}

const options: Option[] = [
  { title: 'CLIENTES', to: '/clientes', icon: 'customer.png' },
  { title: 'AGÊNCIAS', to: '/agencias', icon: 'bank-building.png' },
  // … outras opções
];

const LandingPage: React.FC = () => {
  return (
    <Container className="py-5">
      <h1 className="title-center">DASHBOARD</h1>
      <Row xs={1} sm={2} md={2} lg={3} className="g-4 landing-row">
        {options.map((opt) => (
          <Col key={opt.to} className="landing-col">
            <Card className="landing-card h-100 shadow-sm position-relative">
              <Card.Body className="d-flex flex-column align-items-center">
                {/* ícone como máscara colorizável */}
                <div
                  className="landing-icon mb-3"
                  style={{
                    maskImage: `url(${opt.icon})`,
                    WebkitMaskImage: `url(${opt.icon})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                  }}
                  aria-hidden="true"
                />
                <Card.Title className="text-center">{opt.title}</Card.Title>
                {/* stretched-link para tornar o card todo clicável */}
                <Link to={opt.to} className="stretched-link" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LandingPage;
