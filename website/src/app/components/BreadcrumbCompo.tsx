/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Breadcrumb, BreadcrumbItem, Col, Container, NavLink, Row } from 'reactstrap';

const BreadcrumbCompo = ({ activeScreenName, previousScreenLink, previousScreenName }: any) => {
  return (
    <Container fluid="sm">
      <Row xs="1" className="py-3">
        <Col>
          {previousScreenLink && previousScreenName ? (
            <Breadcrumb>
              <BreadcrumbItem>
                <NavLink href="/" className="text-primary">
                  Home
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <NavLink href={previousScreenLink} className="d-inline text-primary">
                  {previousScreenName}
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem active>{activeScreenName}</BreadcrumbItem>
            </Breadcrumb>
          ) : (
            <Breadcrumb>
              <BreadcrumbItem>
                <NavLink href="/" className="text-primary">
                  Home
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem active>{activeScreenName}</BreadcrumbItem>
            </Breadcrumb>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BreadcrumbCompo;
