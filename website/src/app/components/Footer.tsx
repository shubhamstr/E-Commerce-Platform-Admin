'use client';
import React from 'react';
import { Col, Container, NavLink, Row } from 'reactstrap';
import styles from './footer.module.css';

function Footer() {
  return (
    <Container fluid="sm">
      <Row xs="1" sm="2" md="3" className="py-5">
        <Col>
          <h2 className="text-black text-center fs-2 fw-bold text-uppercase">Guest Market</h2>
        </Col>
        <Col>
          <h6 className="text-black text-left fw-semibold text-uppercase px-2">Quick Links</h6>
          <ul className={styles.listStyle}>
            <li className="p-2">
              <NavLink href="/seller-form/">Become a Seller</NavLink>
            </li>
            <li className="p-2">
              <NavLink href="/cart/">Shopping Cart</NavLink>
            </li>
            <li className="p-2">
              <NavLink href="/shop/">Shop</NavLink>
            </li>
          </ul>
        </Col>
        <Col>
          <h6 className="text-black text-left fw-semibold text-uppercase px-2">Contact Info</h6>
          <p className="px-2">203 Fake St. Mountain View, San Francisco, California, USA</p>
          <p className="px-2">+2 392 3929 210</p>
          <p className="px-2">emailaddress@domain.com</p>
        </Col>
      </Row>
      <div className={styles.footerDiv}>Copyright ©2025 All rights reserved | This website is made with by shubhamstr</div>
    </Container>
  );
}

export default Footer;
