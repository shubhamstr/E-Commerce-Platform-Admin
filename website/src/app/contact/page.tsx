// import Image from 'next/image';
import { Col, Container, Row } from 'reactstrap';
import styles from './page.module.css';
import BreadcrumbCompo from '../components/BreadcrumbCompo';
import ContactSection from '../components/ContactSection';

const page = () => {
  return (
    <Container fluid>
      <Row xs="1" className={styles.headerSection}></Row>
      <Row xs="1">
        <Col>
          <BreadcrumbCompo activeScreenName="Contact" previousScreenLink="" previousScreenName="" />
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <Container fluid="sm">
            <h3>Get in Touch</h3>
          </Container>
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <ContactSection />
        </Col>
      </Row>
    </Container>
  );
};

export default page;
