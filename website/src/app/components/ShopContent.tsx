'use client';
import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, NavLink, Row } from 'reactstrap';
import styles from './shop.module.css';

const ShopContent = () => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);

  return (
    <Container fluid="sm">
      <Row xs="1" sm="2" className="py-3">
        <Col xs="12" sm="12" md="8">
          <Row xs="1" sm="2" className="py-3">
            <Col xs="12" sm="12" md="12">
              <div className="d-flex justify-content-between">
                <h4>Shop All</h4>
                <div className="d-flex gap-2">
                  <Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
                    <DropdownToggle caret>Latest</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Latest</DropdownItem>
                      <DropdownItem>Popular</DropdownItem>
                      <DropdownItem>Most Purchased</DropdownItem>
                      <DropdownItem>Most Rated</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown isOpen={dropdownOpen2} toggle={toggle2}>
                    <DropdownToggle caret>Filter By</DropdownToggle>
                    <DropdownMenu>
                      {/* <DropdownItem header>Header</DropdownItem> */}
                      <DropdownItem>Relevance</DropdownItem>
                      <DropdownItem>Name, A to Z</DropdownItem>
                      <DropdownItem>Name, Z to A</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Price, low to high</DropdownItem>
                      <DropdownItem>Price, high to low</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
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
