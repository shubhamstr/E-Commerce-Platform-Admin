import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import LandingSection from '../components/LandingSection';
// import styles from './page.module.css';

const page = () => {
  return (
    <Container fluid>
      <Row xs="1" style={{ backgroundColor: '#F9F9F9' }}>
        <Col>
          <LandingSection bgClass="shopBg" />
        </Col>
      </Row>
    </Container>
  );
};

export default page;
