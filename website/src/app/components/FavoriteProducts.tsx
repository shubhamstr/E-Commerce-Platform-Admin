/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ProductCard from './ProductCard';
import styles from './favorite.module.css';

const FavoriteProducts = () => {
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
      <Row xs="1" className="mb-3">
        <Col>
          <h3>Wishlist</h3>
        </Col>
      </Row>
      <div className="d-flex flex-wrap gap-5 justify-content-around">
        {productList.map((product: any, index: any) => {
          return <ProductCard key={index} index={index} product={product} screen="home" />;
        })}
      </div>
      {productList.length === 0 && (
        <div className={`d-flex flex-wrap gap-5 justify-content-around ${styles.favoriteSection}`}>
          <p>You don&apos;t have any products in the wishlist. Go to shop to add favorite products.</p>
        </div>
      )}
    </Container>
  );
};

export default FavoriteProducts;
