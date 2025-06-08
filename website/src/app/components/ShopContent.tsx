'use client';
import React from 'react';
import { Card, CardBody, CardTitle, Col, Container, NavLink, Row } from 'reactstrap';
import styles from './shop.module.css';

const ShopContent = () => {
  return (
    <Container fluid="sm">
      <Row xs="1" sm="2" className="py-3">
        <Col xs="12" sm="12" md="8">
          a
        </Col>
        <Col xs="12" sm="12" md="4">
          <Card
            style={{
              width: '18rem'
            }}
          >
            <CardBody>
              <CardTitle tag="h6" className="fs-6 fw-medium text-uppercase mb-3">
                Categories
              </CardTitle>
              <ul className={styles.listStyle}>
                <li className="py-1">
                  <NavLink className="d-flex justify-content-between text-primary" href={`/shop/Women`}>
                    <p className="m-0">Women</p> <span>(2000)</span>
                  </NavLink>
                </li>
                <li className="py-1">
                  <NavLink className="d-flex justify-content-between text-primary" href={`/shop/Men`}>
                    <p className="m-0">Men</p> <span>(2000)</span>
                  </NavLink>
                </li>
                <li className="py-1">
                  <NavLink className="d-flex justify-content-between text-primary" href={`/shop/Children`}>
                    <p className="m-0">Children</p> <span>(2000)</span>
                  </NavLink>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopContent;
