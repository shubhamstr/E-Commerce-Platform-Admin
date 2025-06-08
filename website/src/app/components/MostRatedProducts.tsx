/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from 'reactstrap';
import Image from 'next/image';
// import styles from './landing.module.css';

const MostRatedProducts = () => {
  const [productList, setProductList] = useState<any>([]);
  useEffect(() => {
    setProductList([
      {
        image: '/model_1.png',
        title: 'Smooth Cloth',
        price: 28
      },
      {
        image: '/model_5.png',
        title: 'Denim Jacket',
        price: 28
      },
      {
        image: '/model_7.png',
        title: 'Yellow Jacket',
        price: 58
      },
      {
        image: '/prod_1.png',
        title: 'Leather Green Bag',
        price: 28
      },
      {
        image: '/prod_2.png',
        title: 'Gray Shoe',
        price: 20
      },
      {
        image: '/prod_3.png',
        title: 'Blue Shoe High Heels',
        price: 28
      }
    ]);
  }, []);

  return (
    <Container fluid="sm">
      <Row xs="1" className="py-5">
        <Col>
          <h4 className="text-black text-left text-uppercase fw-medium border-start border-primary border-4 px-3">Most Rated Products</h4>
        </Col>
      </Row>
      <div className="d-flex flex-wrap gap-5">
        {productList.map((product: any, index: any) => {
          return (
            <Card
              key={index}
              style={{
                width: '18rem'
              }}
            >
              <Image
                alt="Sample"
                src={product.image}
                width={287}
                height={150}
                style={{ objectFit: 'contain', backgroundColor: '#F9F9F9' }}
              />
              <CardBody>
                <CardTitle tag="h5">{product.title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  ${product.price}
                </CardSubtitle>
                {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card‘s content.</CardText> */}
                <div className="d-flex gap-2">
                  <Button color="primary" size="sm" outline>
                    Add to Cart
                  </Button>
                  <Button color="danger" size="sm" outline>
                    Buy Now
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default MostRatedProducts;
