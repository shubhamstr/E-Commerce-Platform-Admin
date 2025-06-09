'use client';
import React from 'react';
import { Form, Row, Col, FormGroup, Label, Input, Button, Card, CardBody, CardSubtitle, CardText, Container } from 'reactstrap';

const ContactSection = () => {
  return (
    <Container fluid="sm">
      <Row xs="1" sm="2">
        <Col xs="12" sm="6" md="7">
          <Form className="border p-5">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name *</Label>
                  <Input id="firstName" name="firstName" type="text" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name *</Label>
                  <Input id="lastName" name="lastName" type="text" />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="email">Email *</Label>
              <Input id="email" name="email" type="email" />
            </FormGroup>
            <FormGroup>
              <Label for="subject">Subject</Label>
              <Input id="subject" name="subject" type="text" />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input id="message" name="message" type="textarea" />
            </FormGroup>
            <Button color="success" className="text-uppercase w-100">
              Send Message
            </Button>
          </Form>
        </Col>
        <Col xs="12" sm="6" md="5">
          <Card className="w-100">
            <CardBody>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                New York
              </CardSubtitle>
              <CardText>203 Fake St. Mountain View, San Francisco, California, USA</CardText>
            </CardBody>
          </Card>
          <Card className="w-100 mt-3">
            <CardBody>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                London
              </CardSubtitle>
              <CardText>203 Fake St. Mountain View, San Francisco, California, USA</CardText>
            </CardBody>
          </Card>
          <Card className="w-100 mt-3">
            <CardBody>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Canada
              </CardSubtitle>
              <CardText>203 Fake St. Mountain View, San Francisco, California, USA</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactSection;
