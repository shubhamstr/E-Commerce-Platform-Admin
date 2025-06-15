/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col, Container, Row, Button } from 'reactstrap';

const AuthForm = ({ type }: any) => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  return (
    <Container fluid="sm">
      <Row xs="1">
        <Col
          xs="12"
          sm={{
            offset: 3,
            size: 6
          }}
        >
          {type === 'register' && (
            <Form>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={userDetails.firstName}
                  name="firstName"
                  placeholder="John"
                  type="text"
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value
                    }));
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={userDetails.lastName}
                  name="lastName"
                  placeholder="Doe"
                  type="text"
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value
                    }));
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  value={userDetails.email}
                  name="email"
                  placeholder="abc@example.com"
                  type="email"
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value
                    }));
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  value={userDetails.password}
                  name="password"
                  placeholder="1 Special Char, 1 Number, 1 Uppercase"
                  type="password"
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value
                    }));
                  }}
                />
              </FormGroup>
              <FormGroup className="text-center">
                <Button color="primary">Register</Button>
              </FormGroup>
            </Form>
          )}
          {type === 'login' && (
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  value={userDetails.email}
                  name="email"
                  placeholder="abc@example.com"
                  type="email"
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value
                    }));
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  value={userDetails.password}
                  name="password"
                  placeholder="1 Special Char, 1 Number, 1 Uppercase"
                  type="password"
                  onChange={(e) => {
                    setUserDetails((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value
                    }));
                  }}
                />
              </FormGroup>
              <FormGroup className="text-center">
                <Button color="primary">Login</Button>
              </FormGroup>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
