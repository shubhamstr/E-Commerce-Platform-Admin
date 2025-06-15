import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import styles from './page.module.css';
import BreadcrumbCompo from '../components/BreadcrumbCompo';
import AuthForm from '../components/AuthForm';

const page = () => {
  return (
    <Container fluid>
      <Row xs="1">
        <Col>
          <BreadcrumbCompo activeScreenName="Register" previousScreenLink="" previousScreenName="" />
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <AuthForm type="register" />
        </Col>
      </Row>
    </Container>
  );
};

export default page;
