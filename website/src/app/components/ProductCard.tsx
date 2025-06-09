/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import Image from 'next/image';

const ProductCard = ({ index, product, screen }: any) => {
  return (
    <Card
      key={index}
      style={{
        width: screen === 'shop' ? '24rem' : '18rem'
      }}
    >
      <Image
        alt="Sample"
        src={product.image}
        width={screen === 'shop' ? 382 : 287}
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
};

export default ProductCard;
