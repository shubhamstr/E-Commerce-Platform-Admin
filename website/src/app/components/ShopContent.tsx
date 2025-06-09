/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row
} from 'reactstrap';
import ProductCard from './ProductCard';
import Slider from '@mui/material/Slider';
import styles from './shop.module.css';

const ShopContent = () => {
  const [productList, setProductList] = useState<any>([]);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [value, setValue] = React.useState<number[]>([0, 500]);

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
  };

  const toggle1 = () => setDropdownOpen1((prevState) => !prevState);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);

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
            <Col xs="12" sm="12" md="12">
              <div className="d-flex flex-wrap gap-5 justify-content-around mt-3">
                {productList.map((product: any, index: any) => {
                  return <ProductCard key={index} index={index} product={product} screen="shop" />;
                })}
              </div>
            </Col>
            <Col xs="12" sm="12" md="12">
              <div className="d-flex justify-content-center mt-5">
                <Pagination size="">
                  <PaginationItem>
                    <PaginationLink first href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" previous />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" next />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" last />
                  </PaginationItem>
                </Pagination>
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
                <li className={`py-1 d-flex justify-content-between text-primary ${styles.pointer}`}>
                  <p className="m-0">Women</p> <span>(2000)</span>
                </li>
                <li className={`py-1 d-flex justify-content-between text-primary ${styles.pointer}`}>
                  <p className="m-0">Men</p> <span>(2000)</span>
                </li>
                <li className={`py-1 d-flex justify-content-between text-primary ${styles.pointer}`}>
                  <p className="m-0">Children</p> <span>(2000)</span>
                </li>
              </ul>
            </CardBody>
          </Card>
          <Card
            style={{
              width: '18rem'
            }}
            className="mt-3"
          >
            <CardBody>
              <CardTitle tag="h6" className="fs-6 fw-medium text-uppercase mb-3">
                Filter by Price
              </CardTitle>
              <div className="">
                <Slider value={value} step={10} min={0} max={500} onChange={handleChange} valueLabelDisplay="auto" />
                <p>
                  ${value[0]} - ${value[1]}
                </p>
              </div>
              <CardTitle tag="h6" className="fs-6 fw-medium text-uppercase mb-3 mt-5">
                Size
              </CardTitle>
              <ul className={styles.listStyle}>
                <li>
                  <Input type="checkbox" id="smallCheck" className="me-2" />
                  <Label className={`${styles.pointer} user-select-none`} check for="smallCheck">
                    Small (2400)
                  </Label>
                </li>
                <li>
                  <Input type="checkbox" id="mediumCheck" className="me-2" />
                  <Label className={`${styles.pointer} user-select-none`} check for="mediumCheck">
                    Medium (1200)
                  </Label>
                </li>
                <li>
                  <Input type="checkbox" id="largeCheck" className="me-2" />
                  <Label className={`${styles.pointer} user-select-none`} check for="largeCheck">
                    Large (1300)
                  </Label>
                </li>
              </ul>
              <CardTitle tag="h6" className="fs-6 fw-medium text-uppercase mb-3 mt-5">
                Color
              </CardTitle>
              <ul className={styles.listStyle}>
                <li className={`py-1 d-flex justify-content-between text-primary ${styles.pointer}`}>
                  <p className="m-0 d-flex align-items-center">
                    <span className={`bg-danger color d-inline-block rounded-circle me-2 ${styles.colorTag}`}></span>
                    <span>Red (2,429)</span>
                  </p>
                </li>
                <li className={`py-1 d-flex justify-content-between text-primary ${styles.pointer}`}>
                  <p className="m-0 d-flex align-items-center">
                    <span className={`bg-success color d-inline-block rounded-circle me-2 ${styles.colorTag}`}></span>
                    <span>Green (2,429)</span>
                  </p>
                </li>
                <li className={`py-1 d-flex justify-content-between text-primary ${styles.pointer}`}>
                  <p className="m-0 d-flex align-items-center">
                    <span className={`bg-info color d-inline-block rounded-circle me-2 ${styles.colorTag}`}></span>
                    <span>Blue (2,429)</span>
                  </p>
                </li>
                <li className={`py-1 d-flex justify-content-between text-primary ${styles.pointer}`}>
                  <p className="m-0 d-flex align-items-center">
                    <span className={`bg-primary color d-inline-block rounded-circle me-2 ${styles.colorTag}`}></span>
                    <span>Purple (2,429)</span>
                  </p>
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
