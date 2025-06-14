/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, Input, Row, Table } from 'reactstrap';
import styles from './cart.module.css';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoriteProducts = () => {
  const [cartData, setCartData] = useState<any>([]);
  useEffect(() => {
    setCartData([
      {
        image: '/cloth_1.jpg',
        product: 'Top Up T-Shirt',
        price: 49,
        quantity: 1,
        total: 49
      },
      {
        image: '/cloth_2.jpg',
        product: 'Polo Shirt',
        price: 49,
        quantity: 1,
        total: 49
      }
    ]);
  }, []);

  return (
    <Container fluid="sm">
      <Row xs="1" className="mb-3">
        <Col>
          <Table bordered className={styles.cartTable}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((obj: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>
                      <Image
                        alt="Sample"
                        src={obj.image}
                        width={200}
                        height={150}
                        style={{ objectFit: 'contain', backgroundColor: '#F9F9F9' }}
                      />
                    </td>
                    <td>{obj.product}</td>
                    <td>${obj.price}</td>
                    <td>
                      <ButtonGroup>
                        <Button color="danger">-</Button>
                        <Input type="text" value={obj.quantity} className={styles.cartInput} />
                        <Button color="danger">+</Button>
                      </ButtonGroup>
                    </td>
                    <td>${obj.total}</td>
                    <td>
                      <Button color="danger">
                        <DeleteIcon color="error" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row xs="1" className="mb-3">
        <Col>
          {cartData.length === 0 && (
            <div className={`d-flex flex-wrap gap-5 justify-content-around ${styles.favoriteSection}`}>
              <p>You don&apos;t have any products in the cart.</p>
            </div>
          )}
        </Col>
      </Row>
      <Row xs="1" className="mb-3">
        <Col className="d-flex gap-3">
          <Button color="danger" className="text-uppercase">
            Update Cart
          </Button>
          <Button color="danger" outline className="text-uppercase">
            Continue Shopping
          </Button>
        </Col>
      </Row>
      <Row xs="1" sm="2" className="mb-3">
        <Col className="d-flex flex-column" xs="12" sm="8" md="9">
          <h4 className='py-3'>Coupon</h4>
          <p>Enter your coupon code if you have one.</p>
          <div className="d-flex gap-3">
            <Input type="text" placeholder="Coupon Code" className={styles.couponInput} />
            <Button color="danger">Apple Coupon</Button>
          </div>
        </Col>
        <Col className="" xs="12" sm="4" md="3">
          <h4 className="text-uppercase border-bottom text-end py-3">Cart Totals</h4>
          <div className="d-flex justify-content-between py-3">
            <p>Subtotal</p>
            <p>$230</p>
          </div>
          <div className="d-flex justify-content-between py-3">
            <p>Total</p>
            <p>$230</p>
          </div>
          <Button color="danger" className="text-uppercase w-100">
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FavoriteProducts;
