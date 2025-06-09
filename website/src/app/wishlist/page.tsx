import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from './page.module.css';
import BreadcrumbCompo from '../components/BreadcrumbCompo';
import FavoriteProducts from '../components/FavoriteProducts';

const page = () => {
  return (
    <Container fluid>
      <Row xs="1" className={styles.headerSection}></Row>
      <Row xs="1">
        <Col>
          <BreadcrumbCompo activeScreenName="Wishlist" previousScreenLink="" previousScreenName="" />
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <FavoriteProducts />
        </Col>
      </Row>
    </Container>
  );
};

export default page;
