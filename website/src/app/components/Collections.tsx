'use client';
import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
// import Image from 'next/image';
import styles from './collection.module.css';

const Collections = () => {
  return (
    <Container fluid="sm">
      <Row xs="1" className="py-5">
        <Col>
          <h4 className="text-black text-left text-uppercase fw-medium border-start border-primary border-4 px-3">
            Discover the Collections
          </h4>
        </Col>
      </Row>
      <Row xs="1" sm="2" className="pb-5">
        <Col>
          <div className={styles.collectionLeft}>
            {/* <Image src="/model_3.png" alt="model" fill={true} style={{ objectFit: 'cover' }} /> */}
            <Button
              onClick={() => {
                // setIsAuthenticated(true);
              }}
              className={`position-absolute top-50 start-50 ${styles.collectionBtn}`}
            >
              Women <small className={styles.smallText}>25 items</small>
            </Button>
          </div>
        </Col>
        <Col>
          <div className={styles.collectionRight}>
            {/* <Image src="/model_3.png" alt="model" fill={true} style={{ objectFit: 'cover' }} /> */}
            <Button
              onClick={() => {
                // setIsAuthenticated(true);
              }}
              className={`position-absolute top-50 start-50 ${styles.collectionBtn}`}
            >
              Men <small className={styles.smallText}>25 items</small>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Collections;
