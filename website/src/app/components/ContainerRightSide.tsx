'use client';
import React from 'react';
import { Button } from 'reactstrap';

const ContainerRightSide = () => {
  return (
    <>
      <p className="text-black text-uppercase fw-medium"># New Summer Collection 2019</p>
      <h1 className="text-black text-uppercase fw-bolder">Arrivals Sales</h1>
      <Button
        color="primary"
        outline
        onClick={() => {
          // setIsAuthenticated(true);
        }}
      >
        Shop Now
      </Button>
    </>
  );
};

export default ContainerRightSide;
