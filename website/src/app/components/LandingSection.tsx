'use client';
import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import styles from './landing.module.css';

const LandingSection = () => {
  return (
    <Container fluid="sm">
      <Row xs="1" sm="2">
        <Col>
          <div className={styles.landingImg}>
            {/* <Image src="/model_3.png" alt="model" fill={true} style={{ objectFit: 'cover' }} /> */}
          </div>
        </Col>
        <Col className={`d-flex flex-column justify-content-center align-items-center`}>
          <p className="text-black text-uppercase fw-medium"># New Summer Collection 2019</p>
          <h1 className="text-black text-uppercase fw-bolder">Arrivals Sales</h1>
          <Button
            color="primary"
            outline
            onClick={() => {
              // setIsAuthenticated(true);
            }}
          >
            Shop Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingSection;
